# Clon local de Supabase (para probar sin cuenta)

Este stack levanta una API REST **idéntica en forma a Supabase** (`/rest/v1/<tabla>`), para que el agente corra de verdad sin necesidad de una cuenta. El día que tengas Supabase real, **solo cambias 2 variables** y todo funciona igual.

## Piezas
- **PostgreSQL** — la base de datos.
- **PostgREST** — convierte la base en una API REST (es lo que Supabase usa por debajo).
- **supabase_proxy.py** — reescribe `/rest/v1/...` para que la URL sea igual a la de Supabase.

## Arranque (en el sandbox / una máquina Linux)
```bash
# 1. Postgres
sudo service postgresql start

# 2. Crear DB + roles + tablas + datos
sudo -u postgres psql -c "CREATE DATABASE hackathon_s4;"
sudo -u postgres psql -d hackathon_s4 -f setup_local_db.sql
sudo -u postgres psql -d hackathon_s4 -f ../reference_solution/supabase/schema.sql
sudo -u postgres psql -d hackathon_s4 -f ../reference_solution/supabase/seed.sql

# 3. PostgREST (API) + proxy (forma Supabase)
postgrest postgrest.conf &        # escucha en :3000
python3 supabase_proxy.py &       # expone /rest/v1 en :8000

# 4. Variables para el agente
export SUPABASE_URL="http://localhost:8000"
export SUPABASE_KEY="$(cat service_role.jwt)"
```

## Migrar a Supabase real
Cuando tengas el proyecto real, solo cambia:
```bash
export SUPABASE_URL="https://xxxx.supabase.co"
export SUPABASE_KEY="<service_role key del dashboard>"
```
El código del agente **no cambia ni una línea**.

## Resetear los datos entre ensayos
```bash
sudo -u postgres psql -d hackathon_s4 -c "delete from cuentas; delete from corridas;"
cat ../reference_solution/supabase/seed.sql | sudo -u postgres psql -d hackathon_s4
```
