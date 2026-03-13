# Premium UI Refresh i pełna polonizacja interfejsu — PRD

## 1. Przegląd

**Nazwa funkcji:** Premium UI Refresh i pełna polonizacja interfejsu  
**Cel:** Podnieść jakość wizualną i spójność UX aplikacji, tak aby interfejs wyglądał bardziej nowocześnie, spokojnie i premium, bez zmiany architektury backendu ani podstawowej logiki tłumaczenia.  
**Zakres:** UI (`HTML/CSS/JS`), bez nowych endpointów i bez rozszerzania funkcjonalności produktowej poza warstwę prezentacji oraz UX.

---

## 2. Uzasadnienie biznesowe

Obecny interfejs jest funkcjonalny i technicznie poprawny, ale wizualnie przypomina bardziej formularz developerski niż dopracowany produkt końcowy.  
Największe problemy obecnego UI to:
- brak wyraźnej hierarchii wizualnej,
- zbyt surowy układ formularza,
- zbyt mało przestrzeni i rytmu spacingu,
- niespójność językowa,
- brak czytelnego podziału na sekcje sterowania, wejścia, wyniku i statusu.

Celem redesignu jest poprawa pierwszego wrażenia, czytelności i poczucia jakości bez zmiany stosu technologicznego.

---

## 3. Wymagania funkcjonalne

1. Aplikacja otrzymuje wyraźny header produktu nad obszarem sterowania.
2. Header zawiera:
   - nazwę aplikacji,
   - krótki opis wartości,
   - badge `Offline • Private • Ollama`,
   - akcje pomocnicze, w tym przełącznik motywu i linki social.
3. Linki GitHub i X są włączone do normalnego layoutu headera i nie są pozycjonowane absolutnie nad kartą tłumaczeń.
4. Sekcja wyboru języków pozostaje funkcjonalnie taka sama, ale wizualnie staje się osobnym `control bar`.
5. Etykiety wyboru języków zostają zmienione na:
   - `Język wejściowy`,
   - `Język wyjściowy`.
6. Panel wejściowy i panel wyniku otrzymują własne nagłówki oraz krótkie opisy pomocnicze.
7. Panel wejściowy używa etykiety `Tekst wejściowy`.
8. Panel wyniku używa etykiety `Tłumaczenie`.
9. Pole wyniku otrzymuje placeholder `Tutaj pojawi się tłumaczenie...`.
10. Pole wyniku jest wizualnie odróżnione od pola wejściowego jako powierzchnia tylko do odczytu.
11. Główny przycisk akcji ma polską etykietę `Tłumacz`.
12. Przycisk anulowania ma polską etykietę `Przerwij`.
13. Wszystkie komunikaty statusu w UI są spójne językowo i po polsku.
14. Status tłumaczenia jest prezentowany jako wizualny chip/pill, a nie zwykły tekst.
15. W trybie autodetekcji języka komunikat statusu jest również po polsku, np.:
   - `Auto: wykrywanie języka...`
   - `Wykryto: <język> • Tłumaczenie...`
16. Podczas aktywnego tłumaczenia blokowane są:
   - pole tekstu wejściowego,
   - selektor języka wejściowego,
   - selektor języka wyjściowego,
   - przycisk zamiany języków.
17. Należy zachować działanie istniejących funkcji:
   - streaming,
   - cancel,
   - copy,
   - export,
   - theme toggle,
   - skróty klawiaturowe,
   - tryb `Auto`.
18. Panel skrótów i stopka mają być wizualnie spójniejsze z główną kartą aplikacji i nie mogą wyglądać jak dopięte później elementy.

---

## 4. Wymagania niefunkcjonalne

- Brak zmian architektury.
- Brak nowych zależności frontendowych.
- Brak zmian backendu poza utrzymaniem zgodności z istniejącym UI.
- Zachowanie light mode i dark mode.
- Dark mode ma być bardziej grafitowy niż granatowy.
- Layout ma działać poprawnie na desktop i mobile.
- Zachować obecny stack: Flask + statyczny frontend.
- Zachować jeden entrypoint aplikacji.

---

## 5. Kierunek wizualny

Interfejs powinien zmierzać w stronę:
- bardzo jasnego, miękkiego tła,
- centralnego kontenera z dużą ilością oddechu,
- mocnego nagłówka produktu,
- wyraźnie oddzielonego paska sterowania,
- dwóch eleganckich kart: wejście i wynik,
- dopracowanego action/status area,
- spokojnego, premium charakteru inspirowanego nowoczesnymi narzędziami desktopowymi.

Docelowy efekt ma być bliższy „macOS utility app” niż technicznemu formularzowi webowemu.

