# 🚀 Tu agente en Cowork — Guía para copiar y pegar

### Hackathon S4 · "El Agente Autónomo"

> **Cómo usar esta guía:** vas a copiar los textos en **cajas grises** y pegarlos en **Cowork**, uno por uno. Después de cada paso te digo qué **deberías ver ✅**.
>
> No necesitas saber programar. Necesitas saber **pedir bien**.
>
> **La idea clave:** aquí **Cowork ES tu agente**. Claude lee, razona, redacta y se verifica él mismo — todo dentro de tu suscripción que ya pagas. **No necesitas tarjeta ni pagar APIs.** Lo único externo es **Supabase** (gratis), que le da *memoria en la nube*.

---

## 🧠 Cómo funciona el "puente" con Supabase (LÉELO, evita el error #1)

Cuando Cowork ejecuta código, lo corre en un **entorno aislado que NO tiene salida a internet**. Por eso **no puede conectarse solo a tu Supabase**. ¿Y entonces cómo es un agente real?

**Así es el flujo correcto (y muy fácil):**

1. **Tú le das los datos a Cowork** (copias tu tabla de Supabase y se la pegas).
2. **Cowork es el cerebro:** decide, redacta y se verifica a sí mismo.
3. **Cowork te devuelve comandos SQL listos** (`UPDATE ...`).
4. **Tú pegas esos comandos en el SQL Editor de Supabase** y le das Run → tu base cambia. ✅

> 🌉 Tú eres el "cable de red" entre Cowork y Supabase. Cowork piensa; tú aplicas. **Eso sigue siendo un agente:** el cerebro que decide es Cowork, no tú.

---

## 🗺️ El mapa del viaje

![Flujo del reto en Cowork](assets/flujo_cowork.png)

---

## 🎒 Lo que necesitas tener a la mano

