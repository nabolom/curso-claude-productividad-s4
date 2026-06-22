# Contenido de Slides · Sesión 4 (rediseñada)
## Claude para Productividad · N2 · "Loop Engineering: construye tu Agente Autónomo"

> Estructura: ~22 láminas. Teoría de Loop Engineering + recap integrado S1-S3 + primers de APIs + demo de referencia + hackathon (carriles, stack, rúbrica) + cierre.
> Look & feel: Collective Academy. Tipografía Montserrat. Tono profesional, denso pero claro.

---

## LÁMINA 1 · PORTADA
**Título:** Loop Engineering
**Subtítulo:** Construye tu Agente Autónomo — APIs reales, no carpetas locales
**Pie:** Claude para Productividad · Nivel 2 · Sesión 4 de 5 · León Ruiz
**Visual:** fondo oscuro con la "escalera de 4 loops" insinuada como línea ascendente.

---

## LÁMINA 2 · DÓNDE QUEDAMOS — EL VIAJE HASTA HOY (recap S1-S3)
**Encabezado:** En tres sesiones pasaron de "darle órdenes" a "darle un objetivo".
**Tabla / timeline:**
| Sesión | Lo que construyeron | En lenguaje de loops |
|---|---|---|
| S1 · Fundamentos | Mapearon su proceso y hablaron con el agente | Nace el Loop 1 |
| S2 · Harness & Skills | Le dieron herramientas, skills y acceso real | Loop 1 robusto |
| S3 · Orquestación | Un objetivo → múltiples outputs y destinos, con decisiones propias | Loop 1 completo |
**Frase ancla:** "Hoy su agente ya *ejecuta*. El problema: *ejecutar* no es lo mismo que *ejecutar bien, siempre, y sin que ustedes lo prendan*."
**Nota de facilitación:** conecta con el NPS — el grupo pidió "más herramientas" y "salir de lo local". Hoy se cumple.

---

## LÁMINA 3 · DIAGNÓSTICO RÁPIDO (interacción)
**Encabezado:** Dos preguntas antes de empezar.
**Contenido:**
1. ¿Su agente de S3 corrió de principio a fin? (sí / no / parcial)
2. ¿Alguna vez produjo algo que **no** esperaban? (tono, longitud, algo que tuvieron que corregir)
**Cierre visual:** "Casi todos levantan la mano en la 2. Eso es lo que hoy resolvemos."

---

## LÁMINA 4 · QUÉ ES LOOP ENGINEERING
**Encabezado:** De "prompt" a "sistema".
**Definición (blockquote):** Loop Engineering es diseñar los **ciclos** que hacen a un agente confiable: que ejecute, **se verifique**, **recuerde** y **se dispare solo** — con infraestructura que persiste, no en una carpeta que vive en tu laptop.
**Tres viñetas de encuadre:**
- S2 les dio el *harness*. S3 les dio la *orquestación*. S4 les da los *loops*.
- Un agente sin loops es un asistente que espera órdenes.
- Un agente con loops es un **Chief of Operations** real.

---

## LÁMINA 5 · LA ESCALERA DE LOS 4 LOOPS (marco central)
**Encabezado:** Cuatro niveles que se apilan.
**Diagrama de escalera ascendente:**
| Loop | Nombre | Qué resuelve | Hoy |
|---|---|---|---|
| 1 | Ejecución | El agente hace la tarea | Ya lo tienen (S1-S3) |
| 2 | Verificación | Revisa su propio trabajo antes de entregar | **Hoy** |
| 3 | Memoria | Recuerda entre corridas, no parte de cero | **Hoy** |
| 4 | Trigger | Despierta solo, sin humano | **Hoy (en el reto)** |
| ⟶ | Hill Climbing | Se mejora solo analizando su pasado | Teaser S5 |
**Frase:** "Hoy subimos del Loop 1 al sistema completo — y lo construyen ustedes en el hackathon."

---

## LÁMINA 6 · LOOP 2 — VERIFICACIÓN · EL PROBLEMA
**Encabezado:** "Terminó" no es lo mismo que "lo hizo bien".
**Contenido:** El Agent Loop termina cuando el agente decide que terminó — no cuando el resultado es correcto.
**Cuatro casos (íconos):** exceder longitud · tono incorrecto · promesa no autorizada · inconsistencia entre corridas.
**Cierre:** "Pedirle 'ten más cuidado' no funciona. La solución: un segundo proceso que revisa antes de entregar."

---

## LÁMINA 7 · LOOP 2 — EL PATRÓN (worker · grader · retry)
**Diagrama:** Worker → Grader → (pasa: entrega / falla: feedback específico → reintenta).
**Punto clave 1:** El feedback es **específico** ("142 palabras, máximo 60"), no "intenta de nuevo".
**Punto clave 2 — grader híbrido:**
- **Código gratis** para lo objetivo (longitud, frases prohibidas).
- **LLM barato (Haiku)** solo para lo subjetivo (¿el tono suena empático?).
**Frase:** "Código para lo medible, LLM barato para el juicio. Eso hace la verificación sostenible."