---

## 6. Zakres implementacyjny

### 6.1. HTML (`src/templates/index.html`)
- Dodać sekcję `header` aplikacji nad obecnym obszarem sterowania.
- Umieścić w headerze:
  - badge,
  - nazwę produktu,
  - opis,
  - przełącznik motywu,
  - linki social.
- Przekształcić toolbar językowy w bardziej świadomy strukturalnie `control bar`.
- Zmienić etykiety selektorów na polskie.
- Dodać nagłówki kart z opisami pomocniczymi.
- Dodać placeholder w polu wyniku.
- Dodać klasę wyróżniającą pole wyniku jako output display surface.
- Utrzymać istniejące akcje kopiowania i eksportu.
- Utrzymać panel skrótów i stopkę, ale dostosować ich strukturę do nowego języka wizualnego.

### 6.2. CSS (`src/static/css/styles.css`)
- Zastąpić obecne tokeny bardziej miękkim, premium zestawem kolorów.
- Uspójnić light mode i dark mode zgodnie z kierunkiem:
  - jasne, miękkie surface tones,
  - grafitowy dark mode,
  - subtelne warstwy tła,
  - większe promienie,
  - delikatniejsze granice,
  - bardziej elegancki cień.
- Dodać subtelne tło strony z głębią.
- Przebudować `.app` jako większy, bardziej premium kontener.
- Dodać styl dla `app-header`.
- Przebudować `.toolbar` jako elegancki pasek sterowania.
- Uspójnić styl `select`, `textarea`, `button`, `.icon`, `.status`, `.panel`, `.panel-subtitle`.
- Usunąć potrzebę absolutnego pozycjonowania sociali nad kartą tłumaczeń.
- Zmniejszyć techniczny charakter uppercase labeli i zastosować bardziej naturalne etykiety.
- Zwiększyć spacing i promienie w całym layoutcie.
- Ulepszyć primary CTA, secondary actions i stany hover/focus/active.

### 6.3. JS (`src/static/js/app.js`)
- Ujednolicić wszystkie teksty UI i statusy na polski.
- Zmienić komunikaty na polskie, w szczególności:
  - `Translating...` → `Tłumaczenie...`
  - `Translation failed.` → `Nie udało się przetłumaczyć tekstu.`
  - `Translate` → `Tłumacz`
  - `Cancel` → `Przerwij`
- Ulepszyć statusy dla trybu `Auto`.
- Rozszerzyć logikę `setBusy`, aby blokować także selecty i swap button.
- Zachować istniejące zachowania biznesowe i kontrakt z backendem.

---

## 7. Kryteria akceptacji

1. Nad obszarem sterowania widoczny jest nowy header produktu z badge, nazwą, opisem i akcjami pomocniczymi.
2. Linki GitHub i X są częścią zwykłego layoutu headera, a nie elementem pozycjonowanym absolutnie nad kartą.
3. Cały interfejs użytkownika jest spójny językowo i po polsku, z wyjątkiem nazwy produktu `Local AI Translator`.
4. Sekcja wyboru języków wizualnie działa jako osobny pasek sterowania.
5. Panel wejścia i panel wyniku mają własne nagłówki i krótkie opisy.
6. Pole wyniku ma placeholder i jest wizualnie odróżnione od pola wejścia.
7. Status tłumaczenia ma formę chipa/pill i jest spójny z resztą interfejsu.
8. Podczas tłumaczenia zablokowane są pole wejścia, oba selecty i przycisk zamiany języków.
9. Streaming, Cancel, Copy, Export, skróty klawiaturowe i tryb `Auto` działają bez regresji.
10. UI pozostaje czytelne i estetyczne w light mode i dark mode.
11. UI działa poprawnie na desktop i mobile.

---

## 8. Zakres poza PRD

- Brak nowych funkcji backendowych.
- Brak nowych endpointów.
- Brak zmian modelu tłumaczenia i integracji z Ollama.
- Brak historii tłumaczeń.
- Brak wyboru modelu.
- Brak nowych skrótów klawiaturowych poza istniejącymi.
- Brak frameworka frontendowego i brak migracji stacku.

---

## 9. Notatki i ryzyka

- Największy efekt jakościowy pochodzi z połączenia zmian strukturalnych i wizualnych, nie z samych kolorów.
- Istnieje ryzyko, że część stylów będzie wymagała dopracowania po wdrożeniu na mobile.
- Należy pilnować, aby redesign nie osłabił czytelności i szybkości głównego flow tłumaczenia.
- Zmiana ma poprawić warstwę prezentacji i UX, ale nie może komplikować istniejącej logiki działania aplikacji.
