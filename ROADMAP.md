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
- obsługa skrótów ⌘⏎, ⌘K, ⌘⇧C
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

---

## Milestone 3.3: Outline SVG dla ikon akcji (done)

Cel:
- poprawa spójności wizualnej przycisków akcji kopiowania i zapisu
- zapewnienie czytelnych stanów interakcji i subtelnego feedbacku sukcesu

Definition of Done:
- przyciski `copy` i `export` używają ikon SVG outline zamiast emoji
- kolory ikon wynikają z CSS (`currentColor`) i są spójne z light/dark mode
- dostępne są stany `hover`, `focus-visible` i `active` dla przycisków ikon
- po udanym kopiowaniu i zapisie widoczny jest krótki stan sukcesu bez zmiany layoutu
- dotychczasowe komunikaty statusu (`Skopiowano`, `Zapisano`) pozostają bez zmian

Zakres:
- podmiana zawartości przycisków ikon w HTML na inline SVG
- dopisanie styli `.icon`, `.icon-svg` oraz stanu `.icon.success` w CSS
- dodanie krótkiej logiki JS do czasowego oznaczenia sukcesu dla akcji copy/export

---

## Milestone 3.4: Ikona GitHub nad kartą tłumaczeń (done)

Cel:
- dodać szybki dostęp do repozytorium projektu z poziomu interfejsu
- zachować spójność wizualną z istniejącymi ikonami outline SVG

Definition of Done:
- nad kartą tłumaczeń, w prawym górnym rogu kontenera aplikacji, znajduje się przycisk `github`
- przycisk otwiera `https://github.com/growdelan/PolyGem` w nowej karcie
- przycisk wykorzystuje inline SVG i klasy `.icon` oraz `.icon-svg`
- rozwiązanie działa poprawnie w light i dark mode
- obszar tłumaczeń i logika tłumaczenia pozostają bez zmian

Zakres:
- dodanie przycisku GitHub nad kartą tłumaczeń, w prawym górnym rogu kontenera `.app`
- osadzenie ikony GitHub jako outline SVG
- pozycjonowanie przycisku względem kontenera `.app` i podpięcie akcji otwarcia linku

---

## Milestone 3.5: Subtelna stopka pod panelem skrótów (done)

Cel:
- dodać estetyczną, lekką wizualnie stopkę jako osobną sekcję pod panelem skrótów
- uporządkować dolną część layoutu przez wyraźne rozdzielenie sekcji treści i stopki

Definition of Done:
- struktura strony ma kolejność: `main.app`, `section.shortcuts-panel`, `footer.footer`
- stopka zawiera tekst `© 2026 Daniel Wyrzyński`, separator `•` i link `GitHub`
- link `GitHub` otwiera się w nowej karcie i używa `rel="noopener"`
- styl stopki jest subtelny, wyśrodkowany i spójny z light/dark mode
- zmiana nie wpływa na logikę tłumaczenia, streaming i backend

Zakres:
- dodanie nowej sekcji HTML `footer.footer` pod panelem skrótów
- dodanie struktury `footer-inner`, `footer-separator`, `footer-link`
- dodanie styli CSS dla stopki i stanu hover linku

---

## Milestone 3.6: Ikona X w sekcji social i stopce (done)

Cel:
- rozszerzyć sekcję social nad kartą tłumaczeń o ikonę platformy X obok GitHub
- dodać spójny link X także w stopce aplikacji

Definition of Done:
- nad sekcją tłumaczeń istnieje wrapper `page-social` zawierający ikony GitHub i X
- kliknięcie ikony X otwiera `https://x.com/growdelan` w nowej karcie
- pozycja sekcji social pozostaje taka sama jak dotychczas dla ikony GitHub
- stopka zawiera dodatkowy link `X` obok linku `GitHub`
- zmiana nie wpływa na logikę tłumaczenia, streaming i backend

Zakres:
- zastąpienie pojedynczego przycisku GitHub wrapperem social z dwoma ikonami
- dodanie stylu pozycjonowania `page-social` i odstępu między ikonami
- dodanie obsługi kliknięcia dla przycisku X oraz linku X w stopce

---

## Milestone 3.7: Autodetekcja języka źródłowego (Auto) (done)

Cel:
- zmniejszyć liczbę ręcznych zmian języka źródłowego przez wprowadzenie opcji `Auto`
- wysyłać do backendu wykryty kod języka zamiast wartości `auto`

Definition of Done:
- dropdown „Źródłowy” zawiera opcję `Auto`
- przy wybranym `Auto` aplikacja przekazuje `source_lang=auto`, a backend wykrywa język przez `langid`
- detekcja jest ograniczona do języków wspieranych przez aplikację i ma fallback `en`
- UI pokazuje subtelną informację o wykrytym języku
- rozwiązanie działa offline i nie zmienia streamingu, Cancel ani backendu

