# Rediseño del Demo de S4 — De "estado.json en Cowork" a una automatización con APIs reales

**Para:** León Ruiz · **Curso:** Claude para Productividad (N2) · **Sesión 4 de 5**
**Contexto:** Tu instinto es correcto — el demo de memoria con `estado.json` en Cowork ya se siente básico para este grupo. Aquí está el porqué (con evidencia del NPS) y cuatro conceptos de demo más potentes con OpenRouter + Supabase + Manus + Claude.

---

## 1. Qué dice la evidencia (S1-S3 + NPS)

### Dónde está el grupo realmente
| Sesión | Qué ya construyeron | Nivel demostrado |
|---|---|---|
| S1 | Mapearon su proceso, criterios de automatización, agente vs. chat | Conceptual |
| S2 | Harness completo: instrucciones globales, carpetas, **MCP**, **Skills** | Configuración real |
| S3 | "Reactivación de cuenta": **16 palabras → 4 outputs en 3 destinos**, con **web search en vivo**, lectura de archivos locales y distribución a Gmail/Drive, **6 decisiones que nadie instruyó** | Orquestación multi-paso |

**Conclusión:** ya vieron a un agente leer múltiples fuentes, razonar, buscar en web y distribuir a varios destinos solo. Un demo de S4 que solo "lee y escribe un `estado.json` local y activa /schedule" es un paso lateral, no un escalón hacia arriba. **Confirma tu lectura.**

### Qué pide el NPS (señales directas, en sus palabras)
El reporte S1-S3 (promedios 8.9 / 9.0 / 8.6) muestra un patrón claro y consistente:

> - **"me gustaría aprender de otras herramientas"** / **"Enseñar más herramientas que tiene Claude"** (S3, repetido)
> - **"Incluir más hacks, mejores prácticas y casos avanzados"** / **"Ajustar el nivel para perfiles más avanzados"** (S1)
> - **"Profundizar en skills, agentes y optimización de tokens"** (S1)
> - **"Mostrar ejemplos variados, no solo reportes de ventas"** (S2)
> - **"Estoy sub-utilizando mi agente si es todo en carpeta local?"** (S2) — *literalmente piden salir de lo local*
> - **"un diagrama que sintetice la arquitectura… entender la diferencia entre los modelos"** (S2)

**Pero también hay una señal de freno importante:**
> - Varios se sienten **"perdidos en la teoría de arquitectura"**, **"ya no sé en qué nivel estoy"**, **"demasiado técnica"**, **"reducir teoría, más práctica guiada paso a paso"**.

### La tensión que hay que resolver
El grupo quiere **más nivel y más herramientas**, pero **no más abstracción**. La forma de subir el techo sin perder a nadie es un **demo "wow" pero concreto**, donde tú conduces y ellos ven un resultado tangible — no un ejercicio que cada quien debe programar desde cero. El laboratorio individual sigue siendo en Cowork (accesible); el **demo del mentor** es el que sube de nivel.

---

## 2. Principio de diseño para el nuevo demo

1. **Conecta con el arco de loops.** El demo debe seguir ilustrando Loop 2 (verificación) y/o Loop 3 (memoria + trigger), pero con **infraestructura real** en lugar de un archivo local. Así el salto se siente como "la versión profesional de lo que ya hacen".
2. **Memoria real = base de datos, no archivo local.** Aquí entra **Supabase**: el `estado.json` evoluciona a una tabla en la nube, consultable, persistente y compartible. Responde directo al comentario *"¿estoy sub-utilizando mi agente si es todo local?"*.
3. **Routing de modelos = OpenRouter.** Ya lo tienes en el demo de Loop 2. Reutilizable para mostrar "modelo caro para crear, barato para verificar" — responde a *"optimización de tokens"* y *"diferencia entre modelos"*.
4. **Orquestación / acción autónoma = Manus + Claude.** Manus como el agente que ejecuta el flujo end-to-end y se conecta a las APIs; Claude como el cerebro de razonamiento.
5. **Tú conduces, ellos observan.** Es demo de mentor (caso avanzado), no laboratorio. El laboratorio se queda en el nivel Cowork actual para no perder a los rezagados.

---

## 3. Cuatro conceptos de demo (elige uno)

> Todos reutilizan el caso narrativo que ya conocen (NorthPeak / Grupo Meridian) para no introducir un contexto nuevo, y todos son "memoria real + verificación + acción", la versión PRO de Loop 2 y Loop 3.

### Concepto A — "El CoO con memoria en la nube" (Supabase como cerebro persistente)
**Una línea:** el archivo `estado.json` se convierte en una **base de datos Supabase real**; el agente lee el historial de contactos desde la tabla, decide a quién contactar, y **escribe el resultado de vuelta** — consultable desde cualquier lado, no atado a una laptop.

- **APIs:** Supabase (Postgres + REST) + Claude (razonamiento) + OpenRouter (opcional para routing).
- **Qué ven en vivo:** una tabla `cuentas` en el dashboard de Supabase que **cambia frente a sus ojos** cuando el agente corre. "La memoria de la semana pasada ahora vive en una base de datos, no en un archivo que solo tú tienes".
- **Conecta con:** Loop 3 (memoria), directamente. Responde a *"no todo local"*.
- **Complejidad de setup:** Media. Crear proyecto Supabase gratis, una tabla, una API key.
- **Factor wow:** Alto — ver la fila actualizarse en el dashboard es muy visual.

