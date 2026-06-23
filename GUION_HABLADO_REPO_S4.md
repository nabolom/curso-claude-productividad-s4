# Guion hablado — Las dos rutas del repo (S4)

**Para:** León (facilitador) · **Tono:** experto, cercano, con autoridad técnica · **Duración estimada:** 8–11 min
**Cuándo usarlo:** justo después de mostrar el repo en pantalla, antes de soltar a los equipos al hackathon.

> **Cómo leerlo:** las líneas en *cursiva* entre corchetes `[ ]` son **acotaciones de escenario** (qué hacer/mostrar). El resto es lo que **dices en voz alta**. Las pausas marcadas con `(pausa)` son intencionales: dejan que la idea aterrice.

---

## 0 · Gancho de entrada (≈45 seg)

> Muy bien. Antes de que se lancen a construir, quiero que entiendan **una decisión de arquitectura** que tomé al diseñar este reto. Porque no es un detalle técnico: es **la** decisión que separa a alguien que "usa una IA" de alguien que **diseña un sistema con IA**.
>
> *[pausa]*
>
> Este repositorio que ven en pantalla tiene **dos rutas para resolver exactamente el mismo problema**. El mismo agente, el mismo resultado en la base de datos. Pero el "cerebro" vive en lugares distintos. Y entender *por qué* elegirían una u otra… eso es **Loop Engineering** de verdad.

*[Acotación: ten el repo abierto en `github.com/nabolom/curso-claude-productividad-s4`, mostrando la carpeta `starters/`.]*

---

## 1 · El mapa mental: ¿quién es el cerebro? (≈1 min)

> Cuando construyen un agente, la primera pregunta no es "¿qué lenguaje uso?" ni "¿qué API llamo?". La primera pregunta es: **¿quién razona?** ¿Quién toma las decisiones?
>
> Y hay solo dos respuestas posibles. O **la inteligencia vive dentro de tu copiloto** —Cowork, en este caso— y él orquesta todo desde adentro. O **la inteligencia vive afuera**, en un servicio que tu código llama por una API, y tu programa es solo el "cableado" que conecta las piezas.
>
> *[pausa]*
>
> Las dos son válidas. Las dos están en este repo. Se las voy a mostrar lado a lado, porque **la maestría está en saber cuándo usar cada una.**

---

## 2 · RUTA A — Cowork es el cerebro (la ruta sin código) (≈2.5 min)

*[Acotación: abre `GUIA_ALUMNO_COWORK.md` y/o una carpeta `starters/carrilX/PROMPTS_COWORK.md`.]*

> **Ruta A. La que van a usar hoy la mayoría.** Aquí el cerebro **es Cowork**. No hay un programa intermediario que "piense por ustedes": ustedes le hablan a Claude en lenguaje natural, y **Claude mismo** lee la base de datos, razona quién necesita reactivación, redacta el mensaje, se critica a sí mismo y lo vuelve a escribir si no le gustó.
>
> *[pausa]*
>
> Fíjense en lo poderoso de esto: el "Loop 1", ejecutar, y el "Loop 2", verificar, **ocurren dentro del mismo agente**, sin que ustedes escriban una sola línea de código de modelo. Cowork redacta, y un segundo después Cowork se mira al espejo y dice "este mensaje suena acartonado, lo reescribo". Eso es un **agente que se autorregula.**
>
> *[Acotación: señala en la guía el prompt del Carril 2, la parte de "verifícate a ti mismo".]*
>
> ¿Y la parte económica? **Esta ruta no cuesta un peso adicional.** El razonamiento corre dentro de su suscripción de Claude, la que ya pagan. Lo único externo es **Supabase**, que les da memoria en la nube —ahí es donde el viejo `estado.json` local se convierte en una base de datos de verdad— y Supabase, en este reto, es **gratis**.
>
> *[pausa]*
>
> Entonces, Ruta A en una frase: **"Le pido a Cowork que sea mi agente, y él orquesta todo, sin costo de API."** Es la ruta más accesible, y —escúchenme bien— **no es la ruta 'fácil' ni la ruta 'de juguete'**. Es una arquitectura completamente legítima que muchísimos productos reales usan hoy. Es simplemente la ruta donde **la inteligencia ya viene incluida.**

---

## 3 · RUTA B — El código que llama a OpenRouter (la ruta avanzada / bonus) (≈2.5 min)

*[Acotación: abre `starters/carril2_verificacion/agente.js`. Muestra el bloque del "worker" y el "grader".]*

