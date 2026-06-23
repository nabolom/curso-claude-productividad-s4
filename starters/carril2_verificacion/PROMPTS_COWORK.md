# 🟡 Carril 2 · Verificación — Guion de prompts para Cowork

> **Ruta SIN CÓDIGO (recomendada).** Aquí Cowork no solo redacta: **se revisa a sí mismo** antes de guardar. Es el Loop 2 (verificación) hecho por el propio cerebro, sin pagar APIs.
>
> ¿Prefieres la versión en código que usa un modelo barato (Haiku) para verificar? Eso es el **bonus avanzado**: mira `agente.js` y la sección Bonus de `GUIA_ALUMNO_COWORK.md`.

**Requisito:** haber hecho (o entender) el Carril 1. Necesitas tu **propia** Supabase con `schema.sql` + `seed.sql`.

---

## Prompt 1 · Conecta tu memoria

```text
Voy a construir un agente de reactivación que se AUTOVERIFICA, y tú lo vas a operar.
Guarda estos dos datos como variables de entorno de esta sesión y NUNCA los subas a GitHub:

SUPABASE_URL = https://........supabase.co
SUPABASE_KEY = eyJ........

Confírmame que quedaron cargados.
```

---

## Prompt 2 · Lee y decide (igual que Carril 1)

```text
Conéctate a mi Supabase, lee la tabla "cuentas" y arma la lista REACTIVAR:
las cuentas con estatus_agente='pendiente' que llevan MÁS de 30 días sin contacto.
Muéstramela y dime cuántas son.
```

✅ **Deberías ver:** 4 cuentas en REACTIVAR.

---

## Prompt 3 · Redacta CON auto-verificación (el corazón del carril)

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

## Prompt 4 · Guarda con la metadata de calidad

```text
Cuando todos los mensajes pasen tus reglas, guárdalos en mi Supabase:
- "mensaje_generado" = el mensaje final aprobado
- "estatus_agente" = 'contactado'
- "verificado" = true
- "notas_verificacion" = una frase de qué corregiste (o "aprobado a la primera")

Luego léeme la tabla y muéstrame las columnas verificado y notas_verificacion.
```

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
- [ ] Cowork redactó y **se autocorrigió** con reglas claras.
- [ ] Hubo al menos un caso "rechazado → corregido" visible.
- [ ] La tabla guarda `verificado=true` y `notas_verificacion`.

➡️ **¿Quieres el sistema completo?** Ve al **Carril 3** (que corra solo): abre `../carril3_autonomo/PROMPTS_COWORK.md`.
➡️ **¿Quieres el reto de costos?** Haz el **Bonus de OpenRouter** en `GUIA_ALUMNO_COWORK.md`.
