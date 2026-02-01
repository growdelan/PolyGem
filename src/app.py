from flask import Flask, jsonify, request

app = Flask(__name__)


def translate_text(text: str) -> str:
    return text


@app.get("/")
def index():
    return jsonify({"status": "ok"})


@app.post("/translate")
def translate():
    payload = request.get_json(silent=True) or {}
    text = payload.get("text", "")
    return jsonify({"translation": translate_text(text)})


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000)
