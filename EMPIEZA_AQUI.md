# 🚀 EMPIEZA AQUÍ — Guía para principiantes

### Hackathon Sesión 4 · "El Agente Autónomo"

> **Lee esto primero.** Esta guía asume que **nunca** has usado una terminal ni una API. Vamos pasito a pasito. Si algo no entiendes, levanta la mano: estás aquí para aprender, no para sufrir.
>
> ✅ **Ruta recomendada para el reto (sin costo):** construye tu agente con **Claude Cowork como cerebro** siguiendo **[GUIA_ALUMNO_COWORK.md](GUIA_ALUMNO_COWORK.md)**. Esta guía (`EMPIEZA_AQUI.md`) explica la versión **en código/terminal**, útil si quieres profundizar o hacer el bonus de OpenRouter.

---

## 🧭 ¿Qué vas a construir hoy?

Un **agente** (un pequeño programa) que solo:

1. **Lee** una lista de clientes desde una base de datos en internet.
2. **Escribe** un mensaje personalizado para cada uno (usando la inteligencia de Claude).
3. **Guarda** el resultado de vuelta en la base de datos.

Y si te animas a los carriles avanzados: que además **revise su propio trabajo** y **se encienda solo** sin que tú lo toques.

No tienes que escribir el programa desde cero. Te damos una **plantilla con huecos** (marcados como `// TODO`). Tú solo rellenas los huecos.

---

## ✅ Antes de empezar: ¿qué necesito?

Piensa en esto como los ingredientes de una receta. Necesitas 3 cosas:

| Ingrediente | ¿Qué es? | ¿De dónde sale? |
|---|---|---|
| **Node** | El "motor" que ejecuta el programa en tu compu | Lo instalas una vez (ver Paso 1) |
| **Llave de OpenRouter** | Una contraseña para usar a Claude | La sacas en openrouter.ai |
| **Datos en Supabase** | La base de datos con los clientes | Tu mentor te dará el acceso O usas el modo local |

> 💡 **No te preocupes si esto suena a chino.** Cada paso de abajo te dice exactamente qué hacer.

---

## PASO 1 · Instala Node (el motor) — *solo una vez*

Node es lo que hace que el programa funcione. Para ver si ya lo tienes:

1. Abre la **Terminal**:
   - **Mac:** aprieta `Cmd + Espacio`, escribe `Terminal`, dale Enter.
   - **Windows:** menú inicio → escribe `cmd` o `PowerShell`, dale Enter.
2. Escribe esto y dale Enter:
   ```bash
   node --version
   ```
