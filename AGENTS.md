# AGENTS.md — Zasady nadrzędne
- Komunikacja wyłącznie po polsku.  
- Ten plik definiuje nadrzędne zasady projektu.  
- Hierarchia ważności: `AGENTS.md` → `spec.md` → `ROADMAP.md` → `STATUS.md`.  
- W przypadku niejasności doprecyzuj w dokumentacji, nie zgaduj w kodzie.

## Środowisko i Uruchamianie
- Środowisko: **UV** zarządza `.venv`; nie twórz innych wirtualnych środowisk.  
- Aktywacja: `source .venv/bin/activate`.  
- Uruchamianie: jeden entrypoint (`uv run <plik.py>` lub `python -m <pakiet>`).  
- Komenda uruchomienia musi być w `README.md`.  
- Zależności: `uv add <pakiet>`; każda nowa musi być uzasadniona w `spec.md` (sekcja *Decyzje techniczne*).  
- Testy: `uv run python -m unittest discover -s tests`.

## Styl i Konwencje
- Indentacja: 4 spacje.  
- Nazwy: moduły/funkcje `snake_case`, klasy `PascalCase`.  
- Kod prosty, bez „magii”; komentarze tylko przy nieoczywistej logice.  
- Refaktory tylko w ramach aktualnego milestone’u.

## Testowanie
- Framework: `unittest`; testy w katalogu `tests/`, pliki `test_*.py`.  
- Każdy milestone musi przechodzić testy.  
- **Smoke testy:** bez IO (sieć, API, dysk), używaj stubów/fake’ów; sprawdzają start i przepływ end-to-end.

## Struktura Repozytorium
- Kod: w `src/` lub (dla małych projektów) w katalogu głównym.  
- Testy tylko w `tests/`.  
- Entrypoint: jeden, opisany w `README.md`.  
- Dozwolone pliki główne: `README.md`, `AGENTS.md`, `spec.md`, `ROADMAP.md`, `STATUS.md`, pliki konfiguracyjne.  
- Nie dodawaj innych `.py` do root’a przy strukturze `src/`.  
- Zmiany struktury uzasadnij i opisz w `spec.md`.

## Konfiguracja i Sekrety
- Nie przechowuj sekretów w repo.  
- Używaj zmiennych środowiskowych i dokumentuj je w `README.md`.  
- Brak kluczy domyślnych i fallbacków.

## Commity i Pull Requesty
- Styl: *Conventional Commits* (`feat:`, `fix:`, `test:` itd.).  
- Każdy commit = jeden logiczny krok, wszystkie testy muszą przejść.  
- PR: porównaj z `main`, opisz zmiany, powód i testy.  
- Jeśli dostępne narzędzie `git-diff-narrator`, użyj go.

## Architektura
- Obejmuje strukturę katalogów, uruchamianie, logikę domenową, dane i API.  
- Nie zmieniaj architektury bez wyraźnej potrzeby.  
- Zmiany opisuj i uzasadniaj w `spec.md` przed wdrożeniem.

## Źródła prawdy
- Główne źródło: `spec.md` (decyzje, zakres, architektura).  
- Roadmapa: `ROADMAP.md`; stan projektu: `STATUS.md`.  
- W konflikcie kod ↔ dokumentacja — wygrywa dokumentacja.

## PRD
- Pliki PRD w katalogu `prd/`; są niemutowalne i służą jako kontekst historyczny.  
- Po aktualizacji `spec.md` lub `ROADMAP.md` → PRD traci pierwszeństwo.  
- W konflikcie zawsze wygrywa `spec.md`.
