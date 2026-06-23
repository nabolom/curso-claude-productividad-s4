# Carril 2 · Solución de los TODOs (solo mentor)

> Nota: esto resuelve la **versión en código** (`agente.js`) = el bonus de OpenRouter. La ruta recomendada es sin código (`PROMPTS_COWORK.md`).

```js
// TODO (1) — grader determinista
function graderCodigo(texto) {
  const n = palabras(texto);
  if (n > MAX_PALABRAS) return { pasa: false, feedback: `Tiene ${n} palabras; máximo ${MAX_PALABRAS}.` };
  const min = texto.toLowerCase();
  for (const f of FRASES_PROHIBIDAS)
    if (min.includes(f)) return { pasa: false, feedback: `Usa frase prohibida: "${f}".` };
  return { pasa: true };
}

// TODO (2) — dentro del for, tras redactar:
const det = graderCodigo(texto);
if (!det.pasa) { feedback = det.feedback; continue; }

// TODO (3) — guardar con metadata de verificación:
await guardar(c.id, {
  mensaje_generado: r.texto,
  verificado: r.ok,
  intentos: r.intentos,
  costo_usd: Number(r.costo.toFixed(6)),
  estatus_agente: r.ok ? "contactado" : "omitido",
  updated_at: new Date().toISOString(),
});
```

> La versión completa y ya resuelta vive en `reference_solution/agente_reactivacion.js`.
