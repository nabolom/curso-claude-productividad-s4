-- ============================================================
-- Hackathon S4 · Datos semilla (la "memoria de semanas pasadas")
-- ------------------------------------------------------------
-- Diseñados a propósito para que el agente:
--   - EXCLUYA cuentas contactadas hace poco (<30 días)
--   - SELECCIONE las que llevan +30 días sin contacto
--   - Una de ellas (Grupo Meridian) conecta con el caso de S3
-- Fechas relativas a una corrida alrededor de junio 2026.
-- Ejecutar DESPUÉS de schema.sql
-- ============================================================

insert into cuentas (empresa, contacto, email, etapa, ultimo_contacto, estatus_agente) values
  -- +30 días sin contacto  => el agente DEBE reactivar estas
  ('Grupo Meridian',      'Carlos Mendoza',   'carlos.mendoza@grupomeridian.mx', 'negociacion', date '2026-05-05', 'pendiente'),
  ('Logística Aurora',    'Diana Rivas',      'driva@aurora-log.com',            'prospecto',   date '2026-04-28', 'pendiente'),
  ('Textiles del Norte',  'Hugo Peña',        'hugo.pena@textilesnorte.mx',      'negociacion', date '2026-05-10', 'pendiente'),
  ('Constructora Vega',   'Marisol Vega',     'mvega@constructoravega.com',      'prospecto',   date '2026-05-01', 'pendiente'),

  -- <30 días sin contacto  => el agente DEBE OMITIR estas (memoria reciente)
  ('Cafetalera del Sur',  'Andrés Loera',     'aloera@cafedelsur.mx',            'cerrado',     date '2026-06-15', 'pendiente'),
  ('FinTech Brava',       'Paola Quiroz',     'pquiroz@fintechbrava.io',         'negociacion', date '2026-06-18', 'pendiente'),
  ('Salud Integral MX',   'Roberto Cano',     'rcano@saludintegral.mx',          'prospecto',   date '2026-06-12', 'pendiente');
