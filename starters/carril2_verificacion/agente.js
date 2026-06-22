#!/usr/bin/env node
/**
 * CARRIL 2 · VERIFICACIÓN  (Loop 1 + Loop 2 + Loop 3)
 * -----------------------------------------------------------------------------
 * Meta: como el Carril 1, PERO el agente VERIFICA su propio mensaje antes de
 *       guardarlo. Si el verificador lo rechaza, el worker reintenta con feedback.
 *
 * Loop 2 = grader híbrido:
 *   - determinista (código, $0): longitud + frases prohibidas
 *   - LLM barato (Haiku): juzga tono + personalización + siguiente paso
 *
 * Hay 3 huecos // TODO . El esqueleto de lectura/escritura ya viene resuelto.
 * -----------------------------------------------------------------------------
 */
const OR_URL = "https://openrouter.ai/api/v1/chat/completions";
const OR_KEY = process.env.OPENROUTER_API_KEY;
const SB_URL = process.env.SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_KEY;

const WORKER_MODEL = "anthropic/claude-sonnet-4.5";
const GRADER_MODEL = "anthropic/claude-3-haiku";
const DIAS_UMBRAL = 30, MAX_INTENTOS = 3, MAX_PALABRAS = 90;
const FRASES_PROHIBIDAS = ["estimado cliente", "a quien corresponda", "quedamos a sus órdenes"];
const PRECIOS = {
  "anthropic/claude-sonnet-4.5": { in: 3.0, out: 15.0 },
  "anthropic/claude-3-haiku":    { in: 0.25, out: 1.25 },
};
const sbHeaders = () => ({ apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, "Content-Type": "application/json", Prefer: "return=representation" });
const diasDesde = (f) => Math.floor((Date.now() - new Date(f).getTime()) / 86400000);
const palabras = (t) => t.trim().split(/\s+/).filter(Boolean).length;
const costo = (m, u) => { const p = PRECIOS[m]; return !p || !u ? 0 : (u.prompt_tokens/1e6)*p.in + (u.completion_tokens/1e6)*p.out; };

async function llamar(model, system, user, max = 300) {
  const r = await fetch(OR_URL, { method: "POST",
    headers: { Authorization: `Bearer ${OR_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model, max_tokens: max, temperature: 0.7, messages: [{ role:"system", content:system }, { role:"user", content:user }] }) });
  if (!r.ok) throw new Error(`OpenRouter ${r.status}: ${await r.text()}`);
  const d = await r.json();
  return { text: d.choices[0].message.content.trim(), usage: d.usage || {prompt_tokens:0,completion_tokens:0,total_tokens:0} };
}

// Loop 1
async function redactar(cuenta, feedback) {
  const system = "Ejecutivo de cuenta. Mensaje de reactivación breve (máx 90 palabras), cálido, personalizado, con siguiente paso concreto. Solo el cuerpo.";
  let user = `Empresa: ${cuenta.empresa}\nContacto: ${cuenta.contacto}\nEtapa: ${cuenta.etapa}\n\nRedacta el mensaje.`;
  if (feedback) user += `\n\nTu intento previo fue RECHAZADO. Corrige esto:\n${feedback}`;
  const { text, usage } = await llamar(WORKER_MODEL, system, user);
  return { text, costo: costo(WORKER_MODEL, usage) };
}

// Loop 2a — determinista
function graderCodigo(texto) {
  // TODO (1): rechaza si supera MAX_PALABRAS o contiene una FRASE_PROHIBIDA.
  //           Devuelve { pasa: false, feedback: "..." } o { pasa: true }.
  // ---- completa aquí ----
  return { pasa: true };
}

// Loop 2b — LLM barato
async function graderLLM(texto, cuenta) {
  const system = 'Evaluas mensajes de reactivación. Aprueba solo si tono cálido + personalizado + siguiente paso. Responde SOLO JSON: {"aprueba":true/false,"razon":"..."}';
  const user = `Empresa: ${cuenta.empresa}, Contacto: ${cuenta.contacto}.\nMensaje:\n"${texto}"`;
  const { text, usage } = await llamar(GRADER_MODEL, system, user, 180);
  let v; try { v = JSON.parse(text.match(/\{[\s\S]*\}/)[0]); } catch { v = { aprueba:/true/i.test(text), razon:text }; }
  return { pasa: !!v.aprueba, feedback: v.razon, costo: costo(GRADER_MODEL, usage) };
}

// Loop 1+2
async function procesar(cuenta) {
  let feedback = null, intentos = 0, costoTotal = 0, texto = "", ok = false;
  for (let i = 1; i <= MAX_INTENTOS; i++) {
    intentos = i;
    const w = await redactar(cuenta, feedback); costoTotal += w.costo; texto = w.text;

    // TODO (2): corre el grader determinista. Si NO pasa, guarda su feedback y
    //           usa 'continue' para reintentar SIN llamar al grader caro.
    // ---- completa aquí ----

    const llm = await graderLLM(texto, cuenta); costoTotal += llm.costo;
    if (llm.pasa) { ok = true; break; }
    feedback = llm.feedback;
  }
  return { texto, intentos, costo: costoTotal, ok };
}

async function leer() {
  const r = await fetch(`${SB_URL}/rest/v1/cuentas?estatus_agente=eq.pendiente&select=*&order=ultimo_contacto.asc`, { headers: sbHeaders() });
  if (!r.ok) throw new Error(`SELECT ${r.status}`); return r.json();
}
async function guardar(id, patch) {
  const r = await fetch(`${SB_URL}/rest/v1/cuentas?id=eq.${id}`, { method:"PATCH", headers: sbHeaders(), body: JSON.stringify(patch) });
  if (!r.ok) throw new Error(`PATCH ${r.status}`);
}

async function main() {
  const cuentas = await leer();
  for (const c of cuentas) {
    const dias = c.ultimo_contacto ? diasDesde(c.ultimo_contacto) : 9999;
    if (dias < DIAS_UMBRAL) continue;
    console.log(`\n▸ ${c.empresa} (${c.contacto}) — ${dias} días`);
    const r = await procesar(c);
    // TODO (3): guarda en Supabase mensaje_generado, verificado (r.ok), intentos,
    //           costo_usd y estatus_agente ('contactado' si ok, si no 'omitido').
    // ---- completa aquí ----
    console.log(`  ${r.ok ? "✓ verificado" : "✗ no pasó"}  (${r.intentos} intento(s), $${r.costo.toFixed(5)})`);
  }
  console.log("\nListo. Revisa 'cuentas' en Supabase: incluye metadata de verificación.");
}
main().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
