# Subtelna stopka pod panelem skrótów — PRD

## 1. Przegląd

**Nazwa funkcji:** Osobna sekcja stopki pod panelem skrótów  
**Cel:** Dodać estetyczną, lekką wizualnie stopkę pod panelem skrótów jako osobny element layoutu.  
**Zakres:** UI (HTML/CSS), bez zmian logiki tłumaczenia i backendu.  

---

## 2. Uzasadnienie biznesowe

Stopka porządkuje dół strony i dodaje subtelną informację o autorze oraz link do repozytorium bez przeciążania interfejsu. Rozwiązanie poprawia spójność wizualną i czytelność kompozycji strony.

---

## 3. Wymagania funkcjonalne

1. Struktura strony zawiera osobną sekcję `<footer class="footer">...</footer>` umieszczoną pod `<section class="shortcuts-panel">`.
2. Kolejność sekcji w dokumencie jest następująca:
   - `<main class="app">...</main>`
   - `<section class="shortcuts-panel">...</section>`
   - `<footer class="footer">...</footer>`
3. Stopka zawiera:
   - tekst `© 2026 Daniel Wyrzyński`,
   - separator `•`,
   - link `GitHub` otwierany w nowej karcie.
4. Link w stopce używa `target="_blank"` i `rel="noopener"`.
5. Stopka jest wyśrodkowana i subtelna wizualnie.

---

## 4. Wymagania niefunkcjonalne

- Brak zmian architektury.
- Brak nowych zależności.
- Spójność z light/dark mode przez istniejące zmienne CSS (`--muted`, `--text`).
- Zachowanie czytelności na desktop i mobile.

---

## 5. Zakres implementacyjny

- HTML:
  - dodanie elementu `<footer class="footer">` pod panelem skrótów,
  - struktura wewnętrzna:
    - `<div class="footer-inner">`
    - `<span>© 2026 Daniel Wyrzyński</span>`
    - `<span class="footer-separator">•</span>`
    - `<a ... class="footer-link">GitHub</a>`
- CSS:
  - style klas `.footer`, `.footer-inner`, `.footer-link`, `.footer-link:hover`, `.footer-separator`,
  - zachowanie subtelnego efektu przez niski kontrast i delikatny hover.

---

## 6. Zakres poza PRD

- Brak zmian w logice tłumaczenia, streamingu i skrótów klawiaturowych.
- Brak zmian backendu i endpointów.
- Brak rozbudowanego systemu nawigacji w stopce (tylko pojedynczy link GitHub).
