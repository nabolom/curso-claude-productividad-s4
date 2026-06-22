# Hackathon S4 · "El Agente Autónomo"
### Claude para Productividad · Nivel 2 · Sesión 4

Construye un agente que **ejecuta, se verifica, recuerda y se dispara solo**. **Claude Cowork es el cerebro** que orquesta todo; **Supabase** le da memoria en la nube; **GitHub** es tu entregable.

> El `estado.json` local de antes evoluciona a una **base de datos en la nube**. Tu agente deja de vivir en tu laptop.
>
> 💡 **No necesitas pagar ninguna API.** Cowork redacta y se verifica con tu suscripción de Claude. Supabase es gratis. OpenRouter es solo un **bonus opcional** para quien quiera ver cómo se abaratan los costos a escala.



> ### 🚀 **ALUMNOS, EMPIECEN AQUÍ → [GUIA_ALUMNO_COWORK.md](GUIA_ALUMNO_COWORK.md)** — prompts listos para copiar y pegar en Cowork, paso a paso.

> ### 👉 ¿Quieres el detalle sin tecnicismos? Mira **[EMPIEZA_AQUI.md](EMPIEZA_AQUI.md)**.

---

## Los 4 Loops

| Loop | Qué hace | Quién lo hace |
|---|---|---|
| **1 · Ejecución** | Redacta el mensaje de reactivación | **Cowork** (Claude) |
| **2 · Verificación** | Revisa su propio trabajo antes de entregar | **Cowork** se autocritica (reglas + tono) |
| **3 · Memoria** | Lee y escribe estado en la nube | **Supabase** |
| **4 · Trigger** | El sistema despierta solo | `/schedule` de Cowork (o webhook/n8n, avanzado) |

> ⭐ A escala, el Loop 2 se puede abaratar enrutando la verificación a un modelo barato vía **OpenRouter** — eso es el **bonus avanzado**, no un requisito.

---

## El reto

El equipo comercial tiene una cartera de cuentas en **Supabase**. Construye un agente (operado por Cowork) que:

1. Detecte qué cuentas llevan **+30 días sin contacto**.
2. **Redacte** un mensaje de reactivación personalizado.
3. **Verifique** su propia calidad antes de entregarlo (carriles 2-3).
4. **Registre** en la base de datos qué hizo.
5. Se **dispare solo** sin que lo ejecutes (carril 3).

---

## Elige tu carril

| Carril | Loops | Para quién |
|---|---|---|
| 🟢 **1 · Fundamentos** | 1 + 3 | Primer contacto: leer, redactar, guardar |
| 🟡 **2 · Verificación** | 1 + 2 + 3 | El agente se controla a sí mismo |
| 🔴 **3 · Autónomo** | 1 + 2 + 3 + 4 | El sistema corre solo con `/schedule` |

Prompts y plantillas en `starters/` — no empiezas de cero.

---

## Estructura del repo

```
curso-claude-productividad-s4/
├── README.md                      ← este archivo
├── GUIA_ALUMNO_COWORK.md          ← ⭐ guía copy-paste para alumnos (Cowork = cerebro)
├── EMPIEZA_AQUI.md                ← guía para novatos
├── diseno_reto_S4.md              ← diseño completo, carriles y rúbrica
├── reference_solution/            ← SOLUCIÓN de referencia (mentor)
│   ├── agente_reactivacion.js     ← versión con código (usa OpenRouter)
│   ├── supabase/schema.sql        ← crea las tablas
│   ├── supabase/seed.sql          ← carga los datos de ejemplo
│   └── loop4_trigger/webhook_server.js
├── starters/                      ← plantillas por carril
├── integrations/n8n/              ← workflow importable (trigger avanzado en la nube)
└── local_supabase/                ← clon local de Supabase (para probar sin cuenta)
```

---

## Setup rápido (¡solo 2 datos, sin pagar API!)

Para construir con **Cowork como cerebro** solo necesitas tu Supabase:

```text
SUPABASE_URL = https://xxxx.supabase.co     # Supabase → Settings → API
SUPABASE_KEY = <service_role key>           # mismo lugar
```

1. En Supabase: SQL Editor → pega `reference_solution/supabase/schema.sql` → Run.
2. Carga los datos: pega `reference_solution/supabase/seed.sql` → Run.
3. En Cowork, sigue **[GUIA_ALUMNO_COWORK.md](GUIA_ALUMNO_COWORK.md)** y deja que Cowork opere el agente.
4. Mira la tabla `cuentas` cambiar en el dashboard de Supabase.

> **¿Sin cuenta de Supabase?** Mira `local_supabase/COMO_USAR.md`.
>
> ⭐ **¿Bonus avanzado (OpenRouter)?** Solo entonces necesitas `OPENROUTER_API_KEY` y la versión en código de `reference_solution/agente_reactivacion.js`.

---

## Rúbrica

| Criterio | Peso |
|---|---|
| Loop 1 — Ejecución (Cowork redacta) | 25% |
| Loop 3 — Memoria (Supabase lee/escribe) | 30% |
| Loop 2 — Verificación (Cowork se autocritica) | 25% |
| Loop 4 — Trigger (`/schedule`) | 10% |
| Entregable en GitHub (repo + README) | 10% |

> En el Carril 1, los pesos de Loop 2 y 4 se redistribuyen en Loop 1 y 3. Se evalúa la ejecución completa del carril elegido.
> El **bonus de OpenRouter** suma puntos extra, no resta si no se hace.
