# 🔴 Carril 3 · Autónomo — Guion de prompts para Cowork

> **Ruta SIN CÓDIGO (recomendada).** Tu agente del Carril 2 ya ejecuta, verifica y recuerda. Ahora haz que **se dispare solo** usando `/schedule`, la función nativa de Cowork — sin servidores ni laptops encendidas a mano.
>
> ¿Quieres un webhook real desde internet (que despierte aunque cierres la app)? Eso es la **ruta avanzada con n8n**: mira `README.md` de esta carpeta. **No es necesaria para completar el carril.**

**Requisito:** tener funcionando tu agente del Carril 2 en tu proyecto de Cowork, contra **tu propia** Supabase.

---

## Prompt 1 · Entiende el cambio (manual vs. automático)

```text
Hasta ahora YO disparo el agente cuando le escribo. Quiero entender la diferencia entre:
(a) que yo lo ejecute a mano, y
(b) que se ejecute solo en un horario, sin mí.
Explícamelo en lenguaje simple con el ejemplo de la reactivación de cuentas.
```

✅ **Deberías ver:** Cowork explicando el concepto de trigger/cron de forma sencilla.

---

## Prompt 2 · Programa que corra solo (`/schedule`)

```text
Quiero que esta misma tarea de reactivación se ejecute AUTOMÁTICAMENTE cada día a las 9:00 am,
sin que yo la lance. Usa /schedule para programarla.
Antes de hacerlo, dime exactamente qué va a pasar cada mañana y qué necesito dejar listo
(por ejemplo, la app abierta). Luego prográmala.
```

✅ **Deberías ver:** una tarea programada en Cowork. Cowork te aclara que corre mientras la app esté disponible.

> 💡 **Importante (díselo a tu grupo):** `/schedule` en Cowork dispara la tarea mientras tu equipo está despierto y la app activa. Para un disparo 100% en la nube (aunque apagues todo), se usa n8n (ruta avanzada).

---

## Prompt 3 · Deja huella de que fue automático

```text
Cada vez que el agente corra (manual o programado), quiero que registre la corrida en mi Supabase,
en la tabla "corridas": fecha, cuántas cuentas contactó, y un campo "disparador" que diga
'manual' si lo lancé yo o 'schedule' si lo disparó el horario.
Hazlo ahora para esta corrida y muéstrame la tabla "corridas".
```

✅ **Deberías ver:** una fila en `corridas` con `disparador` indicando el origen.

---

## Prompt 4 · Demuéstralo

```text
Resetea mis cuentas a 'pendiente' para una prueba limpia.
Luego deja que se dispare la tarea programada (o simula el disparo automático) y muéstrame:
1) qué cuentas cambiaron, y 2) la fila de "corridas" con disparador='schedule'.
```

✅ **Deberías ver:** la tabla `cuentas` actualizada y la `corridas` registrando un disparo automático.

---

## 🏁 Terminaste el Carril 3 si...
- [ ] Programaste el agente con `/schedule` para que corra solo.
- [ ] La tabla `cuentas` cambia sin que tú ejecutes nada a mano.
- [ ] La tabla `corridas` registra `disparador = 'schedule'`.

➡️ **Reto extra (avanzado):** monta el trigger en la nube con **n8n** (ver `README.md`) para que el sistema despierte aunque tu compu esté apagada.
