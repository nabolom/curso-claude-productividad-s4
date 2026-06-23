# 🟡 Carril 2 · Verificación — Guion de prompts para Cowork

> **Ruta SIN CÓDIGO (recomendada).** Aquí Cowork no solo redacta: **se revisa a sí mismo** antes de darte el SQL. Es el Loop 2 (verificación) hecho por el propio cerebro, sin pagar APIs.
>
> ¿Prefieres la versión en código que usa un modelo barato (Haiku) para verificar? Eso es el **bonus avanzado**: mira `agente.js` y la sección Bonus de `GUIA_ALUMNO_COWORK.md`.

**Requisito:** haber hecho (o entender) el Carril 1. Necesitas tu **propia** Supabase con `schema.sql` + `seed.sql`.

> ⚠️ **Recuerda:** Cowork NO se conecta a Supabase (su entorno no tiene internet). Tú le pasas la foto de la tabla y él te devuelve **comandos SQL** que tú aplicas. Tú eres el puente.

---

## Prompt 1 · Pásale la foto de tu cartera

En **Supabase → SQL Editor**, corre:
```sql
select id, empresa, contacto, dias_sin_contacto, estatus_agente
from cuentas order by dias_sin_contacto desc;
```
Copia los resultados y pégaselos a Cowork:

```text
Voy a construir un agente de reactivación que se AUTOVERIFICA, y tú lo vas a operar (eres el cerebro).
Esta es mi tabla "cuentas" de Supabase:

[PEGA AQUÍ LA TABLA DE RESULTADOS]

Arma la lista REACTIVAR: cuentas con estatus_agente='pendiente' que llevan MÁS de 30 días sin contacto. Muéstramela y dime cuántas son.
```

✅ **Deberías ver:** 4 cuentas en REACTIVAR.

---

## Prompt 2 · Redacta CON auto-verificación (el corazón del carril)

```text
Para cada cuenta de REACTIVAR, redacta un mensaje de reactivación. Pero antes de dármelo,
VERIFÍCATE a ti mismo con estas reglas y corrige si hace falta:

REGLA 1 (formato): máximo 90 palabras. Prohibidas las frases "lamentamos profundamente",
"estimado cliente" y cualquier saludo robótico.
REGLA 2 (tono): debe sonar humano, cálido y cercano, como un ejecutivo real escribiendo, no una plantilla.

Para cada mensaje, dime: ¿pasó las reglas a la primera? Si no, muéstrame el "antes" (rechazado),
qué regla falló, y el "después" (corregido). Máximo 2 reintentos por mensaje.
```

✅ **Deberías ver:** Cowork mostrando al menos un caso "rechazado → corregido". Eso es el loop de verificación funcionando.

---

## Prompt 3 · Genera el SQL con la metadata de calidad

```text
Cuando todos los mensajes pasen tus reglas, genérame los comandos SQL UPDATE (uno por cuenta de REACTIVAR) que guarden:
- "mensaje_generado" = el mensaje final aprobado
- "estatus_agente" = 'contactado'
- "verificado" = true
- "notas_verificacion" = una frase de qué corregiste (o "aprobado a la primera")

Dámelos en un solo bloque listo para pegar en el SQL Editor de Supabase.
```

✅ **Deberías ver:** un bloque con 4 `UPDATE` que incluyen `verificado = true` y la nota.

---

## Prompt 4 · Aplica los cambios en Supabase

1. Copia el bloque de `UPDATE`.
2. **Supabase → SQL Editor → New query** → pega → **Run**.
3. **Table Editor → cuentas** → refresca y revisa las columnas `verificado` y `notas_verificacion`.

✅ **Deberías ver:** las 4 cuentas con `verificado = true` y una nota de qué se corrigió.

---

## Prompt 5 · Reflexiona (para tu demo)

```text
Resúmeme en 3 frases: ¿cuántos mensajes corregiste, qué errores de tono detectaste,
y por qué verificarse a uno mismo antes de entregar hace al agente más confiable?
```

✅ Esto te da el "discurso" para tu demo de 2-3 minutos.

---

## 🏁 Terminaste el Carril 2 si...
- [ ] Le pasaste la foto de tu base a Cowork.
- [ ] Cowork redactó y **se autocorrigió** con reglas claras.
- [ ] Hubo al menos un caso "rechazado → corregido" visible.
- [ ] Aplicaste el SQL y la tabla guarda `verificado=true` y `notas_verificacion`.

➡️ **¿Quieres el sistema completo?** Ve al **Carril 3** (que corra solo): abre `../carril3_autonomo/PROMPTS_COWORK.md`.
➡️ **¿Quieres el reto de costos?** Haz el **Bonus de OpenRouter** en `GUIA_ALUMNO_COWORK.md`.
