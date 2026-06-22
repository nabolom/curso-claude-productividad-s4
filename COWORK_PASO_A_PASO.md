# 🤖 Cómo construir y correr tu agente DENTRO de Cowork

### Hackathon S4 · "El Agente Autónomo" · Guía paso a paso para Cowork

> ⚠️ **¿Eres alumno y quieres la ruta SIN COSTO (Cowork como cerebro)?** Usa la guía oficial **[GUIA_ALUMNO_COWORK.md](GUIA_ALUMNO_COWORK.md)**.
> Esta guía es la **versión en código (avanzada)**, donde el agente es un programa que llama a APIs externas. Úsala solo para el bonus de OpenRouter o si quieres profundizar.

> Esta guía es para que construyas tu agente **usando Claude Cowork como tu copiloto**. No necesitas ser programador: Cowork escribe y corre el código por ti. Tú lo diriges.
>
> **Modelo de trabajo:** cada quien usa **su propia base de datos** (tu propio proyecto de Supabase o el clon local). Así nadie pisa los datos de nadie y tu agente es 100% tuyo.

---

## 🧭 La idea en una frase

Vas a pedirle a Cowork que construya, contigo, un agente que:
1. **lee** una cartera de clientes desde tu Supabase,
2. **decide** solo a quién reactivar (los de +30 días sin contacto),
3. **redacta** un mensaje con Claude,
4. (carriles 2-3) **se verifica** y **se dispara solo**.

Cowork es quien teclea. Tú revisas, apruebas y aprendes a dirigirlo. **Esa es la habilidad real del curso.**

---

## ✅ Antes de empezar: tus 3 ingredientes

