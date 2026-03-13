# Statusy UX i polish panelu skrótów — PRD

## 1. Przegląd

**Nazwa funkcji:** Statusy UX i polish panelu skrótów  
**Cel:** Dopracować istniejący premium interfejs przez lepszy system statusów, walidację pustego wejścia, subtelniejsze warstwy wizualne oraz bardziej produktowy panel skrótów klawiaturowych.  
**Zakres:** UI (`HTML/CSS/JS`), bez nowych endpointów i bez zmian backendu.

---

## 2. Uzasadnienie biznesowe

Obecny interfejs po redesignie jest już nowoczesny i spójny, ale wciąż brakuje kilku elementów, które podnoszą odczucie dopracowania produktu:
- status ma jeden wygląd niezależnie od typu komunikatu,
- akcje pomocnicze pozostawiają status zbyt długo w stanie sukcesu,
- kliknięcie tłumaczenia przy pustym polu nie jest zatrzymywane po stronie UI,
- przełącznik motywu jest wizualnie zbyt ciężki względem reszty top bara,
- panel skrótów wygląda bardziej jak blok informacyjny niż część świadomie zaprojektowanego systemu interfejsu.

Ten przyrost ma poprawić mikro-UX i polish bez ryzyka regresji głównego flow tłumaczenia.

---

## 3. Wymagania funkcjonalne

1. Status UI obsługuje jawne typy wizualne:
   - `idle`,
   - `busy`,
   - `success`,
   - `error`.
2. Funkcja ustawiająca status przyjmuje zarówno tekst, jak i typ statusu.
3. Po akcjach pomocniczych `copy` i `export` status wraca automatycznie po krótkim czasie do stanu domyślnego.
4. Kliknięcie `Tłumacz` przy pustym polu wejściowym:
   - nie wykonuje żądania `fetch`,
   - ustawia komunikat błędu,
   - ustawia fokus na polu wejściowym.
5. Statusy tłumaczenia są spójne z etapem działania:
   - wykrywanie języka,
   - tłumaczenie,
   - sukces,
   - błąd,
   - przerwanie.
6. Status domyślny po załadowaniu strony jest ustawiany jawnie także w JS, a nie tylko w HTML.
7. Element statusu ma `aria-live="polite"`.
8. Panel skrótów klawiaturowych używa bardziej dopracowanego markupu z keycaps (`kbd`-like chips), zamiast pojedynczych tekstowych ciągów znaków.
9. Opisy skrótów pozostają po polsku i zachowują dotychczasowe funkcje:
   - rozpoczęcie tłumaczenia,
   - zamiana języków,
   - kopiowanie tłumaczenia.
10. Przełącznik motywu pozostaje funkcjonalnie bez zmian, ale jest wizualnie lżejszy.
11. Należy zachować wszystkie istniejące funkcje:
   - streaming,
   - cancel,
   - copy,
   - export,
   - theme toggle,
   - skróty klawiaturowe,
   - tryb `Auto`.

---

## 4. Wymagania niefunkcjonalne

- Brak zmian architektury.
- Brak nowych zależności frontendowych.
- Brak zmian backendu i kontraktu `/translate`.
- Zachowanie light mode i dark mode.
- Zachowanie responsywności desktop/mobile.
- Zachowanie istniejącego układu premium wprowadzonego w PRD 009.

---

## 5. Zakres implementacyjny

### 5.1. JavaScript (`src/static/js/app.js`)
- Rozszerzyć `setStatus()` o drugi parametr określający typ statusu.
- Wprowadzić listę klas statusu i przełączanie wariantów na elemencie `.status`.
- Dodać helper resetujący status po akcjach pomocniczych (`copy`, `export`).
- Dodać walidację pustego inputu przed wysłaniem `fetch`.
- Ustawić poprawne typy statusów dla:
  - `Auto: wykrywanie języka...`,
  - `Tłumaczenie...`,
  - `Wykryto: ... • Tłumaczenie...`,
  - `Gotowe`,
  - `Przerwano`,
  - stanów błędów,
  - sukcesu po kopiowaniu i zapisie.
- Ustawić domyślny status po `DOMContentLoaded`.

### 5.2. CSS (`src/static/css/styles.css`)
- Dodać warianty:
  - `.status--idle`,
  - `.status--busy`,
  - `.status--success`,
  - `.status--error`.
- Osłabić wizualnie `theme-toggle`, aby był lżejszy niż główne utility actions.
- Mocniej odróżnić `.panel` od otoczenia przez subtelnie wyraźniejszy surface feel.
- Mocniej odróżnić `.output-text` od pola wejściowego.
- Dodać styl nowego markupu panelu skrótów:
  - `.shortcuts-list`,
  - `.shortcuts-item`,
  - `.shortcuts-keys`,
  - `.kbd`,
  - `.shortcuts-desc`.
- Dopracować `.status-wrap`, szczególnie na mobile.

### 5.3. HTML (`src/templates/index.html`)
- Dodać `aria-live="polite"` do elementu statusu.
- Dodać domyślną klasę statusu `status--idle`.
- Przebudować markup `shortcuts-panel` na listę z keycaps.
- Opcjonalnie oznaczyć prawą grupę headera jako akcje aplikacji przez `aria-label`.

---

## 6. Kryteria akceptacji

1. Status wizualnie odróżnia stany `idle`, `busy`, `success` i `error`.
2. Po `copy` i `export` status po krótkim czasie wraca do stanu domyślnego.
3. Kliknięcie `Tłumacz` przy pustym wejściu nie wysyła żądania i pokazuje komunikat błędu.
4. Status po starcie aplikacji jest spójny między HTML i JS.
5. `aria-live="polite"` jest obecne na elemencie statusu.
6. `theme-toggle` jest wizualnie lżejszy, ale nadal spójny z systemem UI.
7. Panel wyjściowy jest mocniej odróżniony od wejściowego.
8. Panel skrótów używa keycaps zamiast surowej listy tekstowej.
9. Skróty nadal opisują te same trzy akcje i nie zmieniają mapowania klawiszy.
10. Streaming, Cancel, Copy, Export i tryb `Auto` działają bez regresji.
11. UI pozostaje czytelne na desktop i mobile.

---

## 7. Zakres poza PRD

- Brak zmian backendu.
- Brak nowych endpointów.
- Brak zmian modelu tłumaczenia i integracji z Ollama.
- Brak zmian w logice autodetekcji języka poza prezentacją statusu.
- Brak nowych skrótów klawiaturowych.
- Brak dalszej przebudowy layoutu aplikacji poza panelem skrótów i statusem.

---

## 8. Notatki i ryzyka

- To jest przyrost polishowy po PRD 009, więc zakres powinien pozostać mały i niski ryzykownie.
- Największy efekt UX dają statusy typowane oraz walidacja pustego inputu.
- Największy efekt wizualny dają warianty statusu, lżejszy `theme-toggle` i keycaps w panelu skrótów.
- Należy pilnować, aby reset statusu po akcjach pomocniczych nie nadpisywał aktywnego statusu tłumaczenia.
