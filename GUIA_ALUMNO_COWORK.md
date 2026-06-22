# 🚀 Tu agente en Cowork — Guía para copiar y pegar

### Hackathon S4 · "El Agente Autónomo"

> **Cómo usar esta guía:** vas a copiar los textos en **cajas grises** y pegarlos en **Cowork**, uno por uno. Después de cada paso te digo qué **deberías ver ✅**.
>
> No necesitas saber programar. Necesitas saber **pedir bien**.
>
> **La idea clave:** aquí **Cowork ES tu agente**. Claude lee, razona, redacta y se verifica él mismo — todo dentro de tu suscripción que ya pagas. **No necesitas tarjeta ni pagar APIs.** Lo único externo es **Supabase** (gratis), que le da *memoria en la nube*.

---

## 🗺️ El mapa del viaje

![Flujo del reto en Cowork](assets/flujo_cowork.png)

---

## 🎒 Lo que necesitas tener a la mano

| | Qué | ¿Cuesta? | Dónde sacarlo |
|---|---|---|---|
| 💻 | **Claude Cowork** (app de escritorio) | Ya lo pagas (Pro/Max/Team) | App de Claude Desktop |
| 🗄️ | **Supabase** (URL + key) | **Gratis** | [supabase.com](https://supabase.com) → *New project* → *Settings* → *API* |

> 🟢 **¿Notas qué falta?** No hay "llave de OpenRouter". No la necesitas: el cerebro es Cowork.
>
> ⏱️ Crear el proyecto de Supabase tarda ~2 min en ponerse "verde". Hazlo primero.

---

# PASO 1 · Prepara tu base de datos (en Supabase, no en Cowork)

1. Entra a [supabase.com](https://supabase.com) → **New project** (nómbralo `mi-agente-s4`).
2. Cuando esté verde, ve a **SQL Editor → New query**.
3. Abre el archivo [`reference_solution/supabase/schema.sql`](reference_solution/supabase/schema.sql) del repo, copia todo, pégalo y dale **Run**.
4. **New query** otra vez. Abre [`reference_solution/supabase/seed.sql`](reference_solution/supabase/seed.sql), copia, pega y **Run**.
5. Ve a **Settings → API** y ten a la vista tu **Project URL** y tu **service_role key**.

> ✅ **Deberías ver:** en *Table Editor → cuentas*, 7 empresas (Grupo Meridian, Logística Aurora, etc.).

---

# PASO 2 · Inicia tu proyecto en Claude Cowork

> Cowork está en la **app de escritorio de Claude** (Mac o Windows), no en el navegador. Necesitas un plan de pago (Pro/Max/Team).

1. Abre la **app de Claude Desktop**.
2. Arriba, junto a "Chat", haz clic en la pestaña **Cowork**.
3. En la barra izquierda, entra a **Projects** y haz clic en **+ → Start a Project** (empezar de cero).
4. Nómbralo **`Hackathon S4`**. Cuando te pida **carpeta**, crea/elige una carpeta vacía en tu compu (ej. `Documentos/Hackathon-S4`) — ahí vivirá tu agente.
5. (Opcional pero recomendado) En **instrucciones del proyecto**, pega:
   ```text
   Estoy en el Hackathon S4 del curso Claude para Productividad. Voy a construir un agente que TÚ (Cowork) operas: lees clientes de Supabase, redactas mensajes y te verificas a ti mismo. Explícame cada paso en lenguaje simple antes de ejecutarlo y nunca subas mis llaves a GitHub.
   ```
6. Dentro del proyecto, haz clic en **New task** para empezar a trabajar.

> ✅ **Deberías ver:** un proyecto "Hackathon S4" abierto, con una carpeta conectada y una caja para escribir tu primera tarea.

---

# PASO 3 · Trae el reto a Cowork

En tu nueva tarea, copia esto 👇

```text
Clona este repositorio público y muéstrame su estructura de carpetas:
https://github.com/nabolom/curso-claude-productividad-s4.git

Quiero trabajar en la carpeta "starters". Explícame en una frase qué hay en cada subcarpeta.
```

> ✅ **Deberías ver:** Cowork lista las carpetas `starters/carril1_fundamentos`, `carril2_verificacion`, `carril3_autonomo`, etc.

---

# PASO 4 · Conecta tu memoria (Supabase)

Copia esto y **reemplaza con TUS valores** 👇

```text
Guarda estos dos datos de mi Supabase como variables de entorno para esta sesión y NUNCA los subas a GitHub:

SUPABASE_URL = https://.............supabase.co
SUPABASE_KEY = eyJ............(mi service_role key)

Confírmame que quedaron cargados, sin mostrarlos completos.
```

> ✅ **Deberías ver:** Cowork confirma que los datos están listos. (Solo dos: no hay llave de OpenRouter.)

---

# PASO 5 · Elige tu carril y construye

Copia **solo el bloque de tu carril** 👇

### 🟢 Carril 1 — Fundamentos (si es tu primera vez)

```text
Quiero que TÚ seas mi agente de reactivación. Trabaja paso a paso conmigo y explícame cada cosa en lenguaje simple:

1) Lee de mi Supabase (tabla "cuentas") las que tienen estatus "pendiente".
2) Quédate solo con las que llevan MÁS de 30 días sin contacto; las recientes, sáltalas.
3) Para cada una, REDACTA tú mismo un mensaje de reactivación cálido y personalizado (usa el nombre del contacto y la empresa).
4) Guarda el mensaje en la columna "mensaje_generado" y cambia su estatus a "contactado".

Muéstrame los mensajes antes de guardarlos.
```

### 🟡 Carril 2 — Verificación (si quieres que el agente se controle a sí mismo)

```text
Igual que el Carril 1, pero ahora quiero que ANTES de guardar cada mensaje TE VERIFIQUES a ti mismo:

- Regla 1 (gratis, mental): el mensaje no debe pasar de 90 palabras y NO debe contener frases acartonadas como "lamentamos profundamente" ni "estimado cliente".
- Regla 2: revisa que el TONO sea cálido y humano, no robótico.
- Si un mensaje falla cualquier regla, reescríbelo y vuelve a revisarlo (máximo 2 intentos).

Cuando guardes en Supabase, marca "verificado = true" y escribe en "notas_verificacion" qué corregiste. Muéstrame el antes/después de los que reescribiste.
```

### 🔴 Carril 3 — Autónomo (si quieres que se dispare solo)

```text
Ya tengo mi agente verificador funcionando.
Ahora quiero que se ejecute SOLO, sin que yo lo lance a mano.
Usa el comando /schedule de Cowork para programar que esta tarea corra automáticamente (ej. cada día a las 9am).
Explícame la diferencia entre que YO lo dispare y que un horario lo dispare, y cómo registrar en la tabla "corridas" que esta corrida fue automática (disparador = "schedule").
```

> ✅ **Deberías ver:** Cowork razonando, redactando y (en carril 2+) corrigiéndose a sí mismo. Pregúntale lo que no entiendas.

---

# PASO 6 · Córrelo y míralo cambiar

Copia esto en Cowork 👇

```text
Ejecuta el agente ahora y muéstrame todos los mensajes que generaste.
Después dime exactamente qué filas cambiaron en mi tabla "cuentas" de Supabase y por qué.
```

Ahora abre tu **Supabase → Table Editor → cuentas** y refresca.

> ✅ **Deberías ver:** las **4** cuentas de +30 días (incluida **Grupo Meridian**) ahora dicen `contactado` y tienen un mensaje guardado. Las 3 recientes siguen en `pendiente`. **Tu agente decidió solo.**

---

# PASO 7 · Entrega tu trabajo

Copia esto en Cowork 👇

```text
Sube a un repositorio NUEVO y público en mi cuenta de GitHub:
- el archivo/instrucciones de mi agente,
- un README corto que explique qué hace y qué carril hice.
Dame el link para entregarlo.
```

> ✅ **Deberías ver:** un link tipo `github.com/tu-usuario/mi-agente-s4`. Ese es tu entregable.

---

## ⭐ BONUS (avanzado, opcional) — Abaratar a escala con OpenRouter

> Solo si terminaste tu carril y quieres ir más lejos. **No es necesario** para aprobar el reto.

Cuando un agente corre **miles** de veces al día, usar el modelo más potente para *todo* sale caro. La técnica pro es **enrutar**: usar un modelo barato para las tareas simples (como verificar) y el potente solo para lo difícil. Eso se hace con **OpenRouter** (una API que da acceso a muchos modelos).

Si quieres probarlo, pégale esto a Cowork:

```text
Quiero entender el "model routing" para ahorrar costos a escala.
Abre starters/carril2_verificacion/agente.js (la versión que usa OpenRouter).
Explícame cómo el "worker" usa un modelo potente para redactar y el "grader" usa uno barato (Haiku) para verificar, y por qué eso baja el costo ~40-50% sin perder calidad.
(Necesitaré una OPENROUTER_API_KEY para correrlo de verdad; si no la tengo, solo explícamelo con el código.)
```

> 💡 Este bonus es el puente hacia sistemas de producción reales. Es el "por qué" detrás del Loop 2 a gran escala.

---

## 🆘 Si algo se rompe — díselo a Cowork tal cual

| Si ves... | Pégale a Cowork esto |
|---|---|
| Un error rojo | `Me salió este error: [pega el error completo]. ¿Qué significa y cómo lo arreglo?` |
| No conecta a Supabase | `Verifica que SUPABASE_URL y SUPABASE_KEY estén bien cargadas y que la tabla "cuentas" exista.` |
| `401` o `Unauthorized` | `Creo que mi llave de Supabase está mal. Revisa que sea la service_role y esté bien copiada, sin espacios.` |
| `0 cuentas` / no pasa nada | `Muéstrame qué cuentas hay y cuántos días lleva cada una. Creo que el filtro de 30 días está mal.` |

> 🎯 **La regla de oro del curso:** cuando te atores, **copia el error y pégaselo a tu agente**. Saber desatorarte así vale más que memorizar código.

---

## 🔄 ¿Quieres volver a probar desde cero?

Pégale esto a Cowork:

```text
Resetea mi base: pon todas las cuentas en estatus "pendiente" y borra los mensajes generados,
para correr el agente otra vez desde limpio.
```

---

## 🏁 ¿Terminaste? Checklist

- [ ] 🟢 Las 4 cuentas de +30 días quedaron en `contactado` con un mensaje escrito por Cowork.
- [ ] 🟡 La columna `verificado` está en `true` y `notas_verificacion` muestra qué corrigió (Carril 2+).
- [ ] 🔴 Programaste el agente con `/schedule` para que corra solo (Carril 3).
- [ ] 📂 Subiste tu agente a GitHub y tienes el link.

**¡Eso es Loop Engineering!** Tu agente **ejecuta, se verifica, recuerda y se dispara solo** — y todo lo orquestó Cowork. 🎉