| Ingrediente | Para qué | Dónde se consigue |
|---|---|---|
| 🔑 **OpenRouter API key** | El "cerebro" (Claude) | [openrouter.ai](https://openrouter.ai) → Keys → Create Key |
| 🗄️ **Supabase (URL + key)** | La "memoria" en la nube | [supabase.com](https://supabase.com) → New project → Settings → API |
| 📂 **El repo del reto** | Tus plantillas de arranque | `github.com/nabolom/curso-claude-productividad-s4` |

> 💡 **¿No alcanzaste a crear tu Supabase?** No te detengas: usa el **clon local** (ver `local_supabase/COMO_USAR.md`). Funciona idéntico y luego solo cambias 2 variables.

---

# PARTE 1 · Prepara tu base de datos (una sola vez, ~5 min)

### Paso 1.1 — Crea tu proyecto de Supabase
1. Entra a [supabase.com](https://supabase.com) y haz login (con GitHub es más rápido).
2. Clic en **New project**. Ponle nombre (ej. `mi-agente-s4`) y una contraseña de base de datos (guárdala).
3. Espera ~2 min a que diga **"Project is healthy"** (verde).

### Paso 1.2 — Crea las tablas
1. En el menú izquierdo, abre **SQL Editor** → **New query**.
2. Abre el archivo `reference_solution/supabase/schema.sql` del repo, **copia TODO** y pégalo.
3. Clic en **Run** (abajo a la derecha). Debe decir "Success".

### Paso 1.3 — Carga los datos de ejemplo
1. **New query** otra vez.
2. Copia y pega TODO el contenido de `reference_solution/supabase/seed.sql`.
3. **Run**. Ya tienes 7 clientes de ejemplo (incluido Grupo Meridian).

### Paso 1.4 — Copia tus llaves
1. Menú izquierdo → **Project Settings** (engrane) → **API**.
2. Anota dos cosas (las usarás en un momento):
   - **Project URL** → `https://xxxxx.supabase.co`
   - **`service_role` key** (en "Project API keys") → empieza con `eyJ...`

> ✅ Listo. Tu memoria en la nube está montada.

---

# PARTE 2 · Construye tu agente CON Cowork

> A partir de aquí, **Cowork hace el trabajo**. Tú le das estas instrucciones (cópialas tal cual, o adáptalas a tu estilo).

### Paso 2.1 — Sube el repo a Cowork
En Cowork, dale esta instrucción:

> **"Clona este repositorio y muéstrame su estructura: `https://github.com/nabolom/curso-claude-productividad-s4.git`. Quiero trabajar en la carpeta `starters/`."**

### Paso 2.2 — Dale el contexto y tus llaves
Pega esto en Cowork (reemplaza con TUS valores):

> **"Voy a hacer el Hackathon S4. Estas son mis credenciales para esta sesión, guárdalas como variables de entorno y NO las subas a GitHub:**
> - **OPENROUTER_API_KEY = `sk-or-...`**
> - **SUPABASE_URL = `https://xxxxx.supabase.co`**
> - **SUPABASE_KEY = `eyJ...` (mi service_role key)**
> **Voy a empezar por el Carril 1 (Fundamentos)."**

### Paso 2.3 — Elige tu carril y pídele que lo arme
Según tu nivel, dale UNA de estas instrucciones:

**🟢 Carril 1 — Fundamentos**
> **"Abre `starters/carril1_fundamentos/agente.js`. Tiene 4 comentarios `// TODO`. Ayúdame a completarlos UNO POR UNO, explicándome qué hace cada uno antes de escribirlo. El agente debe: leer las cuentas pendientes de Supabase, saltar las de menos de 30 días, generar un mensaje con Claude para las demás, y guardar el resultado de vuelta en Supabase."**

**🟡 Carril 2 — Verificación**
> **"Abre `starters/carril2_verificacion/agente.js`. Tiene 3 `// TODO`. Además de generar el mensaje, quiero que el agente SE VERIFIQUE a sí mismo: primero con un chequeo de código gratis (largo máximo y frases prohibidas), y si pasa, con un modelo barato (Claude Haiku) que juzgue el tono. Si falla, que reintente con el feedback. Guíame TODO por TODO."**

**🔴 Carril 3 — Autónomo**
> **"Ya tengo mi `agente.js` del Carril 2 funcionando. Ahora quiero que se dispare SOLO, sin que yo lo ejecute a mano. Usa `starters/carril3_autonomo/webhook.js` para levantar un webhook local que ejecute mi agente cuando reciba un POST. Ayúdame a probarlo disparándolo con curl."**

### Paso 2.4 — Córrelo y obsérvalo
Pídele a Cowork:

> **"Ejecuta el agente y muéstrame la salida. Luego dime exactamente qué cambió en mi base de datos de Supabase."**

Abre tu dashboard de Supabase (**Table Editor → cuentas**) y verás cómo el agente cambió las filas **frente a tus ojos**: las 4 cuentas de +30 días pasan a `contactado`, con su mensaje guardado.

---

## 🆘 Si algo sale mal (díselo a Cowork)

| Síntoma | Qué decirle a Cowork |
|---|---|
| Error rojo en pantalla | "Me salió este error: [pega el error]. ¿Qué significa y cómo lo arreglo?" |
| No conecta a Supabase | "Verifica que mis variables SUPABASE_URL y SUPABASE_KEY están bien cargadas y que la tabla `cuentas` existe." |
| Dice 401 / Unauthorized | "Mi API key parece incorrecta. Ayúdame a revisar que esté bien copiada, sin espacios." |
| No pasa nada / 0 cuentas | "Muéstrame qué cuentas hay en la tabla y cuántos días lleva cada una sin contacto. Creo que el filtro de 30 días no está bien." |

> 🎯 **El truco de oro:** cuando te atores, **copia el error completo y pégaselo a Cowork**. Aprender a desatorarte así vale más que memorizar código.

---

## 🔄 Reiniciar para volver a probar

Si quieres correr el agente otra vez desde cero, dile a Cowork:

> **"Resetea mi base de datos: pon todas las cuentas en estatus 'pendiente' y borra los mensajes generados, para volver a probar el agente limpio."**

(O en el SQL Editor de Supabase corre:
`update cuentas set estatus_agente='pendiente', mensaje_generado=null, verificado=false, intentos=0, costo_usd=0;`)

---

## 🏁 ¿Cómo sé que terminé mi carril?

- 🟢 **Carril 1:** las 4 cuentas de +30 días quedaron en `contactado` con un mensaje guardado. Las 3 recientes, intactas.
- 🟡 **Carril 2:** además, la columna `verificado` está en `true` y `intentos` muestra cuántas veces se corrigió.
- 🔴 **Carril 3:** disparaste el agente con un webhook (no a mano) y en la tabla `corridas` aparece `disparador = 'webhook'`.

### Entregable final
Pídele a Cowork:
> **"Sube mi agente.js terminado a un repositorio nuevo en mi GitHub y dame el link para entregarlo."**

---

> **Recuerda:** no se trata de teclear código perfecto. Se trata de **dirigir bien a tu agente** para que construya algo real que se conecta al mundo. Eso es Loop Engineering.
