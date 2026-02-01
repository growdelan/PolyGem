import os

from flask import Flask, Response, jsonify, render_template, request
from ollama import Client

MODEL_NAME = "translategemma"
MAX_TEXT_LENGTH = 20000
LANGUAGES = [
    {"code": "pl", "name": "Polish"},
    {"code": "en", "name": "English"},
    {"code": "de", "name": "German"},
    {"code": "es", "name": "Spanish"},
    {"code": "fr", "name": "French"},
    {"code": "it", "name": "Italian"},
    {"code": "nl", "name": "Dutch"},
    {"code": "cs", "name": "Czech"},
    {"code": "ja", "name": "Japanese"},
    {"code": "ko", "name": "Korean"},
    {"code": "zh", "name": "Chinese"},
]

app = Flask(__name__, template_folder="templates", static_folder="static")
_ollama_client = None


def get_language_name(code: str) -> str | None:
    for language in LANGUAGES:
        if language["code"] == code:
            return language["name"]
    return None


def build_prompt(source_code: str, target_code: str, text: str) -> str:
    source_name = get_language_name(source_code)
    target_name = get_language_name(target_code)
    if not source_name or not target_name:
        raise ValueError("Unsupported language code.")

    return (
        "You are a professional "
        f"{source_name} ({source_code}) to {target_name} ({target_code}) translator. "
        f"Your goal is to accurately convey the meaning and nuances of the original {source_name} text "
        f"while adhering to {target_name} grammar, vocabulary, and cultural sensitivities.\n"
        f"Produce only the {target_name} translation, without any additional explanations or commentary. "
        f"Please translate the following {source_name} text into {target_name}:\n\n\n"
        f"{text}"
    )


def parse_env_bool(value: str | None) -> bool | None:
    if value is None:
        return None
    return value.strip().lower() not in {"0", "false", "no"}


def get_ollama_client() -> Client:
    global _ollama_client
    if _ollama_client is not None:
        return _ollama_client

    host = os.getenv("OLLAMA_CUSTOM_ADDR")
    verify_env = os.getenv("OLLAMA_VERYFI_SSL")
    verify = parse_env_bool(verify_env)
    kwargs = {}
    if verify is not None:
        kwargs["verify"] = verify

    _ollama_client = Client(host=host, **kwargs)
    return _ollama_client


def translate_text(text: str, source_code: str, target_code: str) -> str:
    prompt = build_prompt(source_code, target_code, text)
    client = get_ollama_client()
    response = client.chat(
        model=MODEL_NAME,
        messages=[{"role": "user", "content": prompt}],
    )
    return response.message.content


def translate_stream(text: str, source_code: str, target_code: str):
    prompt = build_prompt(source_code, target_code, text)
    client = get_ollama_client()
    stream = client.chat(
        model=MODEL_NAME,
        messages=[{"role": "user", "content": prompt}],
        stream=True,
    )
    for chunk in stream:
        yield chunk["message"]["content"]


@app.get("/")
def index():
    return render_template(
        "index.html",
        languages=LANGUAGES,
        default_source="pl",
        default_target="en",
    )


@app.post("/translate")
def translate():
    payload = request.get_json(silent=True) or {}
    text = payload.get("text", "") or ""
    source_code = payload.get("source_lang", "pl")
    target_code = payload.get("target_lang", "en")
    stream = bool(payload.get("stream"))

    if len(text) > MAX_TEXT_LENGTH:
        return jsonify({"error": "Text too long. Please shorten the input."}), 400

    if stream:
        try:
            return Response(
                translate_stream(text, source_code, target_code),
                mimetype="text/plain",
            )
        except ValueError as exc:
            return jsonify({"error": str(exc)}), 400
        except Exception:
            return jsonify({"error": "Translation failed."}), 500

    try:
        translation = translate_text(text, source_code, target_code)
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    except Exception:
        return jsonify({"error": "Translation failed."}), 500

    return jsonify({"translation": translation})


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000)
