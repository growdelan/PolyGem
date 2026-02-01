# Roadmapa (milestones)

## Statusy milestone’ów
Dozwolone statusy:
- planned
- in_progress
- done
- blocked

---

## Milestone 0.5: Minimal end-to-end slice (done)

Cel:
- aplikacja uruchamia się
- wykonuje jedno bardzo proste zadanie
- zwraca poprawny wynik

Definition of Done:
- aplikację da się uruchomić jednym poleceniem (opisanym w README.md)
- istnieje co najmniej jeden smoke test
- testy przechodzą lokalnie
- brak placeholderów w kodzie

Zakres:
- minimalny entrypoint aplikacji
- minimalna logika domenowa
- minimalna obsługa IO (jeśli dotyczy)
- smoke test end-to-end

---

## Milestone 1.0: Podstawowe tłumaczenie z UI (done)

Cel:
- użytkownik może wprowadzić tekst i otrzymać tłumaczenie
- interfejs odpowiada układowi z PRD

Definition of Done:
- działający ekran z polami input/output i wyborem języków
- tłumaczenie uruchamiane przyciskiem
- wynik pojawia się w prawym panelu
- obsługa komunikatu błędu „Text too long. Please shorten the input.”

Zakres:
- UI z dwoma panelami i przyciskiem Translate
- dropdowny języka źródłowego i docelowego (domyślne PL/EN)
- backendowy endpoint tłumaczenia
- integracja z lokalnym Ollama

---

## Milestone 1.5: Streaming i kontrola procesu (planned)

Cel:
- tłumaczenie działa w trybie streamingu
- użytkownik widzi status i może przerwać tłumaczenie

Definition of Done:
- streaming token po tokenie w polu wynikowym
- spinner i tekst „Translating...” w trakcie działania
- przycisk Cancel zatrzymuje generowanie i odblokowuje input
- input blokowany podczas tłumaczenia

Zakres:
- obsługa streamingu w backendzie i UI
- mechanizm cancel
- logika blokady/odblokowania input

---

## Milestone 2.0: Udogodnienia użytkownika (planned)

Cel:
- poprawa ergonomii pracy i wygody użycia

Definition of Done:
- działający przycisk Swap (języki + zawartość pól)
- skróty klawiaturowe zgodne z PRD
- kopiowanie tłumaczenia do schowka

Zakres:
- logika zamiany języków i treści pól
- obsługa skrótów ⌘⏎, ⌘L, ⌘⇧C
- ikona kopiowania przy wyniku

---

## Milestone 2.5: Ustawienia i export (planned)

Cel:
- zachowanie preferencji i zapis tłumaczenia do pliku

Definition of Done:
- tryb jasny/ciemny zapamiętywany w LocalStorage
- zapis tłumaczenia do pliku .txt z użyciem okna „Zapisz jako”

Zakres:
- przełącznik light/dark z persistencją
- akcja eksportu do .txt
