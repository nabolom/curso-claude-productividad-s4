# Sesión 4 — Loop Engineering + Hackathon "El Agente Autónomo"

**Curso:** Claude para Productividad · N2 · Sesión 4 de 5
**Mentor:** León Ruiz · **Duración total:** 2.5 h (150 min) con 10 min de break
**Diseño del reto · v1**

---

## 1. Estructura de la sesión (150 min)

| Bloque | Min | Contenido |
|---|---|---|
| Apertura + recap S3 | 0–10 (10') | ¿Dónde quedamos? El proceso ya corre; hoy le ponemos infraestructura real. |
| **Teoría · Loop Engineering** | 10–35 (25') | Los 4 loops, el stack del reto, la solución de referencia en vivo (mentor) |
| Setup del hackathon | 35–45 (10') | Reglas, carriles, entregable, rúbrica. Equipos eligen carril. |
| **HACKATHON** | 45–125 (80') | Construyen. Mentor circula. 2 checkpoints. |
| Break | (10') dentro del bloque | 10 min flexibles a mitad del hackathon |
| Demos + cierre | 125–150 (25') | 3-4 equipos demuestran. Cierre + pre-work S5. |

> **Nota:** el hackathon "de 1h40min" se distribuye así: 10' de setup + 80' de construcción + 10' de break (dentro) ≈ 100 min de bloque hackathon, dejando 25' para demos y cierre. Ajustable.

---

## 2. El concepto: Loop Engineering

La sesión introduce **Loop Engineering** como la evolución natural del Harness (S2) y la Orquestación (S3): no basta con que el agente razone una vez; debe operar en **loops estructurados** con infraestructura que persiste, verifica y se dispara sola.

**Los 4 loops (marco de la sesión):**

| Loop | Nombre | Qué resuelve | API/Herramienta |
|---|---|---|---|
| Loop 1 | **Ejecución** | El agente hace la tarea | Claude / Cowork (ya lo dominan) |
| Loop 2 | **Verificación** | El agente revisa su propio trabajo antes de entregar | OpenRouter (modelo caro crea, barato verifica) |
| Loop 3 | **Memoria** | El agente recuerda entre corridas, no parte de cero | Supabase (estado persistente en la nube) |
| Loop 4 | **Trigger** | El sistema despierta solo, sin humano | Webhook / cron (n8n opcional) |

**El cierre conceptual:** un agente que ejecuta + verifica + recuerda + se dispara solo = un **Chief of Operations** real, no un asistente que espera órdenes. Y todo eso vive en **APIs reales + GitHub** (versionado, auditable, profesional) — no en una carpeta local.

> Esto responde de frente al NPS: *"otras herramientas"*, *"casos avanzados"*, *"optimización de tokens"*, *"¿estoy sub-utilizando mi agente si es todo local?"*.

---

## 3. El stack del reto (fijo)

| Capa | Herramienta | Rol en el reto |
|---|---|---|
| Orquestador / cerebro | **Claude (Cowork o Manus)** | Razona, decide, coordina el flujo |
| Routing de modelos | **OpenRouter** | Loop 2: crea con modelo potente, verifica con barato |
| Memoria | **Supabase** | Loop 3: lee/escribe estado en una tabla en la nube |
| Entregable / versión | **GitHub** | El código/config del agente vive en un repo |
| Trigger (opcional) | **n8n / webhook** | Loop 4: dispara el flujo sin intervención |

---

## 4. El caso (narrativa conocida, infraestructura nueva)

Se mantiene el universo **Grupo Meridian / reactivación de cuentas** que ya conocen de S3, para no introducir contexto nuevo. El cambio es la **infraestructura**:

> **Reto:** "El equipo comercial tiene una cartera de cuentas en una base de datos (Supabase). Construye un agente que: (1) detecte qué cuentas llevan +30 días sin contacto, (2) genere un mensaje de reactivación, (3) **verifique su propia calidad** antes de entregarlo, (4) **registre en la base de datos** qué hizo, y (5) — si llegan al carril avanzado — se **dispare solo** sin que tú lo ejecutes."

Esto es exactamente Loop 1→2→3→4 aplicado a algo que ya entienden.

---

## 5. Los tres carriles (para no perder a nadie)

Cada equipo elige su carril al inicio. **Todos parten de las mismas plantillas de arranque**; el carril define cuánto del stack integran.

### 🟢 Carril 1 — FUNDAMENTOS (Loop 1 + 3)
**Meta:** un agente que lee cuentas desde Supabase, genera el mensaje, y escribe de vuelta el resultado.
- Conectar a Supabase (leer tabla `cuentas`).
- Generar mensaje con Claude.
- Escribir el resultado (status, fecha) de vuelta en Supabase.
- **Entregable:** la tabla cambia tras correr el agente. Repo con el script/config.

### 🟡 Carril 2 — VERIFICACIÓN (Loop 1 + 2 + 3)
**Meta:** lo anterior + el agente verifica su propio output antes de guardarlo.
- Todo lo del Carril 1.
- Añadir Loop 2 con OpenRouter: un modelo barato (Haiku) verifica tono/calidad; si falla, reintenta.
- Registrar en Supabase también el costo y los intentos.
- **Entregable:** evidencia del loop de verificación + tabla con metadata de calidad.

### 🔴 Carril 3 — AUTÓNOMO (Loop 1 + 2 + 3 + 4)
**Meta:** lo anterior + el sistema se dispara solo.
- Todo lo del Carril 2.
- Añadir Loop 4: un webhook (n8n o endpoint) o un cron que dispara el flujo sin intervención.
- **Entregable:** demostrar que al insertar una fila / llamar al webhook, el sistema reacciona solo.

---

## 6. Reglas del hackathon

1. **Equipos de 2-3** (o individual si el proceso es muy personal).
2. **Eligen carril al inicio** — pueden subir de carril si terminan antes.
3. **El entregable vive en GitHub** — un repo (puede ser privado) con el código/config + un `README` que explique qué loops implementaron.
4. **Parten de las plantillas de arranque** que el mentor provee (no arrancan de cero).
5. **Cada equipo usa SU PROPIA base de Supabase** (Modelo 2): crean su proyecto gratis con `schema.sql` + `seed.sql`, o usan el clon local. El cerebro es **Cowork** (ya pagado); OpenRouter solo se usa en el bonus avanzado con llave propia y límite de gasto bajo.
6. **Demo final de 2-3 min** por equipo seleccionado: "¿qué loops lograron y qué vieron cambiar?".

---

## 7. Rúbrica de evaluación

| Criterio | Peso | Qué se evalúa |
|---|---|---|
| **Loop 1 — Ejecución** | 20% | El agente produce el output esperado |
| **Loop 3 — Memoria** | 25% | Lee y escribe estado en Supabase correctamente |
| **Loop 2 — Verificación** | 25% | (Carriles 2-3) El agente revisa su trabajo antes de entregar |
| **Loop 4 — Trigger** | 15% | (Carril 3) El sistema se dispara sin intervención |
| **Entregable en GitHub** | 15% | Repo limpio + README que explica la arquitectura |

> Para el Carril 1, los pesos de Loop 2 y 4 se redistribuyen a Loop 1, 3 y entregable. Nadie es penalizado por elegir un carril accesible: se evalúa la ejecución completa del carril elegido.

---

## 8. Checkpoints durante el hackathon

- **Checkpoint 1 (min ~30 del hackathon):** "¿Quién ya lee desde Supabase?" — desbloqueo de conexión, que suele ser el primer muro.
- **Checkpoint 2 (min ~60):** "¿Quién ya escribe de vuelta / verifica?" — segundo voluntario comparte pantalla; el grupo aprende de la corrección.

---

## 9. Lo que construye el mentor (solución de referencia)

Para demostrar en vivo durante la teoría y para que los equipos clonen como base:

1. **Repo GitHub** con la solución de referencia (los 4 loops).
2. **Esquema Supabase** (`schema.sql`) — tabla `cuentas` lista para crear.
3. **Datos semilla** (`seed.sql`) — cuentas de Grupo Meridian con fechas de último contacto.
4. **Script del agente** que corre los 4 loops end-to-end (reutiliza el `verification_loop_demo.js` ya probado para Loop 2).
5. **Workflow n8n exportable** (`.json`) para el Loop 4 — quien quiera el trigger en la nube lo importa.
6. **Plantillas de arranque por carril** — versiones "rellenar los huecos" para los equipos.

---

## 10. Decisiones de diseño abiertas (para validar con León tras ver la referencia)

- Supabase: el mentor tiene su **propio** proyecto solo para la demo en vivo; cada alumno crea el **suyo** con `schema.sql` + `seed.sql` (Modelo 2). No se comparte una base común para evitar que se pisen los datos.
- ¿El repo de referencia lo dejo público para que clonen fácil, o privado y compartes por invitación?
