# Paso a Paso · Demos Sesión 4

**Para:** León Ruiz · **Curso:** Claude para Productividad (N2) · **Sesión 4 de 5**

Sigue estos pasos en orden. Hay tres fases: **(A)** preparar el demo de OpenRouter, **(B)** preparar el demo de Cowork, **(C)** el día de la sesión. Calcula **20-30 min** para dejar todo listo la primera vez.

---

## FASE A · Demo 1 — OpenRouter (Loop 2, corre en terminal)

### Paso A1 · Verifica que tienes Node
Abre tu terminal y escribe:
```bash
node --version
```
- Si responde `v18` o mayor (ej. `v22.13.0`) → **listo**, pasa al paso A2.
- Si dice "command not found" → instala Node desde https://nodejs.org (versión LTS) y repite.

### Paso A2 · Descarga la carpeta del demo
1. Descarga el archivo **`demos_S4.zip`** que te envié.
2. Descomprímelo. Quedará una carpeta `demos_S4/`.
3. En la terminal, entra a esa carpeta:
   ```bash
   cd ruta/donde/lo/descomprimiste/demos_S4
   ```
   *(Tip: escribe `cd ` con un espacio y arrastra la carpeta a la terminal para autocompletar la ruta.)*

### Paso A3 · Consigue tu API key de OpenRouter
1. Entra a https://openrouter.ai e inicia sesión.
2. Ve a **Keys** (menú de tu cuenta) → **Create Key**.
3. Copia la clave (empieza con `sk-or-...`).

### Paso A4 · Pon un límite de gasto (te protege, 1 minuto)
1. En OpenRouter ve a **Settings → Limits** (o **Credits → Limits**).
2. Fija un límite mensual bajo, por ejemplo **$5 USD**. El demo cuesta menos de 1 centavo, pero esto evita cualquier sorpresa.

### Paso A5 · Carga la API key en tu terminal
En la **misma terminal** donde vas a correr el demo, pega esto (sustituye por tu clave real):
```bash
export OPENROUTER_API_KEY="sk-or-TU-CLAVE-AQUI"
```
Verifica que quedó cargada:
```bash
echo $OPENROUTER_API_KEY
```
Debe imprimir tu clave. 

> **Importante:** esta variable solo vive en esa ventana de terminal. Si cierras la terminal, repite este paso. Para que sea permanente, agrega esa línea `export ...` al final de tu archivo `~/.zshrc` (Mac) o `~/.bashrc` (Linux) y reinicia la terminal.

### Paso A6 · Corrida de prueba (hazla la NOCHE ANTERIOR)
Estando dentro de la carpeta `demos_S4`:
```bash
node verification_loop_demo.js
```
Deberías ver, en orden:
1. La reseña negativa de NorthPeak.
2. `[WORKER → claude-sonnet-4.5]` generando la respuesta.
3. `[GRADER · CHECK DETERMINISTA]` → casi siempre **✗ FALLA** por usar una frase prohibida (ej. "lamentamos profundamente"). **Este es el momento estrella del demo.**
4. El worker **reintenta** con el feedback específico.
5. El check determinista **✓ pasa** y luego **Haiku ✓ APRUEBA** el tono.
6. La **tabla de costos** con el ahorro (~40-51 %).

Si ves todo eso, **el demo está listo**.

### Paso A7 · Plan B (por si falla el internet en vivo)
Dentro de la carpeta tienes `corrida_respaldo_openrouter.txt` con una corrida ya capturada. Si la red falla dos veces en vivo, ábrelo y nárralo desde ahí. No necesitas internet para mostrarlo.

---

## FASE B · Demo 2 — Cowork (Loop 3, corre dentro de Claude Desktop/Cowork)

Este demo **no usa la terminal**. Se ejecuta escribiendo una instrucción en Cowork. Solo tienes que dejar dos archivos en su lugar.

### Paso B1 · Crea una carpeta conectada a Cowork
1. En Cowork, identifica una carpeta a la que tenga acceso de lectura/escritura (una carpeta local conectada o de Drive).
2. Crea ahí una subcarpeta, por ejemplo: **`CoO-Reactivacion/`**.

### Paso B2 · Copia los dos archivos del demo
De la carpeta `demos_S4/cowork_demo/` copia a tu carpeta `CoO-Reactivacion/`:
- `pipeline_grupo_meridian.csv` (el pipeline de cuentas)
- `estado.json` (la "memoria de la semana pasada")

### Paso B3 · Elige tu narrativa (decide ahora)
- **Narrativa B — RECOMENDADA (demuestra memoria en 1 sola corrida):**
  Deja `estado.json` tal cual. Como ya dice que *Grupo Meridian fue contactado el 16-jun*, el agente lo leerá y dirá "esa cuenta ya la contacté, me enfoco en las nuevas". Efecto inmediato y claro.