> **Ruta B. La avanzada. El bonus.** Aquí invertimos la arquitectura: el cerebro **ya no es Cowork**, sino **un programa** —este `agente.js`— que ustedes ejecutan, y que cuando corre, **llama a modelos por fuera a través de una API que se llama OpenRouter.**
>
> *[pausa]*
>
> ¿Y por qué alguien querría complicarse así, si la Ruta A ya funciona? **Una palabra: escala.**
>
> Miren esto. *[Acotación: señala el worker y el grader en el código.]* En esta ruta hago algo que en la Ruta A no puedo controlar con tanta precisión: uso **dos modelos distintos a propósito**. Para *redactar* el mensaje —la tarea difícil, creativa— uso un modelo potente y caro, Claude Sonnet. Pero para *verificar* —una tarea más simple, casi mecánica— uso un modelo **barato**, Claude Haiku.
>
> Esto se llama **model routing**, enrutamiento de modelos. Y no es un truco: es **el** patrón de ingeniería que separa un prototipo de un sistema de producción. *[pausa]* Cuando su agente corre **una vez**, da igual qué modelo use; cuestan centavos. Pero cuando corre **cincuenta mil veces al día**, mandar cada verificación trivial al modelo más caro es quemar dinero. Enrutando la verificación al modelo barato, **bajamos el costo entre 40 y 50 por ciento sin perder calidad.**
>
> *[Acotación: si quieres, muestra `respaldo_corridas/corrida_intermedio_openrouter.txt` con el costo real ~$0.016.]*
>
> Lo probé de verdad, está en el repo: la misma reactivación, mismos cuatro clientes, **costo real de un centavo y medio**. Y ahí pueden ver al grader rechazando un mensaje y obligando al worker a reescribirlo. **El Loop 2, hecho explícito en código.**
>
> Ruta B en una frase: **"Escribo el código del agente y enruto cada tarea al modelo óptimo para controlar el costo a escala."**

---

## 4 · El veredicto: cuándo cada una (≈1.5 min)

*[Acotación: si tienes slide de comparación, muéstralo aquí. Si no, usa los dedos / pizarra.]*

> Entonces, ¿cuál es "la buena"? *[pausa]* **Las dos. La pregunta correcta no es cuál es mejor, sino cuándo usar cada una.**
>
> Usen la **Ruta A —Cowork como cerebro—** cuando quieran **validar una idea rápido**, cuando el volumen sea de decenas o cientos de corridas, cuando no quieran gestionar llaves ni costos de API, y cuando valoren **construir hablando** en vez de programando. Que es, honestamente, **el 90% de los casos reales de productividad.**
>
> Usen la **Ruta B —código con routing— ** cuando ya validaron que la idea sirve y ahora necesitan **correrla miles de veces de forma barata y predecible**, cuando quieran control fino sobre qué modelo hace qué, y cuando el sistema tenga que vivir **sin que nadie tenga una app abierta.**
>
> *[pausa]*
>
> Y aquí está el secreto que quiero que se lleven: **casi todo gran sistema empieza en la Ruta A y migra a la Ruta B cuando crece.** Primero prototipas hablando con tu copiloto. Cuando funciona y necesita escalar, lo "endureces" en código. **Ese viaje —de la conversación al sistema— es la carrera profesional entera de un ingeniero de agentes, en miniatura.**

---

## 5 · Transición al reto (≈45 seg)

> Por eso el reto de hoy está diseñado así: **todos arrancan por la Ruta A.** Eligen su carril —Fundamentos, Verificación o Autónomo— y construyen su agente **hablándole a Cowork**, sin costo, sin fricción. *[pausa]* Y si terminan y quieren probar que ya están pensando como ingenieros de producción, ahí los espera el **bonus de la Ruta B**: abren el `agente.js`, ven el routing, y entienden en su propio código por qué Haiku verifica y Sonnet redacta.
>
> *[pausa]*
>
> No se trata de terminar. Se trata de **entender qué están construyendo y por qué.** Cuando su tabla de Supabase cambie frente a sus ojos —y les prometo que es un momento bonito— quiero que sepan exactamente *quién* tomó esa decisión y *dónde* vivió esa inteligencia.
>
> *[Acotación: muestra el link del repo / la guía del alumno en pantalla.]*
>
> El mapa completo está en la guía del repo, paso a paso, con los textos listos para copiar. **Tienen una hora y cuarenta minutos. Su agente los espera. A construir.**

---

## Apéndice · Definiciones de bolsillo (por si alguien pregunta en vivo)

| Si preguntan… | Respuesta de una línea |
|---|---|
| **¿Qué es una API?** | Es un "enchufe" estándar para que dos programas se hablen; tú mandas una petición y recibes una respuesta, sin saber qué hay del otro lado. |
| **¿Qué es OpenRouter?** | Un único enchufe que te da acceso a muchos modelos de IA (Claude, GPT, etc.) y te deja cambiar entre ellos sin reescribir tu código. |
| **¿Qué es Supabase?** | Una base de datos en la nube, gratis para empezar, con la que tu agente "recuerda" entre corridas. Es el `estado.json` pero serio. |
| **¿Qué es GitHub?** | El lugar donde vive y se versiona el código; aquí, además, es donde entregan su trabajo con un link. |
| **¿Qué es model routing?** | Mandar cada tarea al modelo más conveniente: el potente para lo difícil, el barato para lo simple. Así bajas costos sin bajar calidad. |
| **¿Por qué la Ruta A no cuesta?** | Porque el razonamiento ocurre dentro de tu suscripción de Cowork; no llamas a ninguna API externa de pago. |
| **¿El `/schedule` necesita servidor?** | No: corre dentro de Cowork mientras tu equipo esté despierto y la app abierta. Para que despierte "sola" desde internet, eso ya es n8n (avanzado). |

