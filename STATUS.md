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
- Ikona GitHub nad kartą tłumaczeń (prawy górny róg kontenera aplikacji)
- Ikona X obok GitHub w sekcji social nad kartą tłumaczeń
- Subtelna stopka pod panelem skrótów (autor + linki GitHub oraz X)
- Opcja `Auto` dla języka źródłowego z autodetekcją przez `langid` po stronie backendu
- Dokumentacja premium redesignu UI (PRD 009) jest dodana do repo
- Docelowy layout dla premium redesignu jest doprecyzowany w spec i roadmapie
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
- Milestone 3.4: ikona GitHub nad kartą tłumaczeń
- Milestone 3.5: subtelna stopka pod panelem skrótów
- Milestone 3.6: ikona X w sekcji social i stopce
- Milestone 3.7: autodetekcja języka źródłowego (Auto)
- Milestone 4.0: redukcja ryzyka premium redesignu UI

## Co jest w trakcie

## Co jest następne
- Milestone 4.1: Premium UI Refresh i pełna polonizacja interfejsu

## Blokery i ryzyka
- Brak aktywnych blokerów
- Otwarte ryzyko wdrożeniowe: redesign 4.1 wymaga zachowania zgodności z istniejącym flow tłumaczenia oraz responsywnością mobile

## Ostatnie aktualizacje
- 2026-02-01: zakończono Milestone 3.2
- 2026-02-07: zakończono Milestone 3.3
- 2026-02-07: zakończono Milestone 3.4
- 2026-02-07: zakończono Milestone 3.5
- 2026-02-07: zakończono Milestone 3.6
- 2026-02-08: zakończono Milestone 3.7
- 2026-03-13: dodano PRD 009 premium redesignu UI
- 2026-03-13: zakończono Milestone 4.0