---

## LÁMINA 8 · PRIMER PRIMER: ¿QUÉ ES UNA API? (y por qué hoy importa)
**Encabezado:** Una API es un "enchufe" para que tus programas hablen con un servicio.
**Analogía:** Como el menú de un restaurante: pides algo del menú (request), la cocina te lo devuelve (response). No entras a la cocina.
**Por qué hoy:** hasta ahora su agente vivía "dentro de Cowork". Hoy aprende a **enchufarse a servicios externos** vía API: a un cerebro (OpenRouter), a una memoria (Supabase), a un disparador (webhook/n8n).
**Visual:** diagrama Agente → (API) → Servicio.

---

## LÁMINA 9 · LAS 4 HERRAMIENTAS DEL RETO (primers express)
**Encabezado:** El stack del hackathon, en una línea cada uno.
| Herramienta | Qué es | Su rol hoy |
|---|---|---|
| **OpenRouter** | Una puerta única a muchos modelos de IA (Claude, etc.) | El **cerebro**: un modelo caro crea, uno barato verifica (Loop 2) |
| **Supabase** | Una base de datos en la nube con API automática | La **memoria**: el agente lee/escribe estado (Loop 3) |
| **GitHub** | Donde vive y se versiona el código | El **entregable**: el repo del agente |
| **n8n** (opcional) | Orquestador visual de flujos en la nube | El **disparador**: webhook que despierta al agente (Loop 4) |
**Frase:** "Su agente —vía Cowork o Manus— va a orquestar estas piezas. Ustedes no programan desde cero: completan plantillas."

---

## LÁMINA 10 · LOOP 3 — MEMORIA · EL PROBLEMA
**Encabezado:** Su agente no recuerda nada. Cero.
**Contenido:** Cada vez que el trigger dispara, el agente arranca desde cero. No sabe a quién ya contactó la semana pasada.
**Diagrama "tres lunes":** Lunes 1, 2, 3 → contacta las mismas cuentas una y otra vez.
**Implicación:** sin memoria, manda el mismo email a las mismas cuentas → ruido → irrita clientes.

---

## LÁMINA 11 · LOOP 3 — DE archivo local A BASE DE DATOS EN LA NUBE
**Encabezado:** El `estado.json` evoluciona.
**Antes (S3):** un archivo local que el agente lee al inicio y escribe al final.
**Ahora (S4):** una **tabla en Supabase** — misma idea, pero en la nube: auditable, compartible, sin depender de tu laptop.
**Diagrama:** Corre → lee tabla `cuentas` → trabaja → escribe resultados → la próxima corrida ya sabe qué pasó.
**Frase (responde NPS):** "Esto es 'salir de lo local' que pidieron: su memoria deja de ser un archivo en tu compu y se vuelve infraestructura real."

---

## LÁMINA 12 · LOOP 4 — TRIGGER · CRON VS WEBHOOK
**Encabezado:** ¿Qué despierta al agente?
| | Cron | Webhook |
|---|---|---|
| Qué es | Horario fijo (cada lunes 8am) | Reacciona a un evento en tiempo real |
| Ejemplo | Reporte semanal | Llega un formulario / nuevo registro |
| Herramienta | Cowork `/schedule` | n8n / endpoint en la nube |
| Límite | Depende de Desktop abierto | Corre solo, en la nube |
**Frase:** "Si el momento exacto importa → webhook. Si puede esperar al lunes → cron. Hoy, en el carril avanzado, lo construyen."

---

## LÁMINA 13 · DEMO DE REFERENCIA (mentor, en vivo)
**Encabezado:** El Agente Autónomo, corriendo de verdad.
**Qué verán (la solución de referencia ya probada):**
1. **Loop 3:** lee 7 cuentas de Supabase, decide que 4 tienen +30 días → reactivar; omite 3 recientes.
2. **Loop 1:** Claude (Sonnet 4.5) redacta mensajes personalizados (incl. Grupo Meridian).
3. **Loop 2:** grader código ($0) + Haiku verifican antes de guardar.
4. **Loop 3 (escritura):** la tabla de Supabase cambia en pantalla; se registra la corrida.
5. **Loop 4:** un webhook dispara todo sin tocar la terminal.
**Dato real:** costo total de la corrida ≈ $0.012. "Esto no es simulación — son APIs reales."
**Nota:** comando `node agente_reactivacion.js`. Tabla `cuentas` visible en paralelo.

---

