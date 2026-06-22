# Hackathon S4 · "El Agente Autónomo"
### Claude para Productividad · Nivel 2 · Sesión 4

Construye un agente que **ejecuta, se verifica, recuerda y se dispara solo**, orquestando APIs reales: **Claude (vía OpenRouter)** + **Supabase** + **GitHub** (+ **n8n** opcional).

> El `estado.json` local de antes evoluciona a una **base de datos en la nube**. Tu agente deja de vivir en tu laptop.

---

## Los 4 Loops

| Loop | Qué hace | Herramienta |
|---|---|---|
| **1 · Ejecución** | El agente redacta el mensaje | Claude (OpenRouter) |
| **2 · Verificación** | El agente revisa su propio trabajo antes de entregar | Grader código ($0) + Haiku |
| **3 · Memoria** | Lee y escribe estado en la nube | Supabase |
| **4 · Trigger** | El sistema despierta solo ante un evento | Webhook / n8n |

---

## El reto

El equipo comercial tiene una cartera de cuentas en **Supabase**. Construye un agente que:

1. Detecte qué cuentas llevan **+30 días sin contacto**.
2. **Genere** un mensaje de reactivación personalizado.
3. **Verifique** su propia calidad antes de entregarlo (carriles 2-3).
4. **Registre** en la base de datos qué hizo.
5. Se **dispare solo** sin que lo ejecutes (carril 3).

---

## Elige tu carril

| Carril | Loops | Para quién |
|---|---|---|
| 🟢 **1 · Fundamentos** | 1 + 3 | Primer contacto con APIs |
| 🟡 **2 · Verificación** | 1 + 2 + 3 | Ya conectaste una API antes |
| 🔴 **3 · Autónomo** | 1 + 2 + 3 + 4 | Quieres el sistema completo en la nube |

Plantillas de arranque en `starters/` — no empiezas de cero.

---

## Estructura del repo

```
hackathon_S4/
├── README.md                      ← este archivo
├── diseno_reto_S4.md              ← diseño completo, carriles y rúbrica
├── reference_solution/            ← SOLUCIÓN COMPLETA (mentor) — los 4 loops
│   ├── agente_reactivacion.js
│   ├── supabase/schema.sql
│   ├── supabase/seed.sql
│   └── loop4_trigger/webhook_server.js
├── starters/                      ← PLANTILLAS para los equipos (con TODOs)
│   ├── carril1_fundamentos/
│   ├── carril2_verificacion/
│   └── carril3_autonomo/
├── integrations/n8n/              ← workflow importable (Loop 4 en la nube)
│   └── workflow_trigger.json
└── local_supabase/                ← stack local que imita Supabase (para probar sin cuenta)
```

---

## Setup rápido (3 variables)

```bash
export OPENROUTER_API_KEY="sk-or-..."     # openrouter.ai → Keys
export SUPABASE_URL="https://xxxx.supabase.co"
export SUPABASE_KEY="<service_role o anon key>"   # Supabase → Settings → API
```

1. En Supabase, crea las tablas: SQL Editor → pega `reference_solution/supabase/schema.sql` → Run.
2. Carga los datos: pega `reference_solution/supabase/seed.sql` → Run.
3. Corre tu carril: `node agente.js`
4. Mira la tabla `cuentas` cambiar en el dashboard de Supabase.

> **¿Sin cuenta de Supabase?** Mira `local_supabase/COMO_USAR.md`: levantas un clon local que responde igual que Supabase y cambias solo las 2 variables el día que tengas la cuenta real.

---

## Rúbrica

| Criterio | Peso |
|---|---|
| Loop 1 — Ejecución | 20% |
| Loop 3 — Memoria (Supabase) | 25% |
| Loop 2 — Verificación | 25% |
| Loop 4 — Trigger | 15% |
| Entregable en GitHub (repo + README) | 15% |

> En el Carril 1, los pesos de Loop 2 y 4 se redistribuyen. Se evalúa la ejecución completa del carril elegido.
