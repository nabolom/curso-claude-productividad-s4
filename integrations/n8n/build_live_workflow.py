import json, os

SB_URL = os.environ["SUPABASE_URL"]
SB_KEY = os.environ["SUPABASE_KEY"]
OR_KEY = os.environ["OPENROUTER_API_KEY"]

wf = {
    "name": "Hackathon S4 - Agente Reactivacion (Loop 4 Trigger)",
    "nodes": [
        {"parameters": {"httpMethod": "POST", "path": "reactivacion", "responseMode": "lastNode", "options": {}},
         "id": "n1", "name": "Webhook (Trigger)", "type": "n8n-nodes-base.webhook", "typeVersion": 2,
         "position": [200, 300], "webhookId": "hackathon-s4-reactivacion"},
        {"parameters": {"method": "GET",
                        "url": f"{SB_URL}/rest/v1/cuentas?estatus_agente=eq.pendiente&select=*&order=ultimo_contacto.asc",
                        "sendHeaders": True,
                        "headerParameters": {"parameters": [
                            {"name": "apikey", "value": SB_KEY},
                            {"name": "Authorization", "value": f"Bearer {SB_KEY}"}]},
                        "options": {}},
         "id": "n2", "name": "Supabase: leer cartera (Loop 3)", "type": "n8n-nodes-base.httpRequest",
         "typeVersion": 4.2, "position": [420, 300]},
        {"parameters": {"jsCode": "const hoy=new Date();const UM=30;const out=[];\nfor(const it of $input.all()){const c=it.json;const f=c.ultimo_contacto?new Date(c.ultimo_contacto):null;const dias=f?Math.floor((hoy-f)/86400000):9999;if(dias>=UM){out.push({json:{...c,_dias:dias}});}}\nreturn out;"},
         "id": "n3", "name": "Filtra +30 dias (Loop 3)", "type": "n8n-nodes-base.code", "typeVersion": 2,
         "position": [640, 300]},
        {"parameters": {"method": "POST", "url": "https://openrouter.ai/api/v1/chat/completions",
                        "sendHeaders": True,
                        "headerParameters": {"parameters": [
                            {"name": "Authorization", "value": f"Bearer {OR_KEY}"},
                            {"name": "Content-Type", "value": "application/json"}]},
                        "sendBody": True, "specifyBody": "json",
                        "jsonBody": "={\n  \"model\": \"anthropic/claude-sonnet-4.5\",\n  \"max_tokens\": 300,\n  \"messages\": [\n    {\"role\": \"system\", \"content\": \"Ejecutivo de cuenta. Mensaje de reactivacion breve (max 90 palabras), calido, personalizado, con siguiente paso. Solo el cuerpo.\"},\n    {\"role\": \"user\", \"content\": \"Empresa: {{ $json.empresa }}, Contacto: {{ $json.contacto }}, Etapa: {{ $json.etapa }}. Redacta el mensaje.\"}\n  ]\n}",
                        "options": {}},
         "id": "n4", "name": "Claude redacta (Loop 1)", "type": "n8n-nodes-base.httpRequest",
         "typeVersion": 4.2, "position": [860, 300]},
        {"parameters": {"method": "PATCH",
                        "url": "=" + SB_URL + "/rest/v1/cuentas?id=eq.{{ $('Filtra +30 dias (Loop 3)').item.json.id }}",
                        "sendHeaders": True,
                        "headerParameters": {"parameters": [
                            {"name": "apikey", "value": SB_KEY},
                            {"name": "Authorization", "value": f"Bearer {SB_KEY}"},
                            {"name": "Content-Type", "value": "application/json"},
                            {"name": "Prefer", "value": "return=representation"}]},
                        "sendBody": True, "specifyBody": "json",
                        "jsonBody": "={\n  \"mensaje_generado\": {{ JSON.stringify($json.choices[0].message.content) }},\n  \"estatus_agente\": \"contactado\",\n  \"verificado\": true,\n  \"intentos\": 1\n}",
                        "options": {}},
         "id": "n5", "name": "Supabase: guardar (Loop 3)", "type": "n8n-nodes-base.httpRequest",
         "typeVersion": 4.2, "position": [1080, 300]},
        {"parameters": {"method": "POST", "url": f"{SB_URL}/rest/v1/corridas",
                        "sendHeaders": True,
                        "headerParameters": {"parameters": [
                            {"name": "apikey", "value": SB_KEY},
                            {"name": "Authorization", "value": f"Bearer {SB_KEY}"},
                            {"name": "Content-Type", "value": "application/json"}]},
                        "sendBody": True, "specifyBody": "json",
                        "jsonBody": "={\n  \"carril\": \"autonomo\",\n  \"cuentas_contactadas\": 1,\n  \"disparador\": \"webhook\"\n}",
                        "options": {}},
         "id": "n6", "name": "Bitacora corrida (Loop 4)", "type": "n8n-nodes-base.httpRequest",
         "typeVersion": 4.2, "position": [1300, 300]}
    ],
    "connections": {
        "Webhook (Trigger)": {"main": [[{"node": "Supabase: leer cartera (Loop 3)", "type": "main", "index": 0}]]},
        "Supabase: leer cartera (Loop 3)": {"main": [[{"node": "Filtra +30 dias (Loop 3)", "type": "main", "index": 0}]]},
        "Filtra +30 dias (Loop 3)": {"main": [[{"node": "Claude redacta (Loop 1)", "type": "main", "index": 0}]]},
        "Claude redacta (Loop 1)": {"main": [[{"node": "Supabase: guardar (Loop 3)", "type": "main", "index": 0}]]},
        "Supabase: guardar (Loop 3)": {"main": [[{"node": "Bitacora corrida (Loop 4)", "type": "main", "index": 0}]]}
    },
    "settings": {"executionOrder": "v1"}
}

with open("/tmp/wf_live.json", "w") as f:
    json.dump(wf, f)
print("workflow built, nodes:", len(wf["nodes"]))
