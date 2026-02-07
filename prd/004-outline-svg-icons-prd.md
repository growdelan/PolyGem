# Outline SVG dla ikon akcji — PRD

## 1. Przegląd

**Nazwa funkcji:** Wymiana ikon emoji na outline SVG dla akcji Kopiuj i Zapisz  
**Cel:** Podnieść jakość wizualną i spójność UI przez zastąpienie emoji ikonami SVG sterowanymi kolorem z CSS (`currentColor`).  
**Zakres:** UI + drobna logika stanu wizualnego przy sukcesie akcji (bez zmiany architektury i przepływu tłumaczenia).  

---

## 2. Uzasadnienie biznesowe

Obecne emoji w przyciskach akcji odstają estetycznie od reszty layoutu. Outline SVG zapewniają nowocześniejszy wygląd, lepszą spójność w light/dark mode oraz pełną kontrolę nad stanami interakcji przez istniejący system zmiennych CSS.

---

## 3. Wymagania funkcjonalne

1. W `index.html` przyciski `#copy` i `#export` używają ikon SVG zamiast emoji.
2. Ikony są renderowane jako outline (`fill: none`, `stroke: currentColor`) i dziedziczą kolor z `.icon`.
3. Przyciski ikon wspierają stany:
   - `hover` (subtelny tint i kontrast zgodny z motywem),
   - `focus-visible` (czytelny ring fokusowy),
   - `active` (lekki efekt wciśnięcia).
4. Po udanym kopiowaniu i zapisie przycisk dostaje chwilowy stan sukcesu (`.success`) bez zmiany układu.
5. Logika statusów tekstowych (`Skopiowano`, `Zapisano`) pozostaje zachowana.

---

## 4. Wymagania niefunkcjonalne

- Brak nowych zależności.
- Brak zmian w architekturze i endpointach backendu.
- Kompatybilność z aktualnym light/dark mode.
- Dostępność: przyciski zachowują `aria-label`, a ikony SVG mają `aria-hidden="true"`.
- UI pozostaje czytelne na desktop i mobile.

---

## 5. Zakres implementacyjny

- HTML:
  - podmiana zawartości przycisków `#copy` i `#export` na inline SVG,
  - dodanie `title` dla podpowiedzi użytkownika.
- CSS:
  - styl `.icon` oparty o `--muted`, `--border`, `--card`, `--primary`,
  - definicja `.icon-svg` (rozmiar, stroke, linecap, linejoin),
  - stany `:hover`, `:focus-visible`, `:active`,
  - stan `.icon.success` dla krótkiego wizualnego potwierdzenia akcji.
- JS:
  - pomocnicza funkcja chwilowo dodająca/usuwająca klasę `.success`,
  - użycie tej funkcji po powodzeniu akcji kopiowania i zapisu.

---

## 6. Zakres poza PRD

- Brak zmian w logice tłumaczenia, streamingu i anulowania.
- Brak przebudowy systemu ikon globalnie (dotyczy tylko `copy` i `export`).
- Brak nowych animacji poza lekkim potwierdzeniem sukcesu.
