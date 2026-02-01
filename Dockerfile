# syntax=docker/dockerfile:1

FROM python:3.13-slim AS runtime

# Dobre praktyki dla kontenerów
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# --- uv ---
# curl + certy do pobrania instalatora uv
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

ADD https://astral.sh/uv/install.sh /uv-installer.sh
RUN sh /uv-installer.sh && rm /uv-installer.sh
ENV PATH="/root/.local/bin/:$PATH"

# --- deps ---
# Kopiujemy tylko pliki do rozwiązywania zależności, żeby lepiej działał cache warstw
COPY pyproject.toml ./

# Zainstaluj zależności projektu (bez samego projektu jako paczki)
# --system: instaluje do site-packages systemowego Pythona (bez venv)
# --no-cache: mniej śmieci w obrazie
RUN uv sync

# --- app code ---
COPY src ./src
COPY tests ./tests
COPY README.md ./README.md

# Aplikacja (Flask) powinna nasłuchiwać na 0.0.0.0 w kontenerze
ENV FLASK_BIND_ADDR="http://0.0.0.0:8000"

EXPOSE 8000

# Start aplikacji
CMD ["uv", "run", "src/app.py"]
