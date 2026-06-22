# Guía de Demos · Sesión 4 — "Loops, verificación y memoria"

**Para:** León Ruiz · **Curso:** Claude para Productividad (N2) · **Sesión 4 de 5**

Esta guía deja listos los **dos demos en vivo** de la sesión y resuelve lo que faltaba. Léela una vez completa y haz la **corrida de prueba** la noche anterior.

---

## 1. Qué faltaba (diagnóstico)

Al revisar el guion y la presentación contra lo que llegó adjunto, esto es lo que encontré:

| Elemento | Estado al recibirlo | Acción tomada |
|---|---|---|
| `guion_facilitacion_S4.md` | Recibido, completo (21 láminas) | Revisado y usado como fuente de verdad |
| `S4_FINAL_Claude_Productividad_N2.pptx` | Recibido, completo | Revisado lámina por lámina |
| **`.md` de demo OpenRouter** | **No llegó en el mensaje** | Reconstruido como esta guía + checklist |
| **`.js` del verification loop** | **No llegó en el mensaje** | **Reconstruido desde cero y probado en vivo** (`verification_loop_demo.js`) |
| Assets del demo de Cowork (Loop 3) | No existían | Creados: `pipeline_grupo_meridian.csv` y `estado.json` |

> **Nota:** Los dos archivos que mencionaste adjuntar (el `.md` de OpenRouter y el `.js`) no llegaron al sistema. Reconstruí ambos calcándolos a las láminas 7-9 y al guion. Si tenías versiones propias, compártelas y las integro; mientras tanto, lo entregado ya funciona end-to-end.

---

## 2. Demo 1 · OpenRouter — Loop 2 (Verification)

Corresponde a las **láminas 7, 8 y 9**. Es el único demo que corre en terminal.

### 2.1 Archivos
```
demos_S4/
├── verification_loop_demo.js   ← el demo (lo que corres en vivo)
├── package.json
└── corrida_respaldo_openrouter.txt  ← salida guardada (plan B si falla la red)
```

### 2.2 Requisitos
- **Node 18 o superior** (usa `fetch` nativo, sin dependencias que instalar).
- **Variable de entorno `OPENROUTER_API_KEY`** con tu API key de OpenRouter.
- Saldo / crédito disponible en OpenRouter (la corrida cuesta **menos de 1 centavo de dólar**).

### 2.3 Setup antes de la sesión (una sola vez)
1. **Pon tu API key como variable de entorno** en la terminal que usarás en vivo:
   ```bash
   export OPENROUTER_API_KEY="sk-or-..."
   ```
   *(En macOS/Linux puedes dejarlo en tu `~/.zshrc` o `~/.bashrc` para que persista.)*

2. **Límite de gasto en OpenRouter (recomendado):** entra a tu cuenta en
   `openrouter.ai → Settings → Limits` y fija un límite mensual bajo (p. ej. $5 USD).
   Es un demo con dinero real; el límite te protege de cualquier sorpresa.

3. **Verifica que los modelos existen** (ya confirmado en tu cuenta):
   - Worker: `anthropic/claude-sonnet-4.5`
   - Grader LLM: `anthropic/claude-3-haiku`

### 2.4 Corrida de prueba (hazla la noche anterior)
```bash
cd demos_S4
node verification_loop_demo.js
```
Deberías ver: worker genera → check determinista (a menudo **falla** por usar una frase prohibida como "lamentamos profundamente") → worker reintenta con feedback → pasa el check de código → Haiku aprueba el tono → **tabla de costos** con ahorro ~40-50 %.

### 2.5 Durante la sesión — cómo narrarlo
Sigue el guion (láminas 8-9). Puntos clave a señalar:
- **El check determinista cuesta $0 y casi siempre falla en el intento 1** — ese es el momento estrella.
- El feedback que regresa al worker es **específico** ("usaste la frase X"), no "inténtalo de nuevo".
- En la tabla, el grader determinista aparece en **$0.00000** y Haiku en fracción de centavo.

### 2.6 Contingencias (ya previstas en el guion)
- **Pasa a la primera (no falla el determinista):** es normal. Di la frase del guion:
  *"Esta vez pasó a la primera — eso también pasa. El retry está ahí para cuando no pasa."*
  Si quieres forzar el fallo para fines didácticos, ver sección 2.7.
- **Falla la red / API:** vuelve a correr. Si falla dos veces, abre
  `corrida_respaldo_openrouter.txt` y nárralo desde ahí.
- **Los números de costo varían** ligeramente en cada corrida — el slide 9 ya lo aclara.

### 2.7 Ajustes opcionales (si quieres garantizar el fallo en vivo)
Para que el primer intento **siempre** falle el check determinista (didáctico), puedes
añadir temporalmente palabras muy comunes a la lista de frases prohibidas en el archivo,
variable `FRASES_PROHIBIDAS` (líneas ~40-46). Por ejemplo agrega `"gracias"`. Recuerda
quitarlo después si quieres realismo. **Recomendación:** déjalo como está — el fallo
natural por "lamentamos profundamente" ocurre la gran mayoría de las veces.

