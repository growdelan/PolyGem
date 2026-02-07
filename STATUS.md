# Aktualny stan projektu

## Co działa
- Serwer Flask na localhost z UI tłumaczeń
- Endpoint `/translate` z integracją Ollama
- Obsługa błędu dla zbyt długiego tekstu
- Streaming tłumaczenia w UI
- Przycisk Cancel z przerwaniem tłumaczenia
- Spinner i blokada inputu podczas tłumaczenia
- Przycisk Swap (zamiana języków i treści)
- Kopiowanie tłumaczenia do schowka
- Skróty klawiaturowe (⌘⏎, ⌘K, ⌘⇧C oraz odpowiedniki Ctrl)
- Tryb jasny/ciemny z persistencją
- Zapamiętywanie języków w LocalStorage
- Export tłumaczenia do pliku `.txt`
- Konfiguracja adresu Ollama przez zmienną środowiskową
- Opcjonalne wyłączenie weryfikacji TLS dla Ollama
- Konfiguracja przez `.env` (python-dotenv)
- Panel skrótów klawiaturowych w UI
- Ikony akcji Kopiuj/Zapisz jako outline SVG (zamiast emoji)
- Stany interakcji przycisków ikon: hover, focus-visible, active
- Krótki stan sukcesu przycisków po akcjach kopiowania i zapisu
- Testy `unittest` przechodzą

## Co jest skończone
- Milestone 0.5: minimalny end-to-end slice
- Milestone 1.0: podstawowe tłumaczenie z UI
- Milestone 1.5: streaming i kontrola procesu
- Milestone 2.0: udogodnienia użytkownika
- Milestone 2.5: ustawienia i export
- Milestone 2.6: hotfix skrótu zamiany języków
- Milestone 3.0: konfigurowalny adres Ollama
- Milestone 3.1: konfiguracja przez `.env`
- Milestone 3.2: panel skrótów w UI
- Milestone 3.3: outline SVG dla ikon akcji

## Co jest w trakcie

## Co jest następne
- TODO (kolejny milestone do zdefiniowania w ROADMAP.md)

## Blokery i ryzyka
- Brak

## Ostatnie aktualizacje
- 2026-02-01: zakończono Milestone 3.2
- 2026-02-07: zakończono Milestone 3.3
