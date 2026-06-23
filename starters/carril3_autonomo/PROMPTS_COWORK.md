# 🔴 Carril 3 · Autónomo — Guion de prompts para Cowork

> **Ruta SIN CÓDIGO (recomendada).** Tu agente del Carril 2 ya decide, verifica y te entrega SQL. Ahora haz que **se dispare solo** usando `/schedule`, la función nativa de Cowork — sin servidores ni laptops encendidas a mano.
>
> ¿Quieres un webhook real desde internet (que despierte aunque cierres la app)? Eso es la **ruta avanzada con n8n**: mira `RUTA_C_N8N.md`. **No es necesaria para completar el carril.**

**Requisito:** tener funcionando tu agente del Carril 2 en tu proyecto de Cowork, contra **tu propia** Supabase.

> ⚠️ **Recuerda el patrón:** Cowork no se conecta a Supabase (su entorno no tiene internet). Tú le pasas la foto de la tabla y él te devuelve **comandos SQL** que tú aplicas. Eso vale también para la corrida automática: lo que `/schedule` automatiza es el *razonamiento* de Cowork; tú sigues siendo quien pega el SQL (o, si quieres todo automático en la nube, usas la Ruta C de n8n).

---

## Prompt 1 · Pásale la foto de tu cartera

En **Supabase → SQL Editor**, corre:
```sql
select id, empresa, contacto, dias_sin_contacto, estatus_agente
from cuentas order by dias_sin_contacto desc;
```
Pégale los resultados a Cowork (igual que en Carril 1 y 2):

```text
Esta es mi tabla "cuentas" de Supabase. Eres el cerebro de mi agente de reactivación:

[PEGA AQUÍ LA TABLA DE RESULTADOS]

Arma la lista REACTIVAR (pendiente + más de 30 días sin contacto) y confírmame cuántas son.
```

✅ **Deberías ver:** 4 cuentas en REACTIVAR.

---

## Prompt 2 · Entiende el cambio (manual vs. automático)

```text
Hasta ahora YO disparo el agente cuando le escribo. Quiero entender la diferencia entre:
(a) que yo lo ejecute a mano, y
(b) que se ejecute solo en un horario, sin mí.
Explícamelo en lenguaje simple con el ejemplo de la reactivación de cuentas.
```

✅ **Deberías ver:** Cowork explicando el concepto de trigger/cron de forma sencilla.

---

## Prompt 3 · Programa que corra solo (`/schedule`)

```text
Quiero que esta misma tarea de reactivación se ejecute AUTOMÁTICAMENTE cada día a las 9:00 am,
sin que yo la lance. Usa /schedule para programarla.
Antes de hacerlo, dime exactamente qué va a pasar cada mañana, qué necesito dejar listo
(por ejemplo, la app abierta) y cómo me vas a entregar el SQL resultante de cada corrida.
Luego prográmala.
```

✅ **Deberías ver:** una tarea programada en Cowork. Cowork te aclara que corre mientras la app esté disponible y que cada mañana te dejará listos los `UPDATE`/`INSERT` para aplicar.

> 💡 **Importante (díselo a tu grupo):** `/schedule` en Cowork dispara la tarea mientras tu equipo está despierto y la app activa. Para un disparo 100% en la nube (aunque apagues todo) **y** que escriba directo en Supabase, se usa n8n (Ruta C).

---

## Prompt 4 · Genera el SQL de la corrida (cuentas + bitácora)

```text
Para esta corrida, genérame en UN solo bloque listo para pegar en el SQL Editor de Supabase:
1) los UPDATE de las cuentas de REACTIVAR (mensaje_generado, estatus_agente='contactado', verificado=true);
2) un INSERT en la tabla "corridas" con: fecha (now()), carril='autonomo',
   cuentas_procesadas, cuentas_contactadas, costo_total_usd=0,
   y disparador = 'manual' si lo lancé yo o 'schedule' si lo disparó el horario.
```

✅ **Deberías ver:** un bloque con los `UPDATE` de cuentas + un `INSERT INTO corridas (...)` con el campo `disparador`.

---

## Prompt 5 · Aplica y demuéstralo

1. Copia el bloque SQL y córrelo en **Supabase → SQL Editor**.
2. Verifica las dos tablas:
```sql
select empresa, estatus_agente, verificado from cuentas where estatus_agente = 'contactado';
select fecha, carril, cuentas_contactadas, disparador from corridas order by fecha desc limit 3;
```

✅ **Deberías ver:** la tabla `cuentas` actualizada y una fila en `corridas` con el `disparador` correcto.

> 🔁 **Para una prueba limpia** (resetear antes de demostrar):
> ```sql
> update cuentas set estatus_agente='pendiente', mensaje_generado=null, verificado=false, intentos=0;
> ```

---

## 🏁 Terminaste el Carril 3 si...
- [ ] Programaste el agente con `/schedule` para que el razonamiento corra solo.
- [ ] Cowork te entrega el SQL de cada corrida (cuentas + bitácora).
- [ ] La tabla `corridas` registra una fila con `disparador = 'schedule'`.

➡️ **Reto extra (avanzado):** monta el trigger en la nube con **n8n** (ver `RUTA_C_N8N.md`) para que el sistema despierte y escriba en Supabase aunque tu compu esté apagada.
