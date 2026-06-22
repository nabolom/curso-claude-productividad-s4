#!/usr/bin/env node
/**
 * verification_loop_demo.js
 * -----------------------------------------------------------------------------
 * DEMO EN VIVO · Sesión 4 · Claude para Productividad (N2)
 * Loop 2 — Verification Loop con grader HÍBRIDO (código + LLM barato)
 *
 * Caso: NorthPeak Logística (ficticio) recibe una reseña de 1 estrella en Google.
 *       Necesitamos una respuesta pública breve, empática y con un siguiente paso.
 *
 * Piezas:
 *   1. WORKER            -> anthropic/claude-sonnet-4.5   (caro, redacta)
 *   2. GRADER DETERMINISTA -> código JS, 0 tokens, $0     (longitud + frases prohibidas)
 *   3. GRADER LLM        -> anthropic/claude-3-haiku       (barato, juzga tono + siguiente paso)
 *
 * El worker reintenta SOLO cuando un grader falla, recibiendo feedback específico.
 * Al final se imprime la tabla de costos y el ahorro vs. usar el modelo caro para todo.
 *
 * Uso:
 *   export OPENROUTER_API_KEY="sk-or-..."
 *   node verification_loop_demo.js
 *
 * Requisitos: Node 18+ (usa fetch nativo). Sin dependencias externas.
 * -----------------------------------------------------------------------------
 */

// ===================== CONFIGURACIÓN =====================

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = process.env.OPENROUTER_API_KEY;

const WORKER_MODEL = "anthropic/claude-sonnet-4.5"; // modelo caro: redacta
const GRADER_MODEL = "anthropic/claude-3-haiku";    // modelo barato: juzga tono

const MAX_INTENTOS = 3;          // reintentos máximos del worker
const MAX_PALABRAS = 60;         // criterio determinista de longitud

// Frases genéricas prohibidas (búsqueda de texto, costo cero).
const FRASES_PROHIBIDAS = [
  "lamentamos profundamente",
  "lamentamos los inconvenientes",
  "estimado cliente",
  "su llamada es muy importante",
  "disculpe las molestias",
];

// Precios por millón de tokens (USD) — referencia OpenRouter, ajustables.
// Se usan solo para estimar la tabla de costos del demo.
const PRECIOS = {
  "anthropic/claude-sonnet-4.5": { in: 3.0, out: 15.0 },
  "anthropic/claude-3-haiku":    { in: 0.25, out: 1.25 },
};

// La reseña negativa del caso.
const RESENA =
  '"Pedí mi envío hace 9 días y todavía no llega. Nadie me responde en ' +
  'soporte. Pésimo servicio, no vuelvo a comprar aquí." — ★☆☆☆☆ en Google Reviews';

// ===================== UTILIDADES DE PRESENTACIÓN =====================

const C = {
  reset: "\x1b[0m", dim: "\x1b[2m", bold: "\x1b[1m",
  cyan: "\x1b[36m", green: "\x1b[32m", red: "\x1b[31m",
  yellow: "\x1b[33m", magenta: "\x1b[35m", gray: "\x1b[90m",
};

function line() { console.log(C.gray + "─".repeat(70) + C.reset); }
function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }
function contarPalabras(t) { return t.trim().split(/\s+/).filter(Boolean).length; }
function usd(n) { return "$" + n.toFixed(5); }

function costoLlamada(model, usage) {
  const p = PRECIOS[model];
  if (!p || !usage) return 0;
  return (usage.prompt_tokens / 1e6) * p.in + (usage.completion_tokens / 1e6) * p.out;
}

// ===================== LLAMADA A OPENROUTER =====================

async function llamarModelo(model, system, user, maxTokens = 400) {
  if (!API_KEY) {
    throw new Error(
      "Falta OPENROUTER_API_KEY. Ejecuta:  export OPENROUTER_API_KEY=\"sk-or-...\""
    );
  }
  const resp = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://collective.academy",
      "X-Title": "Claude para Productividad - S4 Demo",
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      temperature: 0.7,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`OpenRouter ${resp.status}: ${txt}`);
  }
  const data = await resp.json();
  return {
    text: data.choices[0].message.content.trim(),
    usage: data.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
  };
}

// ===================== WORKER =====================

