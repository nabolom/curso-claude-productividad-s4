# 🟢 Carril 1 · Fundamentos — Guion de prompts para Cowork

> **Esta es la ruta SIN CÓDIGO (recomendada).** Tú no programas: **Cowork es tu agente**. Copias estos prompts uno por uno y Cowork lee tu Supabase, redacta los mensajes y guarda los resultados.
>
> Si prefieres ver/editar el código tú mismo, mira `agente.js` (versión avanzada con OpenRouter).

**Lo que vas a lograr:** Cowork lee tus cuentas → decide cuáles llevan +30 días sin contacto → redacta un mensaje de reactivación → escribe el resultado de vuelta en tu Supabase.

**Antes de empezar necesitas:** tu **propia** base de Supabase ya creada (con `schema.sql` y `seed.sql` cargados) y tus dos datos: `SUPABASE_URL` y `SUPABASE_KEY`. Si aún no la tienes, ve a `GUIA_ALUMNO_COWORK.md` (Paso 1).

---

## Prompt 1 · Conecta tu memoria

```text
Voy a construir un agente de reactivación de cuentas y TÚ vas a operarlo.
Guarda estos dos datos como variables de entorno de esta sesión y NUNCA los subas a GitHub:

SUPABASE_URL = https://........supabase.co   (la mía)
SUPABASE_KEY = eyJ........                    (mi service_role key)

Confírmame que quedaron cargados, sin mostrarlos completos.
```

✅ **Deberías ver:** Cowork confirma que los datos están listos.

---

## Prompt 2 · Lee la cartera

```text
Conéctate a mi Supabase y muéstrame en una tabla todas las filas de "cuentas":
nombre de empresa, contacto, estatus_agente y la fecha de ultimo_contacto.
Dime cuántas hay en total.
```

✅ **Deberías ver:** 7 empresas (Grupo Meridian, Logística Aurora, etc.) con sus fechas.

---

## Prompt 3 · Decide a quién reactivar (la regla de los 30 días)

```text
Calcula cuántos días han pasado desde el ultimo_contacto de cada cuenta (hoy es la fecha actual).
Sepáralas en dos listas:
- "REACTIVAR": las que llevan MÁS de 30 días sin contacto y tienen estatus_agente = 'pendiente'.
- "OMITIR": las recientes (menos de 30 días).
Muéstrame ambas listas y explícame por qué cada cuenta cayó en su grupo.
```

✅ **Deberías ver:** 4 cuentas en REACTIVAR (incluida Grupo Meridian) y 3 en OMITIR.

---

## Prompt 4 · Redacta los mensajes

```text
Para cada cuenta de la lista REACTIVAR, redacta un mensaje de reactivación corto (máx 90 palabras),
cálido y personalizado: usa el nombre del contacto y de la empresa, y menciona que hace tiempo no hablamos.
Nada de frases acartonadas tipo "estimado cliente" o "lamentamos profundamente".
Muéstrame los 4 mensajes ANTES de guardarlos para que los apruebe.
```

✅ **Deberías ver:** 4 mensajes distintos, cada uno con el nombre correcto.

---

## Prompt 5 · Guarda el resultado en tu memoria

```text
Ahora escribe en mi Supabase: para cada cuenta de REACTIVAR, guarda el mensaje en la columna
"mensaje_generado" y cambia su "estatus_agente" a 'contactado'.
Las cuentas de OMITIR déjalas igual.
Cuando termines, vuelve a leer la tabla y muéstrame qué filas cambiaron.
```

✅ **Deberías ver:** las 4 cuentas ahora en `contactado` con su mensaje. Las 3 recientes intactas.

---

## Prompt 6 · Compruébalo con tus propios ojos

Abre tu **Supabase → Table Editor → cuentas** y refresca la página.

✅ **Deberías ver:** exactamente lo mismo que te dijo Cowork. **Tu agente decidió y actuó solo.**

---

## 🏁 Terminaste el Carril 1 si...
- [ ] Cowork leyó tu Supabase real.
- [ ] Decidió por su cuenta cuáles reactivar (regla de 30 días).
- [ ] Redactó 4 mensajes personalizados.
- [ ] Escribió los resultados de vuelta y la tabla cambió.

➡️ **¿Te sobró tiempo?** Sube al **Carril 2** (que Cowork se verifique a sí mismo): abre `../carril2_verificacion/PROMPTS_COWORK.md`.