## LÁMINA 14 · EL RETO — "EL AGENTE AUTÓNOMO" (setup del hackathon)
**Encabezado:** Ahora les toca a ustedes. 1h40min.
**Enunciado (blockquote):** "El equipo comercial tiene una cartera de cuentas en Supabase. Construye un agente que detecte cuentas con +30 días sin contacto, genere un mensaje, **verifique su calidad**, **registre en la base** lo que hizo, y —si llegan al carril avanzado— **se dispare solo**."
**Mantra:** "Mismo caso que ya conocen (Grupo Meridian). Lo nuevo es la **infraestructura real**."

---

## LÁMINA 15 · ELIGE TU CARRIL
**Encabezado:** Tres carriles. Eliges uno y lo completas — no los tres a medias.
| Carril | Loops | Para quién |
|---|---|---|
| 🟢 1 · Fundamentos | 1 + 3 | Primer contacto con APIs |
| 🟡 2 · Verificación | 1 + 2 + 3 | Ya conectaste una API |
| 🔴 3 · Autónomo | 1 + 2 + 3 + 4 | Quieres el sistema completo en la nube |
**Frase:** "Todos parten de las mismas plantillas. El carril define cuánto del stack integran. Pueden subir de carril si terminan antes."

---

## LÁMINA 16 · EL STACK Y CÓMO ARRANCAR
**Encabezado:** Lo que necesitan, en 3 variables.
**Setup:**
```
OPENROUTER_API_KEY = ...
SUPABASE_URL = ...
SUPABASE_KEY = ...
```
**Pasos:** clonar el repo base → crear tablas (schema.sql) → cargar datos (seed.sql) → correr su carril → ver la tabla cambiar.
**Orquestador:** lo hacen vía **Cowork o Manus** (el agente escribe/ejecuta el código por ustedes).
**Red de seguridad:** "¿Sin cuenta de Supabase? Hay un clon local listo; cambian 2 variables el día que la tengan."

---

## LÁMINA 17 · REGLAS DEL HACKATHON
**Lista:**
1. Equipos de 2-3 (o individual si el proceso es muy personal).
2. Eligen carril al inicio; pueden subir si terminan.
3. El entregable vive en **GitHub** (repo + README que explica qué loops implementaron).
4. Parten de las **plantillas** — no de cero.
5. Llaves de API con **límite de gasto bajo**.
6. Demo final de 2-3 min: "¿qué loops lograron y qué vieron cambiar?".

---

## LÁMINA 18 · RÚBRICA
**Tabla:**
| Criterio | Peso |
|---|---|
| Loop 1 — Ejecución | 20% |
| Loop 3 — Memoria (Supabase) | 25% |
| Loop 2 — Verificación | 25% |
| Loop 4 — Trigger | 15% |
| Entregable en GitHub (repo + README) | 15% |
**Nota:** "Carril 1 redistribuye Loop 2 y 4. Nadie es penalizado por elegir un carril accesible — se evalúa la ejecución completa del carril elegido."

---

## LÁMINA 19 · CHECKPOINTS (durante el hackathon)
**Encabezado:** Dos pausas para no perder a nadie.
- **Checkpoint 1 (~min 30):** "¿Quién ya lee desde Supabase?" — desbloqueo de la conexión (el primer muro).
- **Checkpoint 2 (~min 60):** "¿Quién ya escribe de vuelta / verifica?" — un voluntario comparte pantalla; el grupo aprende de la corrección.
**Break:** 10 min flexibles a mitad del bloque.

---

## LÁMINA 20 · DEMOS DE EQUIPOS (cierre del hackathon)
**Encabezado:** 3-4 equipos muestran.
**Preguntas guía:** ¿Qué carril eligieron? ¿Qué loop fue el más difícil? ¿Qué vieron cambiar en Supabase / en la corrida?
**Nota:** prioriza variedad de carriles para que el grupo vea los tres niveles.

---

## LÁMINA 21 · LA ESCALERA COMPLETA + TEASER S5
**Encabezado:** Hoy subieron del Loop 1 al sistema completo.
**Recap:** Loop 1 (ya lo tenían) + Loop 2 (verificación) + Loop 3 (memoria en la nube) + Loop 4 (trigger) = **Agente Autónomo**.
**Teaser Loop 4 / Hill Climbing:** "Hoy ustedes diseñaron el grader y la memoria a mano. En S5: el sistema analiza sus propios resultados y **se mejora solo**. Esa es la frontera hacia N3."

---

## LÁMINA 22 · PRE-WORK S5 + CIERRE
**Contenido:**
- Dejen su agente del hackathon en GitHub (link en la plataforma).
- Pre-work: piensen qué proceso real de su trabajo migrarían a este stack.
- S5: demuestran lo que construyeron + ven hacia dónde va en N3.
**Frase final:** "Hoy dejaron de tener un asistente local. Tienen un sistema que ejecuta, se revisa, recuerda y despierta solo. Eso es Loop Engineering."
