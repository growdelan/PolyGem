# Local AI Translator --- Dokument Wymagań Produktowych (PRD)

## 1. Przegląd

**Nazwa produktu:** Local AI Translator\
**Typ:** Lokalna aplikacja webowa (tylko localhost)\
**Stack technologiczny:** Python + Flask\
**Silnik LLM:** Ollama\
**Model:** translategemma (na sztywno w kodzie)\
**Środowisko:** macOS\
**Uruchamianie:** `uv run <app>`\
**Dostęp sieciowy:** wyłącznie localhost

------------------------------------------------------------------------

## 2. Cel Produktu

Celem aplikacji jest zapewnienie w pełni lokalnego, prywatnego
tłumaczenia tekstu bez wysyłania danych do zewnętrznych usług.

Aplikacja:

-   Działa w 100% offline\
-   Jest przeznaczona dla jednego użytkownika\
-   Wykorzystuje lokalnie zainstalowany model Ollama\
-   Zapewnia nowoczesny, estetyczny interfejs\
-   Obsługuje streaming odpowiedzi w czasie rzeczywistym

------------------------------------------------------------------------

## 3. Zakres MVP (v1)

### Funkcje wchodzące do MVP

1.  Streaming tłumaczenia (token po tokenie)
2.  Kopiowanie tłumaczenia do schowka
3.  Skróty klawiaturowe
4.  Tryb jasny / ciemny (zapamiętywany w LocalStorage)
5.  Export tłumaczenia do pliku `.txt` (okno „Zapisz jako")
6.  Zamiana języków (wraz z zamianą treści pól)

### Poza zakresem MVP

-   Historia tłumaczeń
-   Autodetekcja języka
-   Wybór modelu
-   Regulacja parametrów modelu
-   Chunkowanie długich dokumentów
-   Tryb wieloużytkownikowy
-   Autoryzacja
-   Synchronizacja w chmurze

------------------------------------------------------------------------

## 4. Interfejs Użytkownika

### Układ

    -------------------------------------------------
    |  [Źródłowy ▼]   [⇄]   [Docelowy ▼]          |
    -------------------------------------------------
    |                                               |
    |   [ TEKST WEJŚCIOWY ]   [ TŁUMACZENIE ]     |
    |                                               |
    -------------------------------------------------
    |              [ Translate ]                   |
    -------------------------------------------------

### Elementy UI

#### Dropdown --- język źródłowy

-   Domyślnie: PL\
-   Krótka lista języków\
-   Możliwość łatwego rozszerzenia w konfiguracji

#### Dropdown --- język docelowy

-   Domyślnie: EN

#### Przycisk „Swap"

-   Zamienia języki\
-   Zamienia zawartość pól input/output

#### Lewy panel (input)

-   Edytowalne pole tekstowe\
-   Blokowane podczas tłumaczenia

#### Prawy panel (output)

-   Wyświetla tłumaczenie\
-   Obsługuje streaming\
-   Nadpisuje poprzedni wynik

#### Ikony przy wyniku

-   📋 Kopiuj do schowka\
-   💾 Zapisz do pliku (.txt)

#### Status

-   Spinner\
-   Tekst „Translating..."\
-   Przycisk „Cancel"

------------------------------------------------------------------------

## 5. Skróty Klawiaturowe

  Skrót   Działanie
  ------- ------------------------
  ⌘⏎      Rozpocznij tłumaczenie
  ⌘L      Zamień języki
  ⌘⇧C     Kopiuj tłumaczenie

------------------------------------------------------------------------

## 6. Przebieg Tłumaczenia i Streaming

### Warunki uruchomienia

Tłumaczenie rozpoczyna się wyłącznie gdy:

-   Użytkownik kliknie przycisk „Translate"\
-   Użytkownik użyje skrótu ⌘⏎

### Zachowanie streamingu

1.  Użytkownik uruchamia tłumaczenie\
2.  Prawe pole zostaje natychmiast wyczyszczone\
3.  Pojawia się spinner + „Translating..."\
4.  Lewe pole zostaje zablokowane\
5.  Tekst pojawia się w prawym polu w trybie streamingu\
6.  Po zakończeniu:
    -   Spinner znika\
    -   Input zostaje odblokowany

### Przycisk Cancel

-   Natychmiast przerywa generowanie\
-   Input zostaje odblokowany\
-   Częściowy wynik pozostaje widoczny

### Obsługa błędów

Jeśli tekst przekracza możliwości modelu:

Wyświetlany komunikat:\
\> „Text too long. Please shorten the input."

Brak automatycznego chunkowania.

------------------------------------------------------------------------

## 7. Limity

-   Obsługiwany rozmiar tekstu: do około 10--20 tys. znaków\
-   Brak historii tłumaczeń\
-   Brak cache

------------------------------------------------------------------------

## 8. Persistencja (LocalStorage)

Zapisywane:

-   Wybrany język źródłowy\
-   Wybrany język docelowy\
-   Tryb jasny/ciemny

Nie zapisywane:

-   Tekst wejściowy\
-   Tłumaczenie

------------------------------------------------------------------------

## 9. Export

### Funkcja Zapisz

-   Zapisuje wyłącznie przetłumaczony tekst\
-   Format: `.txt`\
-   Używa systemowego okna „Zapisz jako"\
-   Brak automatycznego zapisu\
-   Brak wersjonowania

------------------------------------------------------------------------

## 10. Architektura

### Backend

-   Aplikacja Flask\
-   Brak rozdzielenia frontend/backend\
-   Endpoint streamingowy do tłumaczenia\
-   Integracja z Ollama przez bibliotekę Python\
-   Model na sztywno: translategemma\
-   Prompt dostarczony osobno podczas implementacji

------------------------------------------------------------------------

## 11. Proponowana Struktura Projektu

    local-translator/
    │
    ├── src/
    │   ├── __init__.py
    │   ├── routes.py
    │   ├── ollama_client.py
    │   ├── templates/
    │   │   └── index.html
    │   └── static/
    │       ├── css/
    │       └── js/
    │
    ├── pyproject.toml
    └── README.md

------------------------------------------------------------------------

## 12. Założenia Projektowe

-   Minimalistyczny design\
-   Nowoczesny wygląd\
-   Zaokrąglone rogi\
-   Subtelne cienie\
-   Czytelna typografia\
-   Płynne mikroanimacje\
-   Pełnoprawny tryb dark mode

------------------------------------------------------------------------

## 13. Wymagania Niefunkcjonalne

-   100% offline\
-   Brak telemetrii\
-   Szybkie uruchamianie\
-   Minimalna liczba zależności\
-   Kompatybilność z macOS\
-   Działanie wyłącznie na localhost



