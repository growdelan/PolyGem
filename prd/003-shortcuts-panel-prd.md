# Panel skrótów klawiaturowych — PRD

## 1. Przegląd

**Nazwa funkcji:** Panel skrótów klawiaturowych  
**Cel:** Wyświetlenie w UI schludnego panelu z listą skrótów i opisami.  
**Zakres:** Tylko UI (bez zmian logiki skrótów).  

---

## 2. Uzasadnienie biznesowe

Skróty są już dostępne, ale mało widoczne. Lekki panel informacyjny poprawi odkrywalność funkcji i ergonomię użytkownika.

---

## 3. Wymagania funkcjonalne

1. W wyznaczonym miejscu pod kartą aplikacji pojawia się panel z listą skrótów.
2. Panel zawiera skróty i krótkie opisy działania.
3. Wygląd panelu jest spójny z resztą aplikacji (minimalistyczny, schludny).
4. Tekst w panelu jest lekko wyszarzały, aby wpisywał się w „szarą” część tła.

---

## 4. Wymagania niefunkcjonalne

- Brak zmian w logice aplikacji.
- Brak nowych zależności.
- UI musi być czytelne na desktop i mobile.

---

## 5. Zakres i treść panelu

Panel zawiera co najmniej:
- ⌘⏎ / Ctrl+Enter — rozpocznij tłumaczenie
- ⌘K / Ctrl+K — zamień języki
- ⌘⇧C / Ctrl+Shift+C — kopiuj tłumaczenie

---

## 6. Zakres poza PRD

- Brak personalizacji skrótów.
- Brak skrótów konfigurowanych przez użytkownika.