async function worker(intento, feedbackPrevio) {
  const system =
    "Eres el community manager de NorthPeak Logística. Redactas respuestas " +
    "públicas a reseñas en Google. Tu respuesta debe ser breve (máximo 60 " +
    "palabras), empática, profesional y SIEMPRE incluir un siguiente paso " +
    "concreto para el cliente (un canal o acción para resolver su caso). " +
    "Evita frases de cortesía genéricas y vacías. Responde solo con el texto " +
    "de la respuesta pública, sin comillas ni encabezados.";

  let user = `Esta es la reseña negativa que debemos responder:\n\n${RESENA}\n\n` +
    "Redacta la respuesta pública.";

  if (feedbackPrevio) {
    user +=
      `\n\nTu intento anterior fue RECHAZADO por el verificador. ` +
      `Corrige exactamente esto y vuelve a redactar:\n${feedbackPrevio}`;
  }

  const etiqueta = intento === 1
    ? `[WORKER → ${WORKER_MODEL}]`
    : `[WORKER → ${WORKER_MODEL}]  (intento ${intento}, con feedback)`;
  console.log(C.cyan + C.bold + etiqueta + C.reset);
  console.log(
    intento === 1
      ? C.dim + "Generando respuesta a la reseña negativa..." + C.reset
      : C.dim + "Regenerando con la retroalimentación del grader..." + C.reset
  );

  const { text, usage } = await llamarModelo(WORKER_MODEL, system, user, 300);
  const costo = costoLlamada(WORKER_MODEL, usage);
  console.log(
    C.green + "✓ Respuesta generada" + C.reset +
    C.gray + `  (${usage.completion_tokens} tokens, ${usd(costo)})` + C.reset
  );
  console.log(C.gray + "  «" + text + "»" + C.reset);
  return { text, usage, costo };
}

// ===================== GRADER 1 · DETERMINISTA (código, $0) =====================

function graderDeterminista(texto) {
  console.log(C.magenta + C.bold + "[GRADER · CHECK DETERMINISTA]" + C.reset +
    C.gray + "  (sin tokens, sin costo)" + C.reset);

  const palabras = contarPalabras(texto);
  if (palabras > MAX_PALABRAS) {
    const msg = `Tu respuesta tiene ${palabras} palabras; el máximo permitido es ${MAX_PALABRAS}. Acórtala.`;
    console.log(C.red + `✗ FALLA — excede longitud: ${palabras} palabras (máx ${MAX_PALABRAS})` + C.reset);
    return { pasa: false, feedback: msg };
  }

  const min = texto.toLowerCase();
  for (const frase of FRASES_PROHIBIDAS) {
    if (min.includes(frase)) {
      const msg = `Usaste la frase genérica prohibida: "${frase}". Reescribe esa parte con lenguaje específico y humano.`;
      console.log(C.red + `✗ FALLA — usa frase prohibida: "${frase}"` + C.reset);
      return { pasa: false, feedback: msg };
    }
  }

  console.log(C.green + "→  ✓ pasa" + C.reset);
  return { pasa: true, feedback: null };
}

// ===================== GRADER 2 · LLM (Haiku, barato) =====================

async function graderLLM(texto) {
  console.log(C.magenta + C.bold + `[GRADER → ${GRADER_MODEL}]` + C.reset);

  const system =
    "Eres un evaluador de calidad de respuestas a reseñas. Evalúas dos cosas: " +
    "(1) el tono suena empático y genuinamente humano (no robótico ni genérico); " +
    "(2) la respuesta incluye un siguiente paso concreto para el cliente. " +
    'Responde ESTRICTAMENTE en JSON: {"aprueba": true/false, "razon": "..."} ' +
    "Aprueba solo si AMBOS criterios se cumplen.";

  const user = `Evalúa esta respuesta pública:\n\n"${texto}"`;

  const { text, usage } = await llamarModelo(GRADER_MODEL, system, user, 200);
  const costo = costoLlamada(GRADER_MODEL, usage);

  let veredicto;
  try {
    const m = text.match(/\{[\s\S]*\}/);
    veredicto = JSON.parse(m ? m[0] : text);
  } catch {
    veredicto = { aprueba: /aprueba\s*[:=]?\s*true/i.test(text), razon: text };
  }

  if (veredicto.aprueba) {
    console.log(C.green + "→  ✓ APRUEBA" + C.reset +
      C.gray + `  (${usage.total_tokens} tokens, ${usd(costo)})` + C.reset);
  } else {
    console.log(C.red + `→  ✗ RECHAZA: ${veredicto.razon}` + C.reset +
      C.gray + `  (${usage.total_tokens} tokens, ${usd(costo)})` + C.reset);
  }
  return { pasa: !!veredicto.aprueba, feedback: veredicto.razon, usage, costo };
}

// ===================== LOOP PRINCIPAL =====================

