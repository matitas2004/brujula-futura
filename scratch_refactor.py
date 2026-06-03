import os
import re

CHAT_PY_PATH = r"backend/app/api/chat.py"

with open(CHAT_PY_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add process_and_save_json to the top
helper_func = """
def process_and_save_json(text_reply, query_name, context_text):
    import re
    import json
    import hashlib
    from app.db.session import SessionLocal
    from app.db.models import Carrera
    import logging
    logger = logging.getLogger(__name__)

    json_str = None
    json_match = re.search(r"```(?:json)?\s*(\\{.*?\\})\s*```", text_reply, re.DOTALL)
    if json_match:
        json_str = json_match.group(1)
        text_reply = re.sub(r"```(?:json)?\s*\\{.*?\\}\\s*```", "", text_reply, flags=re.DOTALL).strip()
    else:
        json_match = re.search(r"(\\{\\s*\\\"id_area\\\".*?\\})", text_reply, re.DOTALL)
        if json_match:
            json_str = json_match.group(1)
            text_reply = text_reply.replace(json_match.group(1), "").strip()

    if json_str:
        try:
            db_data = json.loads(json_str)
            try:
                db = SessionLocal()
                existe = db.query(Carrera).filter(Carrera.nombre_carrera.ilike(f"%{query_name}%")).first()
                if not existe:
                    tipo_raw = str(db_data.get("tipo_opcion", "UNI")).upper()
                    tipo_final = "TEC" if "TEC" in tipo_raw else ("OFI" if "OFI" in tipo_raw else ("CUR" if "CUR" in tipo_raw else "UNI"))
                    mod_raw = str(db_data.get("modalidad", "PRE")).upper()
                    mod_final = "VIR" if "VIR" in mod_raw else ("HIB" if "HIB" in mod_raw else "PRE")
                    
                    nueva_carrera = Carrera(
                        id_area=int(db_data.get("id_area", 1)),
                        codigo_carrera=f"IA-{hashlib.md5(query_name.encode()).hexdigest()[:4].upper()}",
                        nombre_carrera=query_name.capitalize()[:120],
                        tipo_opcion=tipo_final,
                        descripcion=str(db_data.get("descripcion", context_text[:300]))[:350],
                        duracion_meses=int(db_data.get("duracion_meses", 48)),
                        modalidad=mod_final,
                        salida_laboral=str(db_data.get("salida_laboral", "Datos en proceso."))[:200],
                        perfil_recomendado=str(db_data.get("perfil_recomendado", "Estudiantes analíticos."))[:200],
                        costo_referencial=float(db_data.get("costo_referencial", 0.00)),
                        estado="ACT"
                    )
                    db.add(nueva_carrera)
                    db.commit()
                    logger.info(f"✅ Carrera '{query_name}' guardada inteligente en BD.")
            except Exception as db_err:
                logger.error(f"Error BD al guardar JSON preventivo: {db_err}")
            finally:
                if 'db' in locals(): db.close()
        except Exception as parse_e:
            logger.error(f"Error parseando json_str preventivo: {parse_e}")
            
    return text_reply

@router.post("/", response_model=ChatResponse)
"""
content = content.replace("@router.post(\"/\", response_model=ChatResponse)", helper_func.strip())

# 2. Modify system prompt
old_prompt = """        "3. Estructura: Usa listas o viñetas (Markdown) para facilitar la lectura. Mantén las respuestas rápidas, directas y concisas (máximo 2 párrafos cortos a menos que te pidan detalles profundos).\\n"
        "4. AUTO-ALIMENTACIÓN (MUY IMPORTANTE): Si el estudiante te pregunta por información específica de una CARRERA (ej. costos, dónde estudiarla, de qué trata) y NO estás 100% seguro de los datos exactos y actuales para ECUADOR, DEBES responder ÚNICAMENTE con esta frase exacta: [[REQUIRE_SEARCH: Nombre de la Carrera en Ecuador]]. No agregues ningún otro texto. Yo buscaré la info en la BD y te la enviaré.\\n"
    )"""

new_prompt = """        "3. Estructura: Usa listas o viñetas (Markdown) para facilitar la lectura. Mantén las respuestas rápidas, directas y concisas (máximo 2 párrafos cortos a menos que te pidan detalles profundos).\\n"
    )"""
content = content.replace(old_prompt, new_prompt)

# 3. Add Preemptive Search logic
preemptive_search = """
    # BÚSQUEDA PREVENTIVA HEURÍSTICA (SINGLE LLM CALL ARCHITECTURE)
    search_context = ""
    query_for_db = None
    keywords = ["carrera", "estudiar", "universidad", "costo", "información", "informacion", "qué trata", "que trata", "opciones", "salida"]
    
    if any(kw in data.message.lower() for kw in keywords) and data.message.strip() != "/debug":
        import re
        import urllib.parse
        import urllib.request
        match = re.search(r'(?:carrera de|estudiar|sobre la|sobre|en)\\s+([a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]{5,35})', data.message.lower())
        if match:
            query_for_db = match.group(1).strip()
            for stop in [" en ", " ecuador", " y ", " me ", " la ", " las ", " los ", " el ", " quiero ", " saber "]:
                if query_for_db.endswith(stop.strip()): 
                    query_for_db = query_for_db.replace(stop, "").strip()
        
        try:
            search_url = "https://html.duckduckgo.com/html/?q=" + urllib.parse.quote(f"{data.message} universidades costos Ecuador")
            search_req = urllib.request.Request(search_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
            with urllib.request.urlopen(search_req, timeout=8) as response:
                html = response.read().decode('utf-8')
                snippets = re.findall(r'<a class="result__snippet[^>]*>(.*?)</a>', html, re.IGNORECASE | re.DOTALL)
                clean_snippets = [re.sub(r'<[^>]+>', '', s).strip() for s in snippets]
                search_context = "\\n".join(clean_snippets[:3])
        except Exception as search_e:
            logger.error(f"Error Búsqueda Preventiva: {search_e}")
            
    if search_context and query_for_db:
        system_prompt += f\"\"\"

=== SISTEMA AUTO-ALIMENTADOR INVISIBLE (BÚSQUEDA PREVENTIVA) ===
Se extrajo automáticamente la siguiente información web actualizada para la consulta del usuario ({query_for_db}):
{search_context}

Tu tarea es DOBLE para este mensaje:
1. Analiza los datos web y crea un bloque JSON estructurado en formato Markdown (```json ... ```) para alimentar la BD. Claves obligatorias:
{{
  "id_area": 1, // (1:Realista, 2:Investigador, 3:Artístico, 4:Social, 5:Emprendedor, 6:Convencional)
  "tipo_opcion": "UNI", // (UNI, TEC, OFI, o CUR)
  "descripcion": "Resumen conciso max 300 chars",
  "duracion_meses": 48,
  "modalidad": "PRE", // (PRE, VIR o HIB)
  "salida_laboral": "Opciones de trabajo, max 200 chars",
  "perfil_recomendado": "Aptitudes, max 200 chars",
  "costo_referencial": 1500.00
}}
2. FUERA del bloque JSON, responde muy amigablemente al estudiante con la información solicitada. NO menciones que hiciste una búsqueda web ni que generaste un JSON. Actúa como si ya lo supieras todo.
============================================================
\"\"\"

    # 1. MODO DE PURA COMPATIBILIDAD CON OPENAI / OPENROUTER (RECOMENDADO)
"""
content = content.replace("    # 1. MODO DE PURA COMPATIBILIDAD CON OPENAI / OPENROUTER (RECOMENDADO)", preemptive_search.strip())

# 4. Replace OpenRouter AGENTIC LOOP with process_and_save_json
openrouter_loop_regex = re.compile(r"# AGENTIC LOOP: Revisar si la IA solicitó buscar.*?(?=return \{\"reply\": reply\})", re.DOTALL)
new_openrouter_logic = """
        if search_context and query_for_db:
            reply = process_and_save_json(reply, query_for_db, search_context)

        """
content = openrouter_loop_regex.sub(new_openrouter_logic, content)

# 5. Replace Gemini AGENTIC LOOP with process_and_save_json
gemini_loop_regex = re.compile(r"# AGENTIC LOOP PARA GEMINI NATIVO.*?(?=return \{\"reply\": reply\})", re.DOTALL)
new_gemini_logic = """
            if search_context and query_for_db:
                reply = process_and_save_json(reply, query_for_db, search_context)
            
            """
content = gemini_loop_regex.sub(new_gemini_logic, content)

with open(CHAT_PY_PATH, "w", encoding="utf-8") as f:
    f.write(content)

print("Refactor complete.")
