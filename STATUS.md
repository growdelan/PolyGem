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
- Testy `unittest` przechodzą

## Co jest skończone
- Milestone 0.5: minimalny end-to-end slice
- Milestone 1.0: podstawowe tłumaczenie z UI
- Milestone 1.5: streaming i kontrola procesu
- Milestone 2.0: udogodnienia użytkownika
- Milestone 2.5: ustawienia i export
- Milestone 2.6: hotfix skrótu zamiany języków
- Milestone 3.0: konfigurowalny adres Ollama

## Co jest w trakcie

## Co jest następne
- TODO

## Blokery i ryzyka
- Brak

## Ostatnie aktualizacje
- 2026-02-01: zakończono Milestone 3.0
