#!/usr/bin/env node
/**
 * agente_reactivacion.js
 * -----------------------------------------------------------------------------
 * SOLUCIÓN DE REFERENCIA · Hackathon S4 · Claude para Productividad (N2)
 *
 * Un agente que orquesta APIs reales para reactivar cuentas comerciales:
 *
 *   Loop 1 · EJECUCIÓN     -> Claude (vía OpenRouter) redacta el mensaje
 *   Loop 2 · VERIFICACIÓN  -> grader híbrido (código $0 + Haiku barato)
 *   Loop 3 · MEMORIA       -> Supabase: lee cartera, escribe resultados
 *   Loop 4 · TRIGGER       -> ver workflow n8n / endpoint (opcional, carril rojo)
 *
 * Flujo:
 *   1. Lee de Supabase las cuentas con +30 días sin contacto y status 'pendiente'.
 *   2. Para cada una, Claude redacta un mensaje de reactivación (Loop 1).
 *   3. Un grader determinista + Haiku verifican el mensaje (Loop 2).
 *   4. Escribe de vuelta en Supabase: mensaje, verificado, intentos, costo (Loop 3).
 *   5. Registra la corrida en la tabla 'corridas'.
 *
 * Uso:
 *   export OPENROUTER_API_KEY="sk-or-..."
 *   export SUPABASE_URL="https://xxxx.supabase.co"
 *   export SUPABASE_KEY="<service_role o anon key>"
 *   node agente_reactivacion.js
 *
 * Requisitos: Node 18+ (fetch nativo). Sin dependencias externas.
 * -----------------------------------------------------------------------------
 */

// ===================== CONFIGURACIÓN =====================
const OR_URL  = "https://openrouter.ai/api/v1/chat/completions";
const OR_KEY  = process.env.OPENROUTER_API_KEY;
const SB_URL  = process.env.SUPABASE_URL;
const SB_KEY  = process.env.SUPABASE_KEY;

const WORKER_MODEL = "anthropic/claude-sonnet-4.5"; // redacta (Loop 1)
const GRADER_MODEL = "anthropic/claude-3-haiku";    // verifica tono (Loop 2)

const DIAS_UMBRAL  = 30;   // +30 días sin contacto => candidato a reactivar
const MAX_INTENTOS = 3;
const MAX_PALABRAS = 90;

const FRASES_PROHIBIDAS = [
  "estimado cliente", "lamentamos profundamente", "a quien corresponda",
  "no dude en contactarnos", "quedamos a sus órdenes",
];

const PRECIOS = {
  "anthropic/claude-sonnet-4.5": { in: 3.0, out: 15.0 },
  "anthropic/claude-3-haiku":    { in: 0.25, out: 1.25 },
};

// ===================== PRESENTACIÓN =====================
const C = {
  reset:"\x1b[0m", dim:"\x1b[2m", bold:"\x1b[1m", cyan:"\x1b[36m",
  green:"\x1b[32m", red:"\x1b[31m", yellow:"\x1b[33m", magenta:"\x1b[35m", gray:"\x1b[90m",
};
const line = () => console.log(C.gray + "─".repeat(72) + C.reset);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const usd = (n) => "$" + n.toFixed(5);
const palabras = (t) => t.trim().split(/\s+/).filter(Boolean).length;
const costoLlamada = (m, u) => {
  const p = PRECIOS[m]; if (!p || !u) return 0;
  return (u.prompt_tokens/1e6)*p.in + (u.completion_tokens/1e6)*p.out;
};
const diasDesde = (fecha) => Math.floor((Date.now() - new Date(fecha).getTime()) / 86400000);

