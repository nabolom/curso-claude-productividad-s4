#!/usr/bin/env node
/**
 * webhook_server.js
 * -----------------------------------------------------------------------------
 * Loop 4 · TRIGGER (carril rojo / avanzado)
 *
 * Levanta un endpoint HTTP que, al recibir un POST, dispara el agente SIN que
 * un humano lo ejecute en la terminal. Esto materializa la diapositiva de
 * "cron vs webhook": el sistema despierta solo ante un evento externo.
 *
 * Dos formas de dispararlo en vivo:
 *   A) Un formulario / n8n / Zapier hace POST a  /webhook/nueva-cuenta
 *   B) Insertas una fila en Supabase y un trigger de base de datos llama aquí
 *
 * Uso:
 *   export OPENROUTER_API_KEY=... SUPABASE_URL=... SUPABASE_KEY=...
 *   node webhook_server.js
 *   # luego, desde otra terminal o n8n:
 *   curl -X POST http://localhost:4000/webhook/nueva-cuenta \
 *        -H "Content-Type: application/json" \
 *        -d '{"empresa":"Nueva Corp","contacto":"Ana López","email":"ana@nueva.mx"}'
 * -----------------------------------------------------------------------------
 */
const http = require("http");
const { execFile } = require("child_process");
const path = require("path");

const PORT = process.env.WEBHOOK_PORT || 4000;
const AGENTE = path.join(__dirname, "..", "agente_reactivacion.js");

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/webhook/nueva-cuenta") {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      let payload = {};
      try { payload = JSON.parse(body || "{}"); } catch {}
      console.log(`\n[TRIGGER] Evento recibido por webhook:`, payload);
      console.log("[TRIGGER] Despertando al agente sin intervención humana...");

      // Dispara el agente como proceso hijo, marcando el disparador como 'webhook'
      execFile(
        "node",
        [AGENTE],
        { env: { ...process.env, DISPARADOR: "webhook" } },
        (err, stdout, stderr) => {
          if (err) console.error("[TRIGGER] Error del agente:", stderr || err.message);
          else console.log("[TRIGGER] Agente terminó. Resumen:\n", stdout.slice(-600));
        }
      );

      res.writeHead(202, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "accepted", message: "El agente fue disparado por el evento." }));
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Usa POST /webhook/nueva-cuenta" }));
  }
});

server.listen(PORT, () => {
  console.log(`[Loop 4 · TRIGGER] Webhook escuchando en http://localhost:${PORT}/webhook/nueva-cuenta`);
  console.log("Dispáralo con un POST (desde n8n, un formulario, o curl) y el agente despierta solo.");
});
