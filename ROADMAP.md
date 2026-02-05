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

## Milestone 1.5: Streaming i kontrola procesu (done)

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

## Milestone 2.0: Udogodnienia użytkownika (done)

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

## Milestone 2.5: Ustawienia i export (done)

Cel:
- zachowanie preferencji i zapis tłumaczenia do pliku

Definition of Done:
- tryb jasny/ciemny zapamiętywany w LocalStorage
- zapamiętywanie wybranych języków w LocalStorage
- zapis tłumaczenia do pliku .txt z użyciem okna „Zapisz jako”
- zaktualizowane instrukcje w README

Zakres:
- przełącznik light/dark z persistencją
- zapis/odczyt wybranych języków w LocalStorage
- akcja eksportu do .txt
- aktualizacja README o funkcjonalności i skróty

---

## Milestone 2.6: Hotfix skrótu zamiany języków (done)

Cel:
- uniknięcie konfliktu skrótu z przeglądarką

Definition of Done:
- zamiana języków działa pod skrótem ⌘K / Ctrl+K
- README zawiera zaktualizowane skróty

Zakres:
- zmiana skrótu dla akcji Swap z ⌘L / Ctrl+L na ⌘K / Ctrl+K
- aktualizacja dokumentacji skrótów

---

## Milestone 3.0: Konfigurowalny adres Ollama (done)

Cel:
- umożliwienie pracy z niestandardowym adresem Ollama i opcjonalnym wyłączeniem weryfikacji TLS

Definition of Done:
- aplikacja obsługuje adres Ollama z `OLLAMA_CUSTOM_ADDR`
- aplikacja obsługuje wyłączenie weryfikacji TLS przez `OLLAMA_VERYFI_SSL`
- aplikacja obsługuje ustawienie adresu startu Flask przez `FLASK_BIND_ADDR`
- README opisuje nowe zmienne środowiskowe

Zakres:
- odczyt zmiennych środowiskowych dla hosta i weryfikacji TLS
- przekazanie konfiguracji do klienta Ollama
- odczyt zmiennej środowiskowej dla adresu startu Flask
- aktualizacja dokumentacji uruchomienia

---

## Milestone 3.1: Konfiguracja przez `.env` (done)

Cel:
- wczytywanie konfiguracji z pliku `.env` bez zmian w UI

Definition of Done:
- aplikacja ładuje `.env` przez `python-dotenv`
- zmienne systemowe mają priorytet nad `.env`
- README zawiera przykład `.env` i listę obsługiwanych zmiennych

Zakres:
- dodanie obsługi `python-dotenv` przy starcie aplikacji
- uporządkowanie priorytetu konfiguracji `.env` vs env systemowy
- aktualizacja dokumentacji uruchomienia

---

## Milestone 3.2: Panel skrótów w UI (done)

Cel:
- poprawa odkrywalności skrótów klawiaturowych w aplikacji

Definition of Done:
- w UI pojawia się panel ze skrótami w wyznaczonym miejscu
- wygląd panelu jest spójny z resztą aplikacji
- tekst panelu jest lekko wyszarzony
- lista skrótów zawiera: ⌘⏎/Ctrl+Enter, ⌘K/Ctrl+K, ⌘⇧C/Ctrl+Shift+C

Zakres:
- dodanie sekcji informacyjnej w layoutcie strony
- stylowanie panelu i typografii
