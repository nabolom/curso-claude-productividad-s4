# 🟢 Carril 1 · Fundamentos — Guion de prompts para Cowork

> **Esta es la ruta SIN CÓDIGO (recomendada).** Tú no programas: **Cowork es tu agente**. Copias estos prompts uno por uno; Cowork decide, redacta y te entrega **comandos SQL listos**, y tú los pegas en el SQL Editor de Supabase.
>
> Si prefieres ver/editar el código tú mismo, mira `agente.js` (versión avanzada con OpenRouter, que corre en TU terminal).

**Lo que vas a lograr:** le das a Cowork la foto de tus cuentas → Cowork decide cuáles llevan +30 días sin contacto → redacta un mensaje de reactivación → te devuelve los `UPDATE` que tú aplicas en Supabase.

> ⚠️ **Importante (el error #1):** Cowork ejecuta código en un entorno **sin internet**, así que **no se conecta solo a tu Supabase**. El patrón correcto es: **tú le pasas los datos** y **él te devuelve los comandos SQL** para que tú los pegues. Tú eres el puente. Sigue siendo un agente real: el cerebro que decide es Cowork.

**Antes de empezar necesitas:** tu **propia** base de Supabase ya creada (con `schema.sql` y `seed.sql` cargados). Si aún no la tienes, ve a `GUIA_ALUMNO_COWORK.md` (Paso 1).

---

## Prompt 1 · Pásale la foto de tu cartera

Primero, en **Supabase → SQL Editor → New query**, corre:
```sql
select id, empresa, contacto, dias_sin_contacto, estatus_agente
from cuentas
order by dias_sin_contacto desc;
```
Copia la tabla de resultados y pégasela a Cowork:

```text
Voy a construir un agente de reactivación de cuentas y TÚ vas a operarlo (eres el cerebro).
Esta es mi tabla "cuentas" copiada de Supabase:

[PEGA AQUÍ LA TABLA DE RESULTADOS]

Guárdala como el estado actual de mis clientes y confírmame cuántas cuentas hay en total.
```

✅ **Deberías ver:** Cowork confirma que recibió 7 empresas (Grupo Meridian, Logística Aurora, etc.).

---

## Prompt 2 · Decide a quién reactivar (la regla de los 30 días)

```text
Con esas cuentas, sepáralas en dos listas:
- "REACTIVAR": las que llevan MÁS de 30 días sin contacto y tienen estatus_agente = 'pendiente'.
- "OMITIR": las recientes (30 días o menos).
Muéstrame ambas listas y explícame por qué cada cuenta cayó en su grupo.
```

✅ **Deberías ver:** 4 cuentas en REACTIVAR (incluida Grupo Meridian) y 3 en OMITIR.

---

## Prompt 3 · Redacta los mensajes

```text
Para cada cuenta de la lista REACTIVAR, redacta un mensaje de reactivación corto (máx 90 palabras),
cálido y personalizado: usa el nombre del contacto y de la empresa, y menciona que hace tiempo no hablamos.
Nada de frases acartonadas tipo "estimado cliente" o "lamentamos profundamente".
Muéstrame los 4 mensajes en una tabla para revisarlos.
```

✅ **Deberías ver:** 4 mensajes distintos, cada uno con el nombre correcto.

---

## Prompt 4 · Genera los comandos SQL para guardar

```text
Ahora genérame los comandos SQL UPDATE (uno por cada cuenta de REACTIVAR) que:
- guarden el mensaje en la columna "mensaje_generado",
- cambien "estatus_agente" a 'contactado'.
Las cuentas de OMITIR no se tocan.
Dámelos en UN solo bloque de código listo para copiar y pegar en el SQL Editor de Supabase.
```

✅ **Deberías ver:** un bloque con 4 `UPDATE cuentas SET ... WHERE id = ...;`

---

## Prompt 5 · Aplica los cambios en Supabase

1. Copia el bloque de `UPDATE` que te dio Cowork.
2. Ve a **Supabase → SQL Editor → New query**, pégalo y dale **Run**.
3. Abre **Table Editor → cuentas** y refresca.

✅ **Deberías ver:** las 4 cuentas ahora en `contactado` con su mensaje. Las 3 recientes intactas.

> 💡 Si un `UPDATE` falla, cópiale el error a Cowork: *"Me salió esto al correr tu SQL: [error]. Corrígelo."*

---

## 🏁 Terminaste el Carril 1 si...
- [ ] Le pasaste la foto de tu base a Cowork.
- [ ] Cowork decidió por su cuenta cuáles reactivar (regla de 30 días).
- [ ] Redactó 4 mensajes personalizados.
- [ ] Te dio los `UPDATE`, los aplicaste y la tabla cambió.

➡️ **¿Te sobró tiempo?** Sube al **Carril 2** (que Cowork se verifique a sí mismo): abre `../carril2_verificacion/PROMPTS_COWORK.md`.
