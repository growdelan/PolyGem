# Ikona X obok GitHub + link X w stopce — PRD

## 1. Przegląd

**Nazwa funkcji:** Rozszerzenie sekcji social o platformę X  
**Cel:** Dodać ikonę X obok istniejącej ikony GitHub w prawym górnym rogu nad sekcją tłumaczeń oraz dodać link X w stopce.  
**Zakres:** UI (HTML/CSS/JS), bez zmian backendu i logiki tłumaczenia.  

---

## 2. Uzasadnienie biznesowe

Użytkownik chce udostępnić drugi kanał społecznościowy w tym samym miejscu, gdzie obecnie dostępny jest GitHub. Dodanie X obok GitHub utrzymuje spójność layoutu i poprawia dostępność profilu autora.

---

## 3. Wymagania funkcjonalne

1. W prawym górnym rogu nad sekcją tłumaczeń zamiast pojedynczej ikony GitHub występuje wrapper `page-social` z dwiema ikonami:
   - GitHub,
   - X.
2. Ikona X używa inline SVG w stylu zgodnym z istniejącą klasą `.icon-svg` (outline/currentColor).
3. Kliknięcie ikony GitHub otwiera `https://github.com/growdelan/PolyGem` w nowej karcie.
4. Kliknięcie ikony X otwiera `https://x.com/growdelan` w nowej karcie.
5. Stopka zawiera dodatkowy link `X` obok istniejącego linku `GitHub`.
6. Link `X` w stopce używa `target="_blank"` i `rel="noopener"`.

---

## 4. Wymagania niefunkcjonalne

- Brak zmian architektury.
- Brak nowych zależności.
- Spójność wizualna z istniejącymi ikonami i stanami `.icon`.
- Kompatybilność z light/dark mode.
- Zachowanie czytelności na desktop i mobile.

---

## 5. Zakres implementacyjny

- HTML (`src/templates/index.html`):
  - zastąpienie pojedynczego przycisku GitHub wrapperem `<div class="page-social">...</div>`,
  - dodanie przycisku `#x` z ikoną SVG platformy X,
  - rozszerzenie stopki o link `X`.
- CSS (`src/static/css/styles.css`):
  - zastąpienie pozycjonowania `.page-github` klasą `.page-social`,
  - zachowanie aktualnej pozycji nad sekcją tłumaczeń i dodanie odstępu między ikonami (`gap`).
- JS (`src/static/js/app.js`):
  - dodanie referencji `xButton`,
  - dodanie obsługi kliknięcia otwierającej `https://x.com/growdelan`.

---

## 6. Zakres poza PRD

- Brak zmian w logice tłumaczenia, streamingu i skrótów klawiaturowych.
- Brak zmian backendu i endpointów.
- Brak rozbudowy sekcji social o kolejne platformy poza GitHub i X.