### Concepto B — "Verificación con routing real" (OpenRouter, versión PRO del demo que ya tienes)
**Una línea:** tomas el `verification_loop_demo.js` que ya construimos y lo elevas: el output aprobado **se guarda en Supabase** y se muestra el **comparativo de costos entre 3-4 modelos** (Sonnet, Haiku, GPT, etc.) corriendo el mismo grader.

- **APIs:** OpenRouter (multi-modelo) + Supabase (persistencia de resultados).
- **Qué ven en vivo:** la tabla de costos del demo actual + una segunda tabla "mismo trabajo, distintos modelos, distintos precios/calidad" → aterriza *"diferencia entre los modelos"* y *"optimización de tokens"* (ambos pedidos en NPS).
- **Conecta con:** Loop 2 (verificación), directamente.
- **Complejidad de setup:** Baja-media (ya tienes el 70%).
- **Factor wow:** Medio-alto — el argumento económico es muy tangible.

### Concepto C — "El pipeline que se dispara solo desde el mundo real" (Webhook + Manus + Supabase) ★ RECOMENDADO
**Una línea:** un evento externo real (un formulario enviado / un correo / una fila nueva en Supabase) **dispara a Manus**, que lee el contexto desde Supabase, usa Claude para razonar y verificar, ejecuta la acción y **escribe el resultado de vuelta** — todo en la nube, sin Cowork ni laptop encendida.

- **APIs:** Manus (orquestación + trigger por webhook) + Supabase (estado/memoria) + Claude vía OpenRouter (razonamiento + verificación).
- **Qué ven en vivo:** tú llenas un formulario o insertas una fila → segundos después el sistema reacciona solo y la base de datos refleja el resultado. **Esto materializa la diapositiva 13** (cron vs. webhook) que hoy solo es conceptual.
- **Conecta con:** Loop 3 **completo** (trigger webhook + memoria) y cierra el arco hacia Loop 4/N3.
- **Complejidad de setup:** Media-alta. Es el más ambicioso, pero el que mejor responde al NPS ("otras herramientas", "casos avanzados", "no todo local") y al hueco del propio guion (webhook hoy solo se menciona).
- **Factor wow:** Muy alto — "el sistema despertó solo, en la nube, sin que yo tocara nada".

### Concepto D — "Memoria + verificación, todo integrado" (el combinado)
**Una línea:** un solo flujo que une A + B: Manus/Claude genera una respuesta → la verifica con routing de OpenRouter (Loop 2) → guarda estado y resultado en Supabase (Loop 3) → y puede dispararse por webhook. Es el "Chief of Operations PRO" completo.

- **APIs:** las cuatro (OpenRouter + Supabase + Manus + Claude).
- **Conecta con:** Loop 2 **y** Loop 3 juntos — es el resumen vivo de toda la sesión.
- **Complejidad de setup:** Alta. Es el más impresionante pero el de mayor riesgo en vivo.
- **Factor wow:** Máximo, con mayor riesgo de fallo en vivo.

---

## 4. Comparativo rápido

| Concepto | APIs principales | Loop que ilustra | Setup | Riesgo en vivo | Wow | Responde NPS |
|---|---|---|---|---|---|---|
| A · Memoria en la nube | Supabase + Claude | Loop 3 | Media | Bajo | Alto | "no todo local" |
| B · Routing real | OpenRouter + Supabase | Loop 2 | Baja-media | Bajo | Medio-alto | "modelos / tokens" |
| **C · Webhook + Manus ★** | Manus + Supabase + OpenRouter | Loop 3 completo | Media-alta | Medio | Muy alto | "otras herramientas / casos avanzados" |
| D · Combinado | Los 4 | Loop 2 + 3 | Alta | Medio-alto | Máximo | Todo lo anterior |

---

## 5. Mi recomendación

**Concepto C** como demo principal de mentor, apoyándose en el **B** que ya está casi listo:
- En **Loop 2** corres el `verification_loop_demo.js` (ya funciona) — sin cambios.
- En **Loop 3** reemplazas el demo de Cowork con `estado.json` por el **webhook → Manus → Supabase**. Esto materializa la lámina 13 (cron vs webhook), que hoy es solo teoría, y responde de frente a la petición más repetida del NPS ("más herramientas", "casos avanzados", "no todo local").
- El **laboratorio individual** se queda en Cowork (Opciones A/B/C de la lámina 18) para no perder a los rezagados. Solo cambia el demo del mentor.

Si prefieres minimizar riesgo en vivo, **Concepto A** es el punto medio ideal: alto impacto visual (la tabla de Supabase actualizándose), setup contenido y bajo riesgo.

---

## 6. Preguntas para afinar antes de que construya el demo

1. **¿Cuál concepto te late?** (A, B, C, D — o una mezcla).
2. **Manus:** ¿lo presentas como herramienta del curso o lo usas tú como mentor para mostrar la orquestación? ¿El grupo ya conoce Manus o sería su primera exposición?
3. **Supabase:** ¿tienes ya una cuenta/proyecto, o lo creamos desde cero? (es gratis).
4. **Webhook (si eliges C):** ¿prefieres dispararlo con un formulario (ej. un Google Form / Typeform / formulario simple) o con una inserción directa en Supabase para mantenerlo simple?
5. **Alcance:** ¿quieres que deje el demo **completamente funcional y probado** (como hice con el de OpenRouter), o por ahora solo el **diseño + guion** para que tú decidas?
6. **Tiempo en sesión:** el bloque de Loop 3 son ~40 min. ¿Mantenemos ese presupuesto para el nuevo demo?