// ===================== SUPABASE (REST) — Loop 3 =====================
function sbHeaders() {
  return {
    apikey: SB_KEY,
    Authorization: `Bearer ${SB_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };
}

async function sbSelectPendientes() {
  // Lee todas las cuentas pendientes; el filtro de días se aplica en JS para que
  // el demo muestre la decisión del agente explícitamente.
  const url = `${SB_URL}/rest/v1/cuentas?estatus_agente=eq.pendiente&select=*&order=ultimo_contacto.asc`;
  const r = await fetch(url, { headers: sbHeaders() });
  if (!r.ok) throw new Error(`Supabase SELECT ${r.status}: ${await r.text()}`);
  return r.json();
}

async function sbUpdateCuenta(id, patch) {
  const url = `${SB_URL}/rest/v1/cuentas?id=eq.${id}`;
  const r = await fetch(url, { method: "PATCH", headers: sbHeaders(), body: JSON.stringify(patch) });
  if (!r.ok) throw new Error(`Supabase PATCH ${r.status}: ${await r.text()}`);
  return r.json();
}

async function sbInsertCorrida(row) {
  const url = `${SB_URL}/rest/v1/corridas`;
  const r = await fetch(url, { method: "POST", headers: sbHeaders(), body: JSON.stringify(row) });
  if (!r.ok) throw new Error(`Supabase INSERT corrida ${r.status}: ${await r.text()}`);
  return r.json();
}

// ===================== OPENROUTER — Loops 1 y 2 =====================
async function llamarModelo(model, system, user, maxTokens = 350) {
  const r = await fetch(OR_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OR_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://collective.academy",
      "X-Title": "Hackathon S4 - Agente Reactivacion",
    },
    body: JSON.stringify({
      model, max_tokens: maxTokens, temperature: 0.7,
      messages: [{ role: "system", content: system }, { role: "user", content: user }],
    }),
  });
  if (!r.ok) throw new Error(`OpenRouter ${r.status}: ${await r.text()}`);
  const d = await r.json();
  return { text: d.choices[0].message.content.trim(), usage: d.usage || { prompt_tokens:0, completion_tokens:0, total_tokens:0 } };
}

// Loop 1 — el worker redacta
async function redactarMensaje(cuenta, feedback) {
  const system =
    "Eres un ejecutivo de cuenta senior. Redactas mensajes de reactivación " +
    "breves (máx 90 palabras), cálidos pero profesionales, en español. " +
    "Personaliza con el nombre del contacto y la empresa. Incluye SIEMPRE un " +
    "siguiente paso concreto (una propuesta de reunión o acción). Evita frases " +
    "de plantilla genéricas. Responde solo con el cuerpo del mensaje.";
  let user =
    `Cuenta a reactivar:\n- Empresa: ${cuenta.empresa}\n- Contacto: ${cuenta.contacto}\n` +
    `- Etapa del deal: ${cuenta.etapa}\n- Días sin contacto: ${cuenta._dias}\n\n` +
    "Redacta el mensaje de reactivación.";
  if (feedback) user += `\n\nTu intento previo fue RECHAZADO. Corrige esto:\n${feedback}`;
  const { text, usage } = await llamarModelo(WORKER_MODEL, system, user, 300);
  return { text, usage, costo: costoLlamada(WORKER_MODEL, usage) };
}

// Loop 2a — grader determinista (código, $0)
function graderDeterminista(texto) {
  const n = palabras(texto);
  if (n > MAX_PALABRAS) return { pasa:false, feedback:`Tiene ${n} palabras; máximo ${MAX_PALABRAS}. Acorta.` };
  const min = texto.toLowerCase();
  for (const f of FRASES_PROHIBIDAS)
    if (min.includes(f)) return { pasa:false, feedback:`Usa la frase genérica prohibida: "${f}". Reescríbela.` };
  return { pasa:true, feedback:null };
}

// Loop 2b — grader LLM (Haiku, barato)
async function graderLLM(texto, cuenta) {
  const system =
    "Evalúas mensajes de reactivación comercial. Apruebas solo si: (1) el tono " +
    "es cálido y humano, no genérico; (2) está personalizado al contacto/empresa; " +
    "(3) incluye un siguiente paso concreto. " +
    'Responde SOLO en JSON: {"aprueba": true/false, "razon": "..."}';
  const user = `Empresa: ${cuenta.empresa}, Contacto: ${cuenta.contacto}.\nMensaje:\n"${texto}"`;
  const { text, usage } = await llamarModelo(GRADER_MODEL, system, user, 180);
  let v; try { const m = text.match(/\{[\s\S]*\}/); v = JSON.parse(m ? m[0] : text); }
  catch { v = { aprueba: /true/i.test(text), razon: text }; }
  return { pasa: !!v.aprueba, feedback: v.razon, usage, costo: costoLlamada(GRADER_MODEL, usage) };
}

// Loop 1+2 combinados para una cuenta
async function procesarCuenta(cuenta) {
  let feedback = null, intentos = 0, costo = 0, aprobado = false, textoFinal = "", notas = "";
  for (let i = 1; i <= MAX_INTENTOS; i++) {
    intentos = i;
    const w = await redactarMensaje(cuenta, feedback); costo += w.costo; textoFinal = w.text;
    const det = graderDeterminista(w.text);
    if (!det.pasa) { feedback = det.feedback; notas = "Rechazo determinista: " + det.feedback; continue; }
    const llm = await graderLLM(w.text, cuenta); costo += llm.costo;
    if (llm.pasa) { aprobado = true; notas = "Aprobado: " + llm.feedback; break; }
    feedback = llm.feedback; notas = "Rechazo Haiku: " + llm.feedback;
  }
  return { textoFinal, intentos, costo, aprobado, notas };
}

// ===================== ORQUESTADOR =====================
async function main() {
  if (!OR_KEY) throw new Error('Falta OPENROUTER_API_KEY.');
  if (!SB_URL || !SB_KEY) throw new Error('Faltan SUPABASE_URL / SUPABASE_KEY.');

  console.clear(); line();
  console.log(C.bold + "AGENTE DE REACTIVACIÓN · Solución de referencia (Loops 1·2·3)" + C.reset);
  console.log(C.dim + "Claude (OpenRouter) + Supabase · node agente_reactivacion.js" + C.reset);
  line();

  // --- Loop 3: LEER la memoria ---
  console.log(C.cyan + C.bold + "[Loop 3 · MEMORIA] Leyendo la cartera desde Supabase..." + C.reset);
  const todas = await sbSelectPendientes();
  const candidatas = [];
  for (const c of todas) {
    c._dias = c.ultimo_contacto ? diasDesde(c.ultimo_contacto) : 9999;
    if (c._dias >= DIAS_UMBRAL) candidatas.push(c);
  }
  console.log(C.dim + `  ${todas.length} cuentas pendientes · ${candidatas.length} con +${DIAS_UMBRAL} días sin contacto.` + C.reset);
  for (const c of todas) {
    const marca = c._dias >= DIAS_UMBRAL ? C.green + "→ reactivar" : C.gray + "  omitir (reciente)";
    console.log(`  ${C.bold}${c.empresa.padEnd(22)}${C.reset}${c._dias} días   ${marca}${C.reset}`);
  }
  line();

  let totalCosto = 0, contactadas = 0;

  // --- Loops 1 + 2 por cada candidata, luego Loop 3 ESCRIBIR ---
  for (const c of candidatas) {
    console.log(C.cyan + C.bold + `\n▸ ${c.empresa} (${c.contacto}) — ${c._dias} días` + C.reset);
    console.log(C.dim + "  [Loop 1] redactando + [Loop 2] verificando..." + C.reset);
    const r = await procesarCuenta(c);
    totalCosto += r.costo;

    const estatus = r.aprobado ? "contactado" : "omitido";
    if (r.aprobado) contactadas++;

    // Loop 3: ESCRIBIR de vuelta
    await sbUpdateCuenta(c.id, {
      estatus_agente: estatus,
      mensaje_generado: r.textoFinal,
      verificado: r.aprobado,
      intentos: r.intentos,
      costo_usd: Number(r.costo.toFixed(6)),
      notas_verificacion: r.notas,
      updated_at: new Date().toISOString(),
    });

    const tag = r.aprobado ? C.green + "✓ verificado y guardado" : C.red + "✗ no pasó, marcado para revisión";
    console.log(`  ${tag}${C.reset}  ${C.gray}(${r.intentos} intento(s), ${usd(r.costo)})${C.reset}`);
    console.log(C.gray + "  «" + r.textoFinal.replace(/\n+/g, " ") + "»" + C.reset);
    await sleep(300);
  }

  // --- Loop 3: registrar la corrida ---
  await sbInsertCorrida({
    carril: "verificacion",
    cuentas_procesadas: candidatas.length,
    cuentas_contactadas: contactadas,
    costo_total_usd: Number(totalCosto.toFixed(6)),
    disparador: process.env.DISPARADOR || "manual",
  });

  line();
  console.log(C.bold + "RESUMEN DE LA CORRIDA" + C.reset);
  console.log(`  Cuentas evaluadas:    ${todas.length}`);
  console.log(`  Reactivadas:          ${C.green}${contactadas}${C.reset} / ${candidatas.length} candidatas`);
  console.log(`  Costo total (real):   ${C.green}${C.bold}${usd(totalCosto)}${C.reset}`);
  console.log(C.dim + "  Revisa la tabla 'cuentas' en Supabase: cambió frente a tus ojos." + C.reset);
  line();
}

main().catch((e) => { console.error("\n" + C.red + C.bold + "ERROR: " + C.reset + e.message); process.exit(1); });