async function main() {
  console.clear();
  line();
  console.log(C.bold + "DEMO EN VIVO · OPENROUTER — Loop 2: Verification" + C.reset);
  console.log(C.dim + "node verification_loop_demo.js" + C.reset);
  line();
  console.log(C.bold + "Reseña recibida:" + C.reset);
  console.log(C.yellow + RESENA + C.reset);
  line();
  await sleep(600);

  const registros = []; // para la tabla de costos
  let feedback = null;
  let aprobado = false;
  let textoFinal = "";

  for (let intento = 1; intento <= MAX_INTENTOS; intento++) {
    // 1) WORKER
    const w = await worker(intento, feedback);
    registros.push({ etapa: `Worker · intento ${intento}`, model: WORKER_MODEL, usage: w.usage, costo: w.costo });
    textoFinal = w.text;
    await sleep(400);

    // 2) GRADER DETERMINISTA (código, $0)
    const det = graderDeterminista(w.text);
    registros.push({ etapa: `Grader determinista · intento ${intento}`, model: "código", usage: { total_tokens: 0 }, costo: 0 });
    await sleep(400);

    if (!det.pasa) {
      feedback = det.feedback;
      console.log(C.dim + "  ↳ feedback específico regresa al worker.\n" + C.reset);
      await sleep(500);
      continue; // reintenta sin gastar en el grader LLM
    }

    // 3) GRADER LLM (Haiku, barato) — solo si pasó el determinista
    const llm = await graderLLM(w.text);
    registros.push({ etapa: `Grader Haiku · intento ${intento}`, model: GRADER_MODEL, usage: llm.usage, costo: llm.costo });
    await sleep(400);

    if (llm.pasa) { aprobado = true; break; }
    feedback = llm.feedback;
    console.log(C.dim + "  ↳ feedback específico regresa al worker.\n" + C.reset);
    await sleep(500);
  }

  // ===================== RESULTADO + TABLA DE COSTOS =====================
  line();
  if (aprobado) {
    console.log(C.green + C.bold + "RESPUESTA APROBADA — lista para publicar:" + C.reset);
    console.log(C.bold + "\n" + textoFinal + "\n" + C.reset);
  } else {
    console.log(C.red + C.bold + `No se aprobó tras ${MAX_INTENTOS} intentos. Último borrador:` + C.reset);
    console.log("\n" + textoFinal + "\n");
  }
  line();

  console.log(C.bold + "RESULTADO REAL · La tabla de costos — con dinero real" + C.reset + "\n");
  const w1 = 22, w2 = 34, w3 = 10, w4 = 12;
  const pad = (s, n) => (s.length > n ? s.slice(0, n - 1) + "…" : s).padEnd(n);
  console.log(
    pad("etapa", w2) + pad("modelo", w1) + "tokens".padStart(w3) + "costo".padStart(w4)
  );
  line();
  let totalInteligente = 0;
  for (const r of registros) {
    const tk = r.usage && r.usage.total_tokens != null ? r.usage.total_tokens : 0;
    totalInteligente += r.costo;
    const modelCorto = r.model.replace("anthropic/", "");
    console.log(
      pad(r.etapa, w2) + pad(modelCorto, w1) +
      String(tk).padStart(w3) + usd(r.costo).padStart(w4)
    );
  }
  line();
  console.log(
    C.bold + pad("TOTAL (con routing inteligente)", w2 + w1) + C.reset +
    "".padStart(w3) + C.green + C.bold + usd(totalInteligente).padStart(w4) + C.reset
  );

  // Contrafactual: ¿y si el modelo caro hiciera TODO (incluida la verificación)?
  // Reasignamos los tokens de los graders al precio del worker.
  let totalCaro = 0;
  for (const r of registros) {
    if (r.model === "código") {
      // si no hubiera código, esa verificación la haría el modelo caro;
      // estimamos un costo equivalente al de un grader LLM típico.
      totalCaro += 0.00150;
    } else if (r.model === GRADER_MODEL) {
      totalCaro += costoLlamada(WORKER_MODEL, r.usage);
    } else {
      totalCaro += r.costo;
    }
  }
  const ahorro = totalCaro > 0 ? (1 - totalInteligente / totalCaro) * 100 : 0;

  console.log(
    C.dim + pad("Si todo —incluida verificación— usara el modelo caro:", w2 + w1) + C.reset +
    "".padStart(w3) + usd(totalCaro).padStart(w4)
  );
  console.log(
    C.bold + pad("Ahorro con routing por tarea:", w2 + w1) + C.reset +
    "".padStart(w3) + C.yellow + C.bold + (ahorro.toFixed(0) + "%").padStart(w4) + C.reset
  );
  line();
  console.log(C.dim + "Datos de una corrida real. Los números varían ligeramente cada vez que corre." + C.reset);
}

main().catch((err) => {
  console.error("\n" + C.red + C.bold + "ERROR: " + C.reset + err.message);
  process.exit(1);
});
