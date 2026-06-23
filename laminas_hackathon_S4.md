# Láminas del Hackathon — Sesión 4
### Contenido lámina por lámina para construir en Claude

> **Cómo usar este archivo:** cada bloque `## LÁMINA N` es una diapositiva. Te doy el **título**, el **contenido** (bullets/tablas), una **nota de diseño** (cómo se ve) y una **nota de orador** (qué dices). Está alineado a la **Arquitectura B: Cowork es el cerebro, sin costo de APIs.**
>
> **Marca:** Collective Academy — verde `#009a4a`, morado `#380c60`, azul claro `#d9eaff`, tipografía Montserrat.
> **Bloque que cubre:** del setup del hackathon hasta el cierre (≈ láminas 13–22 de tu deck). Son **10 láminas**.

---

## LÁMINA 1 — Portada del Hackathon

**Título:** El Agente Autónomo
**Subtítulo:** Hackathon · Sesión 4 · Loop Engineering en acción

**Contenido:**
- Construye un agente que **ejecuta, se verifica, recuerda y se dispara solo.**
- Hoy lo haces real: **Claude Cowork** + **Supabase** + **GitHub**.

**Nota de diseño:** Portada a todo color (morado o verde de marca). Un solo mensaje grande. Ícono de robot/engranaje. Sin bullets visibles, solo el título y subtítulo.

**Nota de orador:** "Dejamos de hablar de loops en teoría. En los próximos 100 minutos cada quien construye uno de verdad."

---

## LÁMINA 2 — El gran cambio: tu agente sale de la laptop

**Título:** De la carpeta local a la nube

**Contenido (2 columnas / antes-después):**
| Antes (S1–S3) | Hoy (S4) |
|---|---|
| `estado.json` en tu compu | Base de datos en la nube (Supabase) |
| Corre solo si tú lo abres | Puede correr solo (`/schedule`) |
| Vive en una carpeta | Vive en un repo (GitHub) |
| El agente "olvida" | El agente **recuerda** entre corridas |

**Nota de diseño:** Tabla a dos columnas, flecha grande del "antes" al "después". Usa el azul claro de fondo para la columna "Hoy". Evita texto denso.

**Nota de orador:** "El salto de hoy no es un agente más listo; es un agente con **infraestructura**. Memoria que persiste y la capacidad de despertarse solo."

---

## LÁMINA 3 — La idea clave: Cowork ES el cerebro

**Título:** Tú ya tienes el cerebro: se llama Cowork

**Contenido:**
- **No necesitas pagar ninguna API.** Cowork (Claude) razona, redacta y se verifica con tu suscripción.
- Lo único externo: **Supabase**, que es **gratis** y le da *memoria*.
- Piensa en Cowork como el **trabajador**; Supabase, como su **libreta de notas en la nube**.

**Destacado (caja):** Cerebro = Cowork (ya lo pagas) · Memoria = Supabase (gratis) · Costo del reto = **$0**

**Nota de diseño:** Diagrama simple de 2 cajas conectadas: [Cowork = cerebro] ↔ [Supabase = memoria]. Caja destacada abajo con el "$0".

**Nota de orador:** "Esto es importante: no van a meter tarjeta a ningún lado. El cerebro ya lo pagaron. Solo le vamos a dar una libreta para que recuerde."

---

## LÁMINA 4 — El reto en una diapositiva

**Título:** Tu misión

**Contenido (lista numerada):**
El equipo comercial tiene una cartera de cuentas en Supabase. Tu agente debe:
1. **Detectar** qué cuentas llevan +30 días sin contacto.
2. **Redactar** un mensaje de reactivación personalizado.
3. **Verificarse** a sí mismo antes de entregar (carril 2+).
4. **Registrar** en la base de datos qué hizo.
5. **Dispararse solo** sin que lo ejecutes (carril 3).

**Nota de diseño:** 5 pasos en fila o en columna con íconos. Resalta el caso "Grupo Meridian" como guiño a S3.

**Nota de orador:** "Es el mismo caso de Grupo Meridian que ya conocen. Lo nuevo no es el problema; es **cómo** lo resolvemos: con loops e infraestructura."

---

## LÁMINA 5 — Elige tu carril

**Título:** Tres carriles — nadie se queda atrás

**Contenido (tabla):**
| Carril | Qué logras | Para quién |
|---|---|---|
| 🟢 **1 · Fundamentos** | Cowork lee, redacta y guarda en Supabase | Tu primera vez |
| 🟡 **2 · Verificación** | + Cowork se revisa a sí mismo (reglas + tono) | Quieres más reto |
| 🔴 **3 · Autónomo** | + corre solo con `/schedule` | Quieres el sistema completo |

**Nota de diseño:** Tres tarjetas de color (verde, amarillo, rojo). Mensaje al pie: "Puedes subir de carril si terminas antes."

**Nota de orador:** "Elijan honestamente dónde están. No hay premio por sufrir; hay premio por **completar** tu carril y entender lo que hiciste."

---

## LÁMINA 6 — Los Loops que vas a construir

**Título:** Lo que pasa dentro de tu agente

**Contenido (tabla):**
| Loop | Qué hace | Quién lo hace |
|---|---|---|
| **1 · Ejecución** | Redacta el mensaje | Cowork |
| **2 · Verificación** | Se revisa antes de entregar | Cowork se autocritica |
| **3 · Memoria** | Lee y escribe estado | Supabase |
| **4 · Trigger** | Despierta solo | `/schedule` de Cowork |