| | Qué | ¿Cuesta? | Dónde sacarlo |
|---|---|---|---|
| 💻 | **Claude Cowork** (app de escritorio) | Ya lo pagas (Pro/Max/Team) | App de Claude Desktop |
| 🗄️ | **Supabase** (solo la cuenta + el SQL Editor) | **Gratis** | [supabase.com](https://supabase.com) → *New project* |
| 🐙 | **Cuenta de GitHub** | **Gratis** | [github.com](https://github.com) → *Sign up* (para entregar al final) |

> 🟢 **¿Notas qué falta?** No hay "llave de OpenRouter". No la necesitas: el cerebro es Cowork.
>
> 🔑 **Buena noticia:** como Cowork NO se conecta a Supabase, **no tienes que pelearte con la `service_role key`** para la ruta principal. Solo usarás el **SQL Editor** (copiar y pegar).
>
> ⏱️ Crear el proyecto de Supabase tarda ~2 min en ponerse "verde". Hazlo primero.

---

# PASO 0 · Crea tu cuenta de GitHub (si aún no tienes)

> GitHub es donde, al final, **entregarás tu agente** (Paso 7). Crear la cuenta toma 2 minutos y es gratis. Si ya tienes cuenta, salta al Paso 1.

1. Entra a **[github.com](https://github.com)** y haz clic en **Sign up**.
2. Escribe tu **correo**, una **contraseña** y un **nombre de usuario** (ej. `leonruiz` — será parte del link de tu entregable: `github.com/tu-usuario/...`).
3. Verifica tu correo (te llega un código).
4. Elige el plan **Free** (gratis) cuando te pregunte.

> ✅ **Deberías ver:** tu panel de GitHub con el mensaje *"Welcome"*. Anota tu **usuario** y **contraseña** — los necesitarás en el último paso.

---

# PASO 1 · Prepara tu base de datos (en Supabase)

1. Entra a [supabase.com](https://supabase.com) → **New project** (nómbralo `mi-agente-s4`).
2. Cuando esté verde, ve a **SQL Editor → New query**.
3. Abre el archivo [`reference_solution/supabase/schema.sql`](reference_solution/supabase/schema.sql) del repo, copia todo, pégalo y dale **Run**.
4. **New query** otra vez. Abre [`reference_solution/supabase/seed.sql`](reference_solution/supabase/seed.sql), copia, pega y **Run**.

> ✅ **Deberías ver:** en *Table Editor → cuentas*, 7 empresas (Grupo Meridian, Logística Aurora, etc.).
>
> 📌 **Deja esta pestaña de Supabase abierta.** Vas a volver a ella para pegar lo que Cowork te dé.

---

# PASO 2 · Inicia tu proyecto en Claude Cowork

> Cowork está en la **app de escritorio de Claude** (Mac o Windows), no en el navegador. Necesitas un plan de pago (Pro/Max/Team).

1. Abre la **app de Claude Desktop**.
2. Arriba, junto a "Chat", haz clic en la pestaña **Cowork**.
3. En la barra izquierda, entra a **Projects** y haz clic en **+ → Start a Project** (empezar de cero).
4. Nómbralo **`Hackathon S4`**. Cuando te pida **carpeta**, crea/elige una carpeta vacía en tu compu (ej. `Documentos/Hackathon-S4`) — ahí vivirá tu agente.
5. (Opcional pero recomendado) En **instrucciones del proyecto**, pega:
   ```text
   Estoy en el Hackathon S4 del curso Claude para Productividad. Voy a construir un agente que TÚ (Cowork) operas: yo te paso datos de clientes, tú decides, redactas mensajes y te verificas a ti mismo, y me devuelves comandos SQL listos para que yo los pegue en Supabase. Explícame cada paso en lenguaje simple.
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

# PASO 4 · Dale a Cowork la "foto" de tu base

> Como Cowork no se conecta a Supabase, le pasamos los datos a mano. Es un copia-pega.

1. En **Supabase → SQL Editor → New query**, corre esto para sacar tus cuentas en texto:
   ```sql
   select id, empresa, contacto, dias_sin_contacto, estatus_agente
   from cuentas
   order by dias_sin_contacto desc;
   ```
2. Copia la **tabla de resultados** que te muestra Supabase.
3. Pégasela a Cowork con este mensaje 👇

```text
Esta es la tabla "cuentas" de mi base de datos (copiada de Supabase):

[PEGA AQUÍ LA TABLA DE RESULTADOS]

Guárdala como el estado actual de mis clientes. La regla del negocio es: solo se reactivan las cuentas con MÁS de 30 días sin contacto; las recientes se dejan intactas. Confírmame cuántas cuentas cumplen la regla.
```

> ✅ **Deberías ver:** Cowork te dice algo como *"4 cuentas cumplen la regla (+30 días): Grupo Meridian, …; 3 son recientes y las dejo igual."* **Esa es la decisión del agente.**

---

# PASO 5 · Elige tu carril y construye

Copia **solo el bloque de tu carril** 👇

### 🟢 Carril 1 — Fundamentos (si es tu primera vez)

```text
Ahora actúa como mi agente de reactivación con las cuentas que ya te pasé:

1) Toma SOLO las que tienen más de 30 días sin contacto.
2) Para cada una, REDACTA tú mismo un mensaje de reactivación cálido y personalizado (usa el nombre del contacto y la empresa).
3) Muéstrame todos los mensajes en una tabla para revisarlos.
4) Luego genérame los comandos SQL UPDATE (uno por cuenta) que: guarden el mensaje en la columna "mensaje_generado" y cambien "estatus_agente" a 'contactado'. Dámelos en un bloque listo para copiar.
```

### 🟡 Carril 2 — Verificación (si quieres que el agente se controle a sí mismo)

```text
Igual que el Carril 1, pero ANTES de darme el SQL, VERIFÍCATE a ti mismo cada mensaje:

- Regla 1: máximo 90 palabras y NADA de frases acartonadas ("lamentamos profundamente", "estimado cliente").
- Regla 2: el tono debe ser cálido y humano, no robótico.
- Si un mensaje falla, reescríbelo y vuelve a revisarlo (máximo 2 intentos).

