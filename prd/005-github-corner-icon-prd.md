# Ikona GitHub nad kartą tłumaczeń (prawy górny róg) — PRD

## 1. Przegląd

**Nazwa funkcji:** Przycisk GitHub nad kartą tłumaczeń (prawy górny róg)  
**Cel:** Dodać szybki, estetyczny link do repozytorium projektu bez ingerencji w panel tłumaczeń.  
**Zakres:** UI (HTML/CSS) + akcja otwarcia linku do GitHub w nowej karcie.  

---

## 2. Uzasadnienie biznesowe

W obecnym układzie brakuje widocznego i spójnego wizualnie odnośnika do repozytorium. Umieszczenie ikony GitHub nad kartą tłumaczeń, po prawej stronie u góry kontenera aplikacji, zwiększa dostępność projektu dla użytkownika bez obciążania głównego obszaru pracy.

---

## 3. Wymagania funkcjonalne

1. Nad kartą tłumaczeń, w prawym górnym rogu kontenera aplikacji, pojawia się przycisk z ikoną GitHub.
2. Kliknięcie przycisku otwiera adres: `https://github.com/growdelan/PolyGem`.
3. Link otwierany jest w nowej karcie.
4. Ikona ma styl outline SVG i korzysta z klasy `icon-svg`.
5. Przycisk używa klasy `icon`, aby dziedziczyć istniejące stany i kolorystykę.
6. Przycisk ma poprawny opis dostępności (`aria-label`).

---

## 4. Wymagania niefunkcjonalne

- Brak zmian architektury.
- Brak nowych zależności.
- Spójność z light/dark mode przez istniejące zmienne CSS i `currentColor`.
- UI pozostaje czytelne na desktop i mobile.

---

## 5. Zakres implementacyjny

- HTML:
  - dodanie przycisku `#github` nad kartą tłumaczeń, w prawym górnym rogu kontenera aplikacji,
  - osadzenie inline SVG (ikona GitHub w stylu outline),
  - dodanie atrybutów dostępności i tytułu.
- CSS:
  - pozycjonowanie przycisku absolutnie względem kontenera `.app` (prawy górny róg nad kartą),
  - użycie istniejących klas `.icon` i `.icon-svg` bez duplikacji stylu.
- JS:
  - obsługa otwarcia linku do repozytorium w nowej karcie.

---

## 6. Zakres poza PRD

- Brak zmian w logice tłumaczenia i streamingu.
- Brak nowych ikon poza przyciskiem GitHub.
- Brak zmian backendu i endpointów.