**Nota de diseño:** Diagrama circular o de escalera (Loop 1 → 2 → 3 → 4). Cada loop con un ícono. Mantén consistencia con la lámina de teoría de Loop Engineering.

**Nota de orador:** "Su carril define cuántos de estos loops integran. Carril 1: loops 1 y 3. Carril 3: los cuatro."

---

## LÁMINA 7 — El flujo paso a paso

**Título:** Tu ruta en 8 pasos

**Contenido:** *(Inserta aquí la imagen del diagrama de flujo del repo: `assets/flujo_cowork.png`)*
1. Prepara Supabase → 2. Start a Project en Cowork → 3. Trae el repo → 4. Conecta tu memoria → 5. Elige carril → 6. Corre → 7. Mira la tabla cambiar → 8. Sube a GitHub.

**Nota de diseño:** Pega el PNG del flujo (está en el repo, en `assets/`). Ocupa casi toda la lámina. Mínimo texto encima.

**Nota de orador:** "Esta imagen está en el repo. No tienen que memorizarla; la van a seguir paso a paso desde la guía."

---

## LÁMINA 8 — Las reglas y el entregable

**Título:** Cómo jugamos

**Contenido:**
- **Equipos de 2–3** (o individual si tu proceso es muy personal).
- **80 minutos** de construcción + 2 checkpoints.
- Parten de **plantillas/prompts** listos — no de cero.
- **Entregable:** un repo en **GitHub** + un README de qué loops lograste.
- Cada quien usa **su propia** base de Supabase (Modelo 2).

**Caja destacada:** El link del reto → `github.com/nabolom/curso-claude-productividad-s4`

**Nota de diseño:** Dos columnas: "Reglas" a la izquierda, "Entregable" a la derecha. QR opcional al repo.

**Nota de orador:** "Todo lo que necesitan está en ese link. Ábranlo ahora y vayan a `GUIA_ALUMNO_COWORK.md`."

---

## LÁMINA 9 — Rúbrica (cómo te evalúo)

**Título:** Qué cuenta para tu evaluación

**Contenido (tabla):**
| Criterio | Peso |
|---|---|
| Loop 1 — Ejecución (Cowork redacta) | 25% |
| Loop 3 — Memoria (Supabase) | 30% |
| Loop 2 — Verificación (Cowork se autocritica) | 25% |
| Loop 4 — Trigger (`/schedule`) | 10% |
| Entregable en GitHub | 10% |

**Pie:** En Carril 1 los pesos de Loop 2 y 4 se redistribuyen. El **bonus de OpenRouter** suma puntos extra.

**Nota de diseño:** Tabla limpia. Puedes representar los pesos como barras horizontales de color.

**Nota de orador:** "No los castigo por elegir un carril accesible. Evalúo que **completen** y **entiendan** su carril."

---

## LÁMINA 10 — ¡A construir! (y cierre del bloque)

**Título:** Tienen 80 minutos. ¡Arranquen!

**Contenido:**
- Abre el repo → `GUIA_ALUMNO_COWORK.md` → sigue los pasos.
- Checkpoints: **min 30** ("¿quién ya lee de Supabase?") y **min 60** ("¿quién ya se verifica?").
- ⭐ **¿Terminaste?** Prueba el **bonus**: abaratar a escala con OpenRouter.
- Cuando te atores: **copia el error y pégaselo a Cowork.**

**Nota de diseño:** Lámina energética, a todo color. Un cronómetro grande o "80:00". El link del repo bien visible.

**Nota de orador:** "Regla de oro: no me pregunten a mí primero, pregúntenle a su agente. Yo circulo para los muros grandes. ¡Vamos!"

---

## (Opcional) LÁMINA BONUS — Para los que terminan: routing con OpenRouter

**Título:** ⭐ Bonus: abaratar a escala

**Contenido:**
- Cuando un agente corre **miles** de veces, usar el modelo top para todo es caro.
- La técnica pro: **enrutar** — modelo potente para redactar, modelo barato (Haiku) para verificar.
- Eso se hace con **OpenRouter**. Ahorro típico: **40–50%** sin perder calidad.

**Nota de diseño:** Una gráfica de barras simple: "costo todo-caro" vs "costo con routing". Marca el ahorro.

**Nota de orador:** "Esto es lo que separa un demo de un sistema de producción. No es requisito hoy, pero es a dónde van."

---

## Resumen para construir

| # | Lámina | Tipo |
|---|---|---|
| 1 | Portada del Hackathon | Portada |
| 2 | De local a la nube | Antes/después |
| 3 | Cowork ES el cerebro | Diagrama 2 cajas |
| 4 | El reto en una diapositiva | Lista numerada |
| 5 | Elige tu carril | 3 tarjetas |
| 6 | Los Loops | Diagrama escalera |
| 7 | El flujo en 8 pasos | Imagen `flujo_cowork.png` |
| 8 | Reglas y entregable | 2 columnas + link |
| 9 | Rúbrica | Tabla/barras |
| 10 | ¡A construir! | Cierre energético |
| Bonus | Routing con OpenRouter | Gráfica de ahorro |

> **Imagen lista para usar:** el diagrama de flujo está en el repo en `assets/flujo_cowork.png` (descárgalo desde GitHub para la lámina 7).