---
---

# 🟣 BLOQUE ADICIONAL · La Ruta C (n8n) — el escalón experto

> **Cuándo usarlo:** después de presentar las Rutas A y B, como el "y todavía hay un nivel más arriba". O al cerrar, como teaser del reto estrella. Duración: 3–4 min.

## C.1 · El gancho de la Ruta C (≈1 min)

> Hasta aquí tenemos dos rutas, y las dos comparten un límite silencioso. *[pausa]* ¿Cuál? **Las dos corren mientras tu computadora está despierta.** Si cierras la laptop, tu agente se duerme contigo.
>
> Pero los agentes de verdad, los que mueven empresas… **no duermen.** Procesan un pago a las 3 de la mañana. Le responden a un cliente que llenó un formulario el domingo. Revisan la cartera cada mañana a las 9 **aunque tú estés de vacaciones.**
>
> *[pausa]*
>
> Para eso existe la **Ruta C.** Aquí el agente **deja tu laptop y se va a vivir a la nube** —a una herramienta que se llama **n8n**— donde espera, despierto, a que algo del mundo real lo dispare.

## C.2 · Qué es n8n y por qué importa (≈1 min)

*[Acotación: muestra el diagrama `assets/flujo_ruta_c.png` o el lienzo de n8n con los nodos en fila.]*

> n8n es una herramienta de **automatización visual**. En vez de escribir código, **conectas cajitas** —nodos— que representan pasos: "recibe una señal", "lee la base de datos", "llama a Claude", "guarda el resultado". Es como armar un diagrama de flujo que **de verdad se ejecuta.**
>
> Y la pieza mágica es la primera caja: el **Webhook.** Es una **URL pública** que vive en internet. Cuando alguien la "toca" —un formulario que se llena, otro sistema, o simplemente un reloj programado— **dispara toda la cadena.** *[pausa]* Eso, señores, es el **Loop 4 hecho realidad**: el agente que se ejecuta solo, sin que nadie lo lance a mano.

## C.3 · Cómo se conecta con lo que ya saben (≈1 min)

> Y aquí está lo elegante: la Ruta C **no es algo nuevo que aprender desde cero.** Es **la misma lógica de la Ruta B, pero viviendo en la nube.** Los mismos loops: lee la cartera *(Loop 3)*, filtra los de más de 30 días *(Loop 3)*, Claude redacta vía OpenRouter *(Loop 1)*, y guarda el resultado *(Loop 3)*. Lo único que cambia es **quién aprieta el botón de inicio** y **dónde vive el agente.**
>
> *[pausa]*
>
> Por eso es el **carril experto opcional.** Les dejé en el repo el workflow **ya armado** —siete cajitas conectadas— para que no empiecen de cero: lo **importan**, pegan sus tres llaves, le dan **Activar**, y ven en su tabla de Supabase cómo las cuentas cambian… **disparadas por una URL, no por su mano.**

## C.4 · Cierre / reto (≈30 seg)

> Así que el mapa completo de hoy es una escalera de tres peldaños. **Ruta A:** le hablas a Cowork y él es el cerebro, sin costo. **Ruta B:** escribes el código y enrutas modelos para escalar barato. **Ruta C:** lo sueltas en la nube y se dispara solo. *[pausa]* De *conversar* con la IA, a *programarla*, a *dejarla vivir sin ti.* **Ese es el viaje completo de Loop Engineering.**
>
> El que llegue a la Ruta C hoy… se va con un agente de nivel producción. **¿Quién se anima al peldaño más alto?**

---

## Apéndice C · Definiciones de bolsillo para la Ruta C

| Si preguntan… | Respuesta de una línea |
|---|---|
| **¿Qué es n8n?** | Una herramienta visual para automatizar: conectas "cajitas" (nodos) y se ejecutan solas en la nube, sin escribir código. |
| **¿Qué es un webhook?** | Una URL pública que, cuando algo la "toca", dispara automáticamente tu flujo. Es el timbre de la puerta de tu agente. |
| **¿Cron vs. webhook?** | El cron lo dispara un **reloj** (cada día a tal hora); el webhook lo dispara un **evento** (alguien llenó un formulario). Ambos viven en la nube. |
| **¿Por qué la Ruta C sí cuesta?** | Porque el cerebro vive en n8n y llama a OpenRouter por API; cada redacción gasta unos centavos. Pon un límite de gasto bajo. |
| **¿Necesito saber programar para n8n?** | No para usar el workflow que les di: se importa y se rellenan 3 campos. Armar uno desde cero ya es nivel intermedio. |
