#!/usr/bin/env node
/**
 * CARRIL 1 · FUNDAMENTOS  (Loop 1 + Loop 3)
 * -----------------------------------------------------------------------------
 * Meta: un agente que LEE cuentas desde Supabase, GENERA un mensaje con Claude,
 *       y ESCRIBE el resultado de vuelta en Supabase.
 *
 * Hay 4 huecos marcados con  // TODO  . Complétalos. El resto ya funciona.
 *
 * Setup:
 *   export OPENROUTER_API_KEY="sk-or-..."
 *   export SUPABASE_URL="https://xxxx.supabase.co"   (o la del sandbox)
 *   export SUPABASE_KEY="<tu key>"
 *   node agente.js
 * -----------------------------------------------------------------------------
 */
const OR_URL = "https://openrouter.ai/api/v1/chat/completions";
const OR_KEY = process.env.OPENROUTER_API_KEY;
const SB_URL = process.env.SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_KEY;
const MODELO = "anthropic/claude-sonnet-4.5";
const DIAS_UMBRAL = 30;

const sbHeaders = () => ({
  apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`,
  "Content-Type": "application/json", Prefer: "return=representation",
});
const diasDesde = (f) => Math.floor((Date.now() - new Date(f).getTime()) / 86400000);

// ---------- Loop 3: LEER de Supabase ----------
async function leerCuentas() {
  // TODO (1): completa la URL para traer SOLO las cuentas con estatus_agente = 'pendiente'.
  //           Pista: PostgREST usa  ?estatus_agente=eq.pendiente&select=*
  const url = `${SB_URL}/rest/v1/cuentas?____________`; // <-- completa aquí
  const r = await fetch(url, { headers: sbHeaders() });
  if (!r.ok) throw new Error(`SELECT ${r.status}: ${await r.text()}`);
  return r.json();
}

// ---------- Loop 1: GENERAR con Claude ----------
async function generarMensaje(cuenta) {
  const system =
    "Eres un ejecutivo de cuenta. Redacta un mensaje de reactivación breve " +
    "(máx 90 palabras), cálido y profesional, en español, personalizado al " +
    "contacto y empresa, con un siguiente paso concreto. Solo el cuerpo.";
  // TODO (2): arma el 'user' con los datos de la cuenta (empresa, contacto, etapa).
  const user = `____________`; // <-- completa aquí

  const r = await fetch(OR_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${OR_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODELO, max_tokens: 300, temperature: 0.7,
      messages: [{ role: "system", content: system }, { role: "user", content: user }],
    }),
  });
  if (!r.ok) throw new Error(`OpenRouter ${r.status}: ${await r.text()}`);
  const d = await r.json();
  return d.choices[0].message.content.trim();
}

// ---------- Loop 3: ESCRIBIR de vuelta en Supabase ----------
async function guardarResultado(id, mensaje) {
  const url = `${SB_URL}/rest/v1/cuentas?id=eq.${id}`;
  // TODO (3): completa el cuerpo para guardar el mensaje y marcar estatus_agente='contactado'.
  const patch = { /* ____________ */ }; // <-- completa aquí
  const r = await fetch(url, { method: "PATCH", headers: sbHeaders(), body: JSON.stringify(patch) });
  if (!r.ok) throw new Error(`PATCH ${r.status}: ${await r.text()}`);
}

async function main() {
  console.log("Leyendo cartera desde Supabase (Loop 3)...");
  const cuentas = await leerCuentas();

  for (const c of cuentas) {
    const dias = c.ultimo_contacto ? diasDesde(c.ultimo_contacto) : 9999;
    // TODO (4): salta (continue) las cuentas con MENOS de DIAS_UMBRAL días sin contacto.
    // if (____________) continue;   // <-- completa aquí

    console.log(`\n▸ ${c.empresa} (${c.contacto}) — ${dias} días`);
    const mensaje = await generarMensaje(c);        // Loop 1
    await guardarResultado(c.id, mensaje);           // Loop 3
    console.log("  ✓ mensaje generado y guardado en Supabase");
    console.log("  «" + mensaje.replace(/\n+/g, " ").slice(0, 160) + "...»");
  }
  console.log("\nListo. Revisa la tabla 'cuentas' en Supabase: cambió.");
}
main().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