3. **Si ves algo como `v20.x` o `v22.x`** → ¡perfecto, ya lo tienes! Salta al Paso 2.
4. **Si dice "command not found" o error** → instálalo:
   - Ve a **[nodejs.org](https://nodejs.org)**, descarga el botón verde grande ("LTS"), instálalo dándole "Siguiente" a todo. Cierra y vuelve a abrir la terminal.

---

## PASO 2 · Baja el material del reto (clonar)

"Clonar" solo significa **descargar la carpeta del reto** a tu compu.

1. En la terminal, escribe esto y dale Enter:
   ```bash
   git clone https://github.com/nabolom/curso-claude-productividad-s4.git
   ```
2. Entra a la carpeta que se acaba de crear:
   ```bash
   cd curso-claude-productividad-s4
   ```

> 💡 Si no tienes `git`, descárgalo en [git-scm.com](https://git-scm.com) (Siguiente a todo). O pídele a tu mentor el archivo `.zip` y descomprímelo.

---

## PASO 3 · Consigue tu llave de Claude (OpenRouter)

Esta es la "contraseña" que deja que tu agente hable con Claude.

1. Entra a **[openrouter.ai](https://openrouter.ai)** y crea una cuenta (puedes usar Google).
2. Arriba a la derecha: tu foto → **Keys** → **Create Key**.
3. Dale un nombre (ej. "hackathon") y cópiala. **Empieza con `sk-or-...`**
4. ⚠️ **Guárdala en un bloc de notas por ahora.** No la compartas con nadie.

> 💰 **Tip de seguridad:** en Settings → Limits, ponle un límite de gasto bajo (ej. $5 USD). El reto cuesta centavos, pero así duermes tranquilo.

---

## PASO 4 · Consigue el acceso a la base de datos (Supabase)

Aquí tienes **dos caminos**. Elige UNO:

### 🅰️ Camino fácil: tu mentor te da el acceso
Tu mentor te pasará dos datos: una **URL** (`https://algo.supabase.co`) y una **llave**. Solo cópialos y sigue al Paso 5.

### 🅱️ Camino "sin cuenta": modo local
Si no tienes acceso a Supabase, hay un **clon local** que funciona igual.
Abre el archivo **`local_supabase/COMO_USAR.md`** y sigue esos comandos. Te levanta una base de datos en tu propia compu en 1 minuto.

---

## PASO 5 · Conecta tus llaves (variables de entorno)

Ahora le decimos al programa cuáles son tus llaves. En la terminal, **pega estas 3 líneas** (reemplazando con tus datos reales). Dale Enter después de cada una:

**En Mac / Linux:**
```bash
export OPENROUTER_API_KEY="sk-or-...aquí-tu-llave..."
export SUPABASE_URL="https://...aquí-tu-url..."
export SUPABASE_KEY="...aquí-tu-llave-de-supabase..."
```

**En Windows (PowerShell):**
```powershell
$env:OPENROUTER_API_KEY="sk-or-...aquí-tu-llave..."
$env:SUPABASE_URL="https://...aquí-tu-url..."
$env:SUPABASE_KEY="...aquí-tu-llave-de-supabase..."
```

> ⚠️ **Importante:** estas llaves solo "viven" mientras esa ventana de terminal esté abierta. Si la cierras, vuelve a pegarlas.

---

## PASO 6 · Elige tu carril

No todos tienen que hacer lo mismo. Elige según cómo te sientas:

| Carril | Qué construyes | Elígelo si... |
|---|---|---|
| 🟢 **1 · Fundamentos** | Lee → escribe con Claude → guarda | Es tu primera vez con APIs. **Empieza aquí.** |
| 🟡 **2 · Verificación** | Lo anterior + el agente revisa su trabajo | Ya conectaste una API antes |
| 🔴 **3 · Autónomo** | Todo + el agente se enciende solo | Quieres el sistema completo |

> 💚 **Consejo:** si dudas, elige el **🟢 Carril 1**. Terminar el carril fácil vale mucho más que atorarte en el difícil. Siempre puedes subir de nivel después.

---

## PASO 7 · Abre tu plantilla y rellena los huecos

1. Entra a la carpeta de tu carril. Por ejemplo, para el Carril 1:
   ```bash
   cd starters/carril1_fundamentos
   ```
2. Abre el archivo `agente.js` con cualquier editor (recomendamos **[VS Code](https://code.visualstudio.com)**, o ábrelo desde **Manus / Cowork**).
3. Busca los comentarios que dicen **`// TODO`**. Cada uno te explica qué escribir ahí. Rellénalos.

> 🤖 **Puedes usar Manus o Cowork para esto.** Pégale el contenido del archivo y pídele: *"Ayúdame a completar los TODO de este agente, explícame cada uno."* Esa es justo la habilidad que estamos practicando.

---

## PASO 8 · Corre tu agente y mira la magia

1. Asegúrate de estar en la carpeta de tu carril.
2. Escribe esto y dale Enter:
   ```bash
   node agente.js
   ```
3. Verás cómo el agente lee los clientes, escribe los mensajes y los guarda.
4. 🎉 **Abre tu tabla en Supabase** (o el modo local): los datos **cambiaron solos**. Eso lo hizo tu agente.

---

## 🆘 Si algo sale mal (lo más común)

| Lo que ves | Qué significa | Qué hacer |
|---|---|---|
| `command not found: node` | No está instalado el motor | Vuelve al **Paso 1** |
| `OpenRouter 401` | La llave de Claude está mal o vacía | Revisa el **Paso 5**, vuelve a pegar la llave |
| `SELECT 401` o `PATCH 401` | La llave de Supabase está mal | Revisa el **Paso 5** |
| `fetch failed` | Sin internet, o la URL está mal escrita | Revisa tu conexión y la `SUPABASE_URL` |
| No pasa nada / se queda colgado | Quizá faltan las variables | Vuelve a pegar las 3 líneas del **Paso 5** |

> 💡 **Regla de oro:** copia el mensaje de error rojo, pégaselo a Claude/Manus y pregúntale *"¿qué significa este error y cómo lo arreglo?"*. Aprender a desatorarte así es parte del reto.

---

## 🏁 ¿Terminaste?

1. **Sube tu trabajo a tu propio GitHub** (tu mentor te enseña cómo) o muéstralo en pantalla.
2. Prepárate para responder en la demo:
   - ¿Qué carril elegiste?
   - ¿Qué fue lo más difícil?
   - ¿Qué cambió en tu tabla de Supabase?

**¡Eso es todo! Pasaste de tener un asistente a construir un sistema que trabaja por ti. Bienvenido al Loop Engineering. 🔁**
