# Autodetekcja języka źródłowego (opcja „Auto”) — PRD

## 1. Przegląd

**Nazwa funkcji:** Autodetekcja języka źródłowego (Auto)  
**Cel:** Zmniejszyć liczbę ręcznych kliknięć i pomyłek przy tłumaczeniu poprzez automatyczne wykrywanie języka tekstu wejściowego.  
**Zakres:** UI (HTML/JS) + backend (Python) z wykorzystaniem biblioteki `langid`, bez połączeń zewnętrznych.

---

## 2. Uzasadnienie biznesowe

Użytkownik często wkleja tekst w obcym języku bez zmiany selektora „Źródłowy”, co prowadzi do gorszych wyników tłumaczenia i dodatkowych kroków (poprawianie, ponowne tłumaczenie).  
Opcja „Auto” skraca ścieżkę do wyniku, zwiększa wygodę i lepiej wykorzystuje obecny model działania (skrót ⌘⏎/Ctrl+Enter).

---

## 3. Wymagania funkcjonalne

1. Dropdown „Źródłowy” zawiera dodatkową opcję:
   - `Auto` (wartość np. `auto`), ustawioną jako dostępna do wyboru.
2. Gdy użytkownik ma wybrane `Auto` i uruchamia tłumaczenie:
   - aplikacja wysyła `source_lang=auto` do backendu,
   - backend wykrywa język tekstu wejściowego przez `langid`,
   - do właściwego tłumaczenia używany jest wykryty kod języka.
3. Wykrywanie języka działa offline i jest ograniczone do języków dostępnych w aplikacji.
4. Wykryty język jest widoczny dla użytkownika w sposób subtelny:
   - np. w statusie po starcie tłumaczenia: `Wykryto: English (en)` lub `Auto: en`.
5. Funkcja nie zmienia zachowania tłumaczenia, streamingu ani Cancel.
6. Funkcja nie dodaje żadnych połączeń zewnętrznych (100% offline).

---

## 4. Wymagania niefunkcjonalne

- Dodanie zależności `langid` (lub kompatybilnego `py3langid`) jest dopuszczone.
- Brak nowych usług zewnętrznych i brak połączeń sieciowych do detekcji.
- Detekcja działa w czasie akceptowalnym dla interaktywnego tłumaczenia.
- Kompatybilność z light/dark mode.
- Stabilność: w razie błędu detekcji stosowany jest fallback (`en`) i tłumaczenie ma działać dalej.

---

## 5. Zasady detekcji (langid)

### 5.1. Klasyfikacja

- Backend używa `langid.classify(text)` do wyznaczenia kodu języka.
- Klasyfikacja jest ograniczona do listy języków wspieranych przez aplikację (takich jak w dropdownach UI).

### 5.2. Ograniczenie języków

- Przed klasyfikacją backend ustawia listę dozwolonych języków (`langid.set_languages([...])`), aby uniknąć wyboru kodów niewspieranych w aplikacji.

### 5.3. Fallback

- Jeśli detekcja zakończy się błędem lub zwróci kod spoza listy wspieranej, backend stosuje fallback `en`.

---

## 6. UX / UI

1. W dropdownie „Źródłowy”:
   - `Auto` jest pierwszą pozycją (opcjonalnie), aby ułatwić użycie.
2. Status:
   - Po uruchomieniu tłumaczenia, jeśli `Auto`, status może chwilowo pokazać:
     - `Wykryto: <LanguageName> (<code>)`
   - Następnie standardowo `Translating...` i `Gotowe`.
3. Zapamiętywanie w LocalStorage:
   - Jeśli użytkownik wybierze `Auto`, ta wartość ma być zapamiętana tak samo jak inne języki.

---

## 7. Zakres implementacyjny

### 7.1. HTML (`src/templates/index.html`)
- Dodać opcję do selecta „Źródłowy”:
  - `<option value="auto">Auto</option>`

### 7.2. JS (`src/static/js/app.js`)
- W handlerze `translateButton`:
  - przy opcji `Auto` wysyłać `source_lang: "auto"` do backendu.
- Dodać subtelne wskazanie statusu dla trybu `Auto` (np. informacja o użyciu autodetekcji).

### 7.3. Backend (`src/app.py`)
- Dodać obsługę `source_lang == "auto"` w endpointzie `/translate`.
- Dodać funkcję detekcji opartą o `langid`.
- Ograniczyć detekcję do listy języków wspieranych przez aplikację.
- Zapewnić fallback `en` przy błędzie lub nieobsługiwanym kodzie.

---

## 8. Kryteria akceptacji

1. Użytkownik widzi w „Źródłowy” opcję `Auto`.
2. Gdy `Auto` jest wybrane, backend wykrywa język przez `langid` i używa wykrytego kodu do tłumaczenia.
3. Detekcja jest ograniczona do języków wspieranych przez aplikację.
4. W przypadku błędu detekcji stosowany jest fallback `en`.
5. Funkcja działa offline i nie wpływa na streaming, Cancel, Copy, Export.

---

## 9. Zakres poza PRD

- Detekcja języka przez model LLM (np. Ollama).
- Ręczna konfiguracja modelu detekcji i progów pewności przez użytkownika.
- Dedykowany endpoint „sprawdź język” jako osobna funkcja UI.
- Historia tłumaczeń i cache.

---

## 10. Notatki / Ryzyka

- `langid` może mylić się dla bardzo krótkich lub wielojęzycznych fragmentów.
- Ograniczenie detekcji do listy wspieranych języków zmniejsza ryzyko nietrafionego kodu, ale nie eliminuje go całkowicie.
