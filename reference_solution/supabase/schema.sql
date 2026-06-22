-- ============================================================
-- Hackathon S4 · Esquema de la base de datos del reto
-- Curso: Claude para Productividad N2 · Sesión 4
-- ------------------------------------------------------------
-- Tabla central: la "memoria" del agente (Loop 3).
-- El estado.json local evoluciona a una tabla en la nube.
-- Ejecutar en: Supabase → SQL Editor → New query → Run
-- ============================================================

-- Tabla principal de cuentas (cartera comercial)
create table if not exists cuentas (
  id                bigint generated always as identity primary key,
  empresa           text not null,
  contacto          text not null,
  email             text,
  etapa             text default 'prospecto',          -- prospecto | negociacion | cerrado | perdido
  ultimo_contacto   date,                              -- cuándo se le contactó por última vez
  dias_sin_contacto integer,                           -- se calcula; ayuda a decidir a quién reactivar
  estatus_agente    text default 'pendiente',          -- pendiente | contactado | omitido
  mensaje_generado  text,                              -- el borrador que produjo el agente (Loop 1)
  verificado        boolean default false,             -- ¿pasó el Loop 2 de verificación?
  intentos          integer default 0,                 -- cuántos intentos necesitó el Loop 2
  costo_usd         numeric(10,6) default 0,           -- costo acumulado del routing (OpenRouter)
  notas_verificacion text,                             -- feedback del verificador
  updated_at        timestamptz default now()          -- cuándo lo tocó el agente por última vez
);

-- Tabla de bitácora: cada corrida del agente deja un registro (auditoría / demo en vivo)
create table if not exists corridas (
  id            bigint generated always as identity primary key,
  ejecutada_en  timestamptz default now(),
  carril        text,                                  -- fundamentos | verificacion | autonomo
  cuentas_procesadas integer default 0,
  cuentas_contactadas integer default 0,
  costo_total_usd numeric(10,6) default 0,
  disparador    text default 'manual'                  -- manual | webhook | cron
);

-- Índice para encontrar rápido a quién reactivar
create index if not exists idx_cuentas_ultimo_contacto on cuentas (ultimo_contacto);

-- ============================================================
-- NOTA SOBRE ROW LEVEL SECURITY (RLS)
-- Para el hackathon (entorno de aprendizaje) dejamos RLS desactivado
-- para simplificar la conexión. En producción SIEMPRE actívalo.
-- ============================================================
alter table cuentas disable row level security;
alter table corridas disable row level security;