Muéstrame el antes/después de los que reescribiste. En los UPDATE, además marca "verificado = true" y escribe en "notas_verificacion" qué corregiste.
```

### 🔴 Carril 3 — Autónomo (si quieres que se dispare solo)

```text
Ya tengo mi agente verificador.
Ahora quiero que esta tarea se ejecute SOLA, sin que yo la lance a mano.
Usa el comando /schedule de Cowork para programar que corra automáticamente (ej. cada día a las 9am).
Explícame la diferencia entre que YO la dispare y que un horario la dispare, y prepárame también un comando SQL para registrar en la tabla "corridas" que esta corrida fue automática (disparador = 'schedule').
```

> ✅ **Deberías ver:** Cowork razonando, redactando y (en carril 2+) corrigiéndose a sí mismo, y al final **un bloque de comandos `UPDATE`**.

---

# PASO 6 · Aplica los cambios y míralo cambiar

> Aquí cierras el puente: lo que Cowork pensó, tú lo aplicas en la base.

1. Copia el **bloque de comandos SQL** que te dio Cowork.
2. Ve a **Supabase → SQL Editor → New query**, pégalos y dale **Run**.
3. Abre **Table Editor → cuentas** y refresca.

> ✅ **Deberías ver:** las **4** cuentas de +30 días (incluida **Grupo Meridian**) ahora dicen `contactado` y tienen un mensaje guardado. Las 3 recientes siguen en `pendiente`. **Tu agente decidió solo; tú solo aplicaste.**
>
> 💡 Si algún `UPDATE` da error, cópiale el error a Cowork: *"Me salió esto al correr tu SQL: [error]. Corrígelo."*

---

# PASO 7 · Entrega tu trabajo

Copia esto en Cowork 👇

```text
Sube a un repositorio NUEVO y público en mi cuenta de GitHub:
- las instrucciones/prompts de mi agente y los mensajes que generó,
- un README corto que explique qué hace y qué carril hice.
Dame el link para entregarlo.
```

> ✅ **Deberías ver:** un link tipo `github.com/tu-usuario/mi-agente-s4`. Ese es tu entregable.

---

## ⭐ BONUS (avanzado, opcional) — Que el agente SÍ se conecte solo

> Solo si terminaste tu carril y quieres ir más lejos. **No es necesario** para aprobar el reto.

¿Te quedaste con ganas de que el agente lea y escriba en Supabase **sin tu copia-pega**? Eso se logra corriendo el código **fuera del sandbox de Cowork**, donde sí hay internet:

- **Ruta B (en tu terminal):** Cowork **escribe** un `agente.js`, y tú lo corres en **tu propia terminal** con `node agente.js`. Tu compu sí llega a Supabase. Aquí entra **OpenRouter** y el *model routing* para abaratar a escala. Ver [`EMPIEZA_AQUI.md`](EMPIEZA_AQUI.md).
- **Ruta C (en la nube, n8n):** el agente vive en un servidor y se dispara solo con un **webhook**, aunque cierres la laptop. Ver [`RUTA_C_N8N.md`](RUTA_C_N8N.md).

> 💡 La escalera completa: **Ruta A** (Cowork piensa, tú aplicas) → **Ruta B** (corre en tu máquina) → **Ruta C** (vive en la nube). Todo agente real empieza en A y sube cuando lo necesita.

---

## 🆘 Si algo se rompe — díselo a Cowork tal cual

| Si ves... | Pégale a Cowork esto |
|---|---|
| "No me puedo conectar a Supabase" | `No te conectes a Supabase. En vez de eso, dame los comandos SQL UPDATE listos para que yo los pegue en el SQL Editor.` |
| Un error al correr el SQL | `Me salió este error al correr tu SQL en Supabase: [pega el error]. ¿Qué significa y cómo lo arreglo?` |
| Cowork "inventó" cuentas | `Usa SOLO las cuentas de la tabla que te pegué. No agregues ni inventes ninguna.` |
| Contactó una cuenta reciente | `Recuerda la regla: solo cuentas con MÁS de 30 días sin contacto. Corrige tu selección.` |

> 🎯 **La regla de oro del curso:** cuando te atores, **copia el error y pégaselo a tu agente**. Saber desatorarte así vale más que memorizar código.

---

## 🔄 ¿Quieres volver a probar desde cero?

En **Supabase → SQL Editor**, corre esto para resetear:

```sql
update cuentas set estatus_agente='pendiente', mensaje_generado=null, verificado=false, intentos=0;
```

---

## 🏁 ¿Terminaste? Checklist

- [ ] 🟢 Las 4 cuentas de +30 días quedaron en `contactado` con un mensaje escrito por Cowork.
- [ ] 🟡 La columna `verificado` está en `true` y `notas_verificacion` muestra qué corrigió (Carril 2+).
- [ ] 🔴 Programaste el agente con `/schedule` para que corra solo (Carril 3).
- [ ] 📂 Subiste tu agente a GitHub y tienes el link.

**¡Eso es Loop Engineering!** Tu agente **decide, redacta, se verifica y recuerda** — y el cerebro que lo orquestó fue Cowork. 🎉
