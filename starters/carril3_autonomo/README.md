# Carril 3 · AUTÓNOMO (Loop 1 + 2 + 3 + 4)

> ⚠️ **¿Ruta SIN código (recomendada)?** Usa `PROMPTS_COWORK.md` de esta carpeta: el agente se dispara solo con **`/schedule`** de Cowork. Este README es la **ruta avanzada** (webhook propio / n8n) para quien quiera un disparo 100% en la nube.

**Meta:** tu agente del Carril 2 ya ejecuta, verifica y recuerda. Ahora haz que **se dispare solo**, sin que tú lo corras en la terminal.

> 🔑 **Cada quien usa SU PROPIA Supabase** (Modelo 2). No hay una URL/base compartida del mentor: tú creaste la tuya con `schema.sql` + `seed.sql`.

Tienes dos rutas avanzadas para el Loop 4. Elige una:

---

## Ruta A — Webhook local (no requiere cuenta extra)

1. Copia tu `agente.js` del Carril 2 a esta carpeta.
2. Usa el archivo `webhook.js` de esta carpeta (ya viene listo). Levanta el servidor:
   ```bash
   export OPENROUTER_API_KEY=... SUPABASE_URL=... SUPABASE_KEY=...
   node webhook.js
   ```
3. Dispáralo desde otra terminal (simulando un formulario, Zapier o n8n):
   ```bash
   curl -X POST http://localhost:4000/disparar
   ```
4. **Demuestra:** el agente despierta solo, procesa la cartera y la tabla de Supabase cambia. El humano nunca tocó la terminal del agente.

> Para que sea aún más "real", puedes conectar un Google Form o Typeform que haga el POST a tu endpoint (si lo expones con una herramienta de túnel).

---

## Ruta B — n8n (si quieres el trigger en la nube, sin tu laptop)

1. Importa `../../integrations/n8n/workflow_trigger.json` en tu instancia de n8n.
2. El workflow tiene: **Webhook (trigger)** → **HTTP Request a OpenRouter** → **HTTP Request a Supabase**.
3. Activa el workflow y copia la URL del webhook que te da n8n.
4. **Demuestra:** llamas esa URL (o la conectas a un formulario) y el flujo corre en la nube, sin nada encendido de tu lado.

---

## Criterio de éxito del Carril 3
- [ ] El agente se ejecuta a partir de un **evento externo**, no de un comando manual tuyo.
- [ ] La tabla de Supabase refleja el resultado tras el disparo.
- [ ] En la corrida queda registrado `disparador = 'webhook'` (no 'manual').
