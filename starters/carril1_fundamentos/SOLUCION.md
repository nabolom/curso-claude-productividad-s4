# Carril 1 · Solución de los TODOs (solo para el mentor)

> Nota: esto resuelve la **versión en código** (`agente.js`), que es la ruta avanzada/bonus. La ruta recomendada del reto es sin código (`PROMPTS_COWORK.md`).

```js
// TODO (1)
const url = `${SB_URL}/rest/v1/cuentas?estatus_agente=eq.pendiente&select=*&order=ultimo_contacto.asc`;

// TODO (2)
const user =
  `Empresa: ${cuenta.empresa}\nContacto: ${cuenta.contacto}\n` +
  `Etapa del deal: ${cuenta.etapa}\n\nRedacta el mensaje de reactivación.`;

// TODO (3)
const patch = {
  mensaje_generado: mensaje,
  estatus_agente: "contactado",
  updated_at: new Date().toISOString(),
};

// TODO (4)
if (dias < DIAS_UMBRAL) continue;
```

> El carril 1 NO incluye verificación (Loop 2) ni trigger (Loop 4); esos son carriles 2 y 3.
> La solución completa de referencia (los 4 loops) está en `reference_solution/agente_reactivacion.js`.