- **Narrativa A — la del guion (primera corrida crea el estado):**
  Borra o renombra `estado.json` antes de la demo. El agente no lo encontrará y lo creará desde cero. Luego corres una **segunda** vez para mostrar que ya tiene memoria.

### Paso B4 · Guarda un respaldo para resetear
Antes de la sesión, haz una copia de `estado.json` (por ejemplo `estado_backup.json`) para poder volver al estado inicial entre ensayos.

### Paso B5 · Ten lista la instrucción para escribir en vivo
Copia esta instrucción (es la de la lámina 15) para pegarla/escribirla en Cowork:
> "Programa esto para cada lunes a las 8am: lee `estado.json` para saber qué cuentas ya contacté antes. Revisa el pipeline de Grupo Meridian (`pipeline_grupo_meridian.csv`), identifica cuentas NUEVAS con más de 30 días sin contacto, crea el dossier de reactivación en Drive, manda el resumen al equipo solo si hay algo urgente, y al final actualiza `estado.json` con lo que hiciste hoy."

### Paso B6 · Qué debe pasar (para narrarlo)
Con los archivos que te dejé, el agente debería:
- **Excluir** Grupo Meridian (ya contactado), Altavista y Brisa (recién contactadas / no recontactar).
- **Seleccionar** las nuevas con +30 días: Kora Health, Nodo Financiero, Vértice Consulting, Helio Energía.
- **Actualizar** `estado.json` con esas cuentas y la fecha de hoy.
- Después activas el **trigger con `/schedule`** y muestras el **sidebar Scheduled**.

---

## FASE C · El día de la sesión (orden de ejecución)

1. **Antes de empezar:** abre la presentación `.pptx`, Claude Desktop/Cowork con sesión iniciada, y una terminal con `OPENROUTER_API_KEY` ya cargada (repite el Paso A5 si abriste una terminal nueva). Sube el tamaño de fuente de la terminal para proyectar.
2. **Láminas 1-6:** apertura, marco de loops, Loop 1 recap, Loop 2 concepto. (Sin demo todavía.)
3. **Lámina 7:** presenta el caso NorthPeak.
4. **Lámina 8 — DEMO 1 EN VIVO:** en la terminal, corre:
   ```bash
   node verification_loop_demo.js
   ```
   Narra cada bloque conforme aparece (worker → falla determinista → reintento → aprueba).
5. **Lámina 9:** lee la tabla de costos en voz alta y cierra con el argumento de escala.
6. **Lámina 10:** break de 10 min. *(Aprovecha para verificar que la carpeta de Cowork está lista.)*
7. **Láminas 11-13:** Loop 3 concepto (memoria + cron/webhook).
8. **Láminas 14-15 — DEMO 2 EN VIVO:** en Cowork, escribe la instrucción del Paso B5. Al terminar, **muestra el `estado.json`** actualizado y activa el trigger con `/schedule` (muestra el sidebar Scheduled).
9. **Lámina 16:** señala las decisiones 01 y 06 (leer y actualizar el estado) como lo nuevo.
10. **Láminas 17-21:** recap, laboratorio (30 min), checkpoint, cierre y pre-work de S5.

---

## CHECKLIST RÁPIDO (marca antes de iniciar)

**OpenRouter (Demo 1)**
- [ ] `node --version` ≥ 18
- [ ] `demos_S4.zip` descomprimido y `cd` dentro de la carpeta
- [ ] `export OPENROUTER_API_KEY="..."` ejecutado y verificado con `echo`
- [ ] Límite de gasto fijado en OpenRouter
- [ ] Corrida de prueba vista completa la noche anterior
- [ ] `corrida_respaldo_openrouter.txt` abierto en una pestaña

**Cowork (Demo 2)**
- [ ] `pipeline_grupo_meridian.csv` y `estado.json` en la carpeta de Cowork
- [ ] Narrativa elegida (A o B) y `estado.json` en el estado correcto
- [ ] Copia de respaldo de `estado.json` guardada
- [ ] Instrucción de la lámina 15 copiada y lista

**General**
- [ ] Presentación abierta en lámina 1
- [ ] Terminal con fuente grande para proyectar
- [ ] Claude Desktop/Cowork con sesión iniciada

---

## Si algo falla (resumen de contingencias)

| Problema | Qué hacer |
|---|---|
| `command not found: node` | Instala Node LTS desde nodejs.org |
| "Falta OPENROUTER_API_KEY" | Repite el Paso A5 en esa misma terminal |
| Error 401 / 402 de OpenRouter | Clave inválida o sin crédito: revisa Keys y Credits |
| El demo pasa a la primera (no falla) | Es normal; di la frase del guion: *"esta vez pasó a la primera, el retry está ahí para cuando no pasa"* |
| Falla la red en vivo | Reintenta; si falla 2 veces, usa `corrida_respaldo_openrouter.txt` |
| Cowork no encuentra el archivo | Abre `estado.json` y el CSV manualmente y muestra el antes/después |
