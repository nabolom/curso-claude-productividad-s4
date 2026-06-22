#!/usr/bin/env node
/**
 * Carril 3 · Loop 4 — trigger por webhook.
 * Levanta un endpoint; al recibir POST /disparar, ejecuta tu agente.js (Carril 2).
 *
 *   node webhook.js
 *   curl -X POST http://localhost:4000/disparar
 */
const http = require("http");
const { execFile } = require("child_process");
const path = require("path");

const PORT = process.env.WEBHOOK_PORT || 4000;
const AGENTE = path.join(__dirname, "agente.js"); // <- copia aquí tu agente del Carril 2

http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/disparar") {
    console.log("\n[Loop 4] Evento recibido. El agente despierta SOLO...");
    execFile("node", [AGENTE], { env: { ...process.env, DISPARADOR: "webhook" } },
      (err, stdout, stderr) => {
        if (err) console.error("[Loop 4] Error:", stderr || err.message);
        else console.log("[Loop 4] Agente terminó:\n", stdout.slice(-400));
      });
    res.writeHead(202, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "El agente fue disparado por el evento." }));
  } else {
    res.writeHead(404); res.end('Usa: POST /disparar');
  }
}).listen(PORT, () => console.log(`[Loop 4] Webhook en http://localhost:${PORT}/disparar`));