---

## 3. Demo 2 · Cowork — Loop 3 (Memoria + Trigger)

Corresponde a las **láminas 14, 15 y 16**. **No corre en terminal**: se ejecuta dentro de
**Claude Desktop / Cowork** escribiendo la instrucción en vivo. Aquí te dejo los assets que
el guion da por supuestos.

### 3.1 Archivos
```
demos_S4/cowork_demo/
├── pipeline_grupo_meridian.csv   ← el "pipeline" que el agente lee
├── estado.json                   ← archivo de estado SEMILLA (la "memoria de la semana pasada")
└── estado.json.NO-MEMORIA-...txt ← nota sobre las dos narrativas posibles
```

### 3.2 Setup antes de la sesión
1. **Crea una carpeta de trabajo** que Cowork pueda leer/escribir (Drive o carpeta local
   conectada), por ejemplo `CoO-Reactivacion/`.
2. **Copia ahí** `pipeline_grupo_meridian.csv` y `estado.json`.
3. **Decide tu narrativa** (lee la nota incluida):
   - **Narrativa B (recomendada):** deja `estado.json` como está. El agente leerá que
     *Grupo Meridian ya fue contactado el 16-jun* y dirá explícitamente que se enfoca en
     cuentas nuevas. Demuestra memoria en **una sola corrida**.
   - **Narrativa A:** borra `estado.json` antes de la demo; el agente lo crea desde cero
     (primera corrida sin memoria), y corres una segunda vez para mostrar la memoria.
4. **Guarda una copia de respaldo** de `estado.json` para resetear entre ensayos.

### 3.3 La instrucción a escribir en vivo (lámina 15)
> "Programa esto para cada lunes a las 8am: lee `estado.json` para saber qué cuentas ya
> contacté antes. Revisa el pipeline de Grupo Meridian (`pipeline_grupo_meridian.csv`),
> identifica cuentas NUEVAS con más de 30 días sin contacto, crea el dossier de
> reactivación en Drive, manda el resumen al equipo solo si hay algo urgente, y al final
> actualiza `estado.json` con lo que hiciste hoy."

### 3.4 Qué debe pasar (para narrarlo bien)
Con el `estado.json` semilla, el pipeline está diseñado para que el agente:
- **Excluya** Grupo Meridian (ya contactado), Altavista y Brisa (dentro de ventana / no recontactar).
- **Seleccione cuentas nuevas con >30 días:** Kora Health, Nodo Financiero, Vértice Consulting, Helio Energía.
- **Actualice** `estado.json` agregando esas cuentas y la nueva fecha.
- Luego activas el **trigger con `/schedule`** y muestras el **sidebar Scheduled**.

### 3.5 Contingencia
Si Cowork no encuentra el archivo o el formato lo confunde, abre `estado.json` y
`pipeline_grupo_meridian.csv` manualmente y muestra el "antes/después" del estado. El
punto pedagógico (decisiones 01 y 06 de la lámina 16: *leer* y *actualizar* el estado) se
sostiene aunque el run no sea perfecto.

---

## 4. Checklist final pre-sesión (imprime esto)

**Demo 1 · OpenRouter**
- [ ] `export OPENROUTER_API_KEY="..."` hecho en la terminal de la sesión
- [ ] Límite de gasto configurado en OpenRouter
- [ ] Corrida de prueba ejecutada y vista de principio a fin
- [ ] Terminal con fuente grande y legible para proyectar
- [ ] `corrida_respaldo_openrouter.txt` abierto en una pestaña por si falla la red

**Demo 2 · Cowork**
- [ ] `pipeline_grupo_meridian.csv` y `estado.json` en la carpeta conectada a Cowork
- [ ] Narrativa elegida (A o B) y `estado.json` en el estado correcto
- [ ] Copia de respaldo de `estado.json` guardada para resetear
- [ ] Instrucción de la lámina 15 copiada y lista para pegar/escribir
- [ ] Sidebar Scheduled de Cowork accesible para mostrar el trigger

**General**
- [ ] Claude Desktop / Cowork abierto y con sesión iniciada
- [ ] Presentación `.pptx` abierta en la lámina 7 (inicio del primer demo)

---

## 5. Resumen de costos del demo OpenRouter (corrida real)

| Etapa | Modelo | Costo aprox. |
|---|---|---|
| Worker · intento 1 | claude-sonnet-4.5 | ~$0.0021 |
| Grader determinista · intento 1 | código | $0.00000 |
| Worker · intento 2 | claude-sonnet-4.5 | ~$0.0022 |
| Grader determinista · intento 2 | código | $0.00000 |
| Grader Haiku · intento 2 | claude-3-haiku | ~$0.0001 |
| **TOTAL (routing inteligente)** | | **~$0.0045** |
| Si todo usara el modelo caro | | ~$0.0088 |
| **Ahorro** | | **~49 %** |

Los números varían levemente en cada corrida; el rango de ahorro queda entre **40 % y 51 %**,
consistente con el "41 %" que muestra la lámina 9.