Zakres:
- dodanie opcji `Auto` do selecta języka źródłowego
- dodanie obsługi `source_lang=auto` w backendzie z użyciem `langid`
- ograniczenie detekcji do listy języków wspieranych i fallback `en`
- dodanie komunikatu statusu o autodetekcji oraz zachowanie kompatybilności z LocalStorage

---

## Milestone 4.0: Redukcja ryzyka premium redesignu UI (done)

Cel:
- przygotować bezpieczną przebudowę layoutu i hierarchii wizualnej bez regresji głównego flow tłumaczenia
- rozstrzygnąć konflikt między nowym header/layoutem a dotychczasowym pozycjonowaniem social, panelu skrótów i stopki

Definition of Done:
- istnieje docelowa struktura layoutu dla headera produktu, control bara, paneli wejścia/wyjścia i obszaru statusu
- istnieje jednoznaczna decyzja, czy panel skrótów i stopka trafiają do wnętrza `.app`, czy pozostają osobnymi kartami
- linki GitHub/X nie są już planowane jako element pozycjonowany absolutnie nad kartą tłumaczeń
- plan zachowuje zgodność ze streamingiem, Cancel, Copy, Export, theme toggle i trybem `Auto`
- zakres zmian w HTML/CSS/JS jest rozpisany tak, aby kolejny milestone mógł wdrożyć redesign bez decyzji architektonicznych

Zakres:
- doprecyzowanie docelowej hierarchii sekcji: header, control bar, input, output, status
- doprecyzowanie relacji layoutowej dla social, panelu skrótów i stopki względem `.app`
- potwierdzenie braku zmian kontraktu backendu i endpointu `/translate`
- przygotowanie bezpiecznego podziału redesignu na wdrażalne kroki frontendowe

---

## Milestone 4.1: Premium UI Refresh i pełna polonizacja interfejsu (done)

Cel:
- wdrożyć nowoczesny, spokojny i premium wygląd aplikacji przy zachowaniu obecnej funkcjonalności
- ujednolicić cały język interfejsu na polski z zachowaniem nazwy produktu `PolyGem`

Definition of Done:
- aplikacja ma wyraźny header produktu z badge, opisem wartości, przełącznikiem motywu i linkami social
- sekcja języków działa jako osobny control bar, a panele wejścia i wyniku mają własne nagłówki i opisy
- pole wyniku ma placeholder i jest wizualnie odróżnione od pola wejściowego
- status tłumaczenia ma formę chipa/pill, a komunikaty UI są spójnie po polsku
- podczas tłumaczenia blokowane są pole wejścia, oba selecty i przycisk zamiany języków
- redesign działa poprawnie w light mode, dark mode i na mobile, bez regresji dla streaming, Cancel, Copy, Export i `Auto`

Zakres:
- przebudowa HTML headera produktu, control bara oraz nagłówków kart wejścia i wyniku
- wdrożenie nowego systemu wizualnego w CSS: tło, tokeny kolorów, surface cards, spacing, promienie, CTA, ikony i status chip
- pełna polonizacja etykiet i komunikatów UI w HTML/JS
- rozszerzenie logiki JS o spójne statusy `Auto` i blokadę dodatkowych kontrolek podczas tłumaczenia

---

## Milestone 4.2: Statusy UX i polish panelu skrótów (done)

Cel:
- dopracować mikro-UX statusów i akcji pomocniczych bez zmiany głównego flow tłumaczenia
- podnieść jakość panelu skrótów i drobnych warstw wizualnych po premium redesignie

Definition of Done:
- status ma warianty `idle`, `busy`, `success` i `error` oraz jest sterowany przez JS
- po `copy` i `export` status wraca automatycznie do stanu domyślnego po krótkim czasie
- kliknięcie `Tłumacz` przy pustym wejściu nie wysyła żądania i pokazuje komunikat błędu
- element statusu ma `aria-live="polite"` i domyślną klasę `status--idle`
- panel skrótów używa markupu keycaps bez zmiany mapowania skrótów
- lżejszy `theme-toggle`, mocniejszy surface `.panel` i bardziej odróżniony `.output-text` działają poprawnie w light/dark mode i na mobile

Zakres:
- rozszerzenie `app.js` o typowane statusy, reset po akcjach pomocniczych i walidację pustego wejścia
- dopisanie wariantów `.status--*` oraz polishu `theme-toggle`, `.panel`, `.output-text` i `status-wrap` w CSS
- przebudowa HTML statusu i panelu skrótów na bardziej semantyczny markup
