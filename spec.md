# Specyfikacja techniczna

## Cel
Krótki opis celu aplikacji:
- jaki problem rozwiązuje
- dla kogo
- w jakim zakresie (co jest poza zakresem)

Local AI Translator zapewnia w pełni lokalne, prywatne tłumaczenie tekstu bez wysyłania danych do usług zewnętrznych. Aplikacja jest przeznaczona dla pojedynczego użytkownika na macOS i działa wyłącznie na localhost. Zakres obejmuje tłumaczenie tekstu z użyciem lokalnego modelu Ollama ze streamingiem, prosty interfejs oraz wygodne operacje (zamiana języków, kopiowanie, export). Poza zakresem są m.in. historia tłumaczeń, autodetekcja języka, wybór modelu, regulacja parametrów oraz praca wieloużytkownikowa.

---

## Zakres funkcjonalny (high-level)
Opis funkcjonalności na wysokim poziomie:
- kluczowe use-case’i
- główne przepływy użytkownika
- czego aplikacja **nie** robi

Bez wchodzenia w szczegóły implementacyjne.

Kluczowe use-case’y:
- użytkownik wprowadza tekst i uruchamia tłumaczenie
- użytkownik odbiera wynik w streamingu i może go skopiować lub zapisać
- użytkownik przełącza języki i tryb jasny/ciemny

Główne przepływy użytkownika:
- wybór języka źródłowego i docelowego
- uruchomienie tłumaczenia (przycisk lub skrót)
- śledzenie statusu i ewentualne przerwanie tłumaczenia
- operacje na wyniku (kopiuj, zapisz)

Nowa funkcjonalność (PRD 001):
- konfiguracja adresu serwera Ollama przez zmienną środowiskową
- opcjonalne wyłączenie weryfikacji certyfikatu TLS przez zmienną środowiskową

Nowa funkcjonalność (PRD 002):
- wczytywanie konfiguracji z pliku `.env` przez `python-dotenv`

Nowa funkcjonalność (PRD 003):
- panel informacyjny ze skrótami klawiaturowymi w UI

Nowa funkcjonalność (PRD 004):
- zastąpienie emoji w akcjach kopiowania i zapisu ikonami outline SVG
- dodanie stanów interakcji przycisków ikon (hover/focus/active) oraz krótkiego stanu sukcesu po akcji

Nowa funkcjonalność (PRD 005):
- dodanie przycisku GitHub nad kartą tłumaczeń, w prawym górnym rogu kontenera aplikacji
- otwieranie repozytorium projektu w nowej karcie przez ikonę outline SVG

Nowa funkcjonalność (PRD 006):
- dodanie subtelnej stopki jako osobnej sekcji pod panelem skrótów
- prezentacja informacji o autorze i linku GitHub w lekkiej formie wizualnej

Nowa funkcjonalność (PRD 007):
- dodanie ikony X obok GitHub w sekcji social nad kartą tłumaczeń
- dodanie linku X w stopce obok linku GitHub

Czego aplikacja nie robi:
- brak historii i cache
- brak autodetekcji języka
- brak wyboru/parametryzacji modelu
- brak chunkowania długich dokumentów
- brak autoryzacji i pracy wieloużytkownikowej

---

## Architektura i przepływ danych
Opis architektury na poziomie koncepcyjnym.

1. Główne komponenty systemu
2. Przepływ danych między komponentami
3. Granice odpowiedzialności

1. Główne komponenty systemu:
   - interfejs webowy (UI) uruchamiany lokalnie
   - backend Flask obsługujący żądania i streaming
   - lokalny silnik Ollama z modelem translategemma
2. Przepływ danych między komponentami:
   - użytkownik wprowadza tekst w UI
   - UI wysyła żądanie tłumaczenia do backendu
   - backend wywołuje Ollama i strumieniuje odpowiedź do UI
   - UI wyświetla wynik na bieżąco i udostępnia akcje na wyniku
3. Granice odpowiedzialności:
   - UI: prezentacja, sterowanie akcjami, lokalne preferencje (LocalStorage)
   - backend: orkiestracja tłumaczenia, streaming, obsługa błędów
   - Ollama: generacja tłumaczenia

Nowa funkcjonalność (PRD 001):
- backend odczytuje konfigurację adresu Ollama i ustawień TLS z zmiennych środowiskowych

Nowa funkcjonalność (PRD 002):
- backend wczytuje `.env` na starcie i łączy konfigurację z env systemowym

Nowa funkcjonalność (PRD 003):
- UI prezentuje panel ze skrótami w szarej części tła

Nowa funkcjonalność (PRD 004):
- UI renderuje przyciski `copy` i `export` jako inline SVG sterowane `currentColor`
- UI dodaje chwilowy stan wizualny sukcesu akcji kopiowania i zapisu bez zmian przepływu danych

Nowa funkcjonalność (PRD 005):
- UI renderuje przycisk `github` jako ikonę outline SVG nad kartą tłumaczeń (prawy górny róg kontenera `.app`)
- UI otwiera link do repozytorium projektu w nowej karcie bez ingerencji w przepływ tłumaczenia

Nowa funkcjonalność (PRD 006):
- UI renderuje osobną sekcję `<footer class="footer">` pod panelem skrótów
- UI prezentuje w stopce tekst autora, separator i link GitHub otwierany w nowej karcie

Nowa funkcjonalność (PRD 007):
- UI renderuje wrapper `page-social` z ikonami `github` i `x` nad sekcją tłumaczeń
- UI otwiera link `https://x.com/growdelan` z ikony X i udostępnia link X w stopce

---

## Komponenty techniczne
Lista kluczowych komponentów technicznych i ich odpowiedzialności.

- Flask: serwer lokalny, routing, endpoint tłumaczenia ze streamingiem
- Warstwa integracji z Ollama: wywołanie modelu translategemma i obsługa strumieniowania
- Frontend (HTML/CSS/JS): interfejs użytkownika, status, akcje, skróty
- LocalStorage: zapis preferencji języków i trybu jasny/ciemny
- Konfiguracja środowiskowa: ustawienie adresu Ollama i weryfikacji TLS
- Konfiguracja środowiskowa: ustawienie adresu startu serwera Flask
- Konfiguracja środowiskowa: wczytywanie `.env` przez `python-dotenv`
- Panel UI: statyczna sekcja ze skrótami klawiaturowymi
- System ikon UI: inline SVG dla akcji kopiowania i zapisu z kolorowaniem przez `currentColor`
- Warstwa stanów UI: style interakcji przycisków ikon i chwilowy stan sukcesu po akcji
- Nawigacja zewnętrzna UI: przycisk GitHub osadzony nad kartą tłumaczeń, w prawym górnym rogu kontenera `.app`
- Stopka UI: osobna sekcja pod panelem skrótów z informacją o autorze i linkiem GitHub
- Sekcja social UI: grupa ikon GitHub/X nad kartą tłumaczeń oraz linki GitHub/X w stopce

---

## Decyzje techniczne
Jawne decyzje techniczne wraz z uzasadnieniem.

Każda decyzja powinna zawierać:
- Decyzja:
- Uzasadnienie:
- Konsekwencje:

- Decyzja: Flask jako backend aplikacji webowej.
  Uzasadnienie: PRD definiuje stack Python + Flask dla lokalnej aplikacji webowej.
  Konsekwencje: Jednoplikiowy serwer HTTP na localhost, prosta integracja z UI.

- Decyzja: Integracja z Ollama przez bibliotekę Python.
  Uzasadnienie: PRD wskazuje Ollama jako silnik LLM i bibliotekę Python jako integrację.
  Konsekwencje: Wymóg lokalnie zainstalowanej i uruchomionej Ollama.

- Decyzja: Model translategemma na sztywno w kodzie.
  Uzasadnienie: PRD wymaga stałego modelu translategemma bez wyboru przez użytkownika.
  Konsekwencje: Brak konfiguracji modelu w UI; uproszczony przepływ tłumaczenia.

- Decyzja: Aplikacja działa wyłącznie na localhost i offline.
  Uzasadnienie: PRD wymaga pełnej prywatności i braku dostępu sieciowego poza localhost.
  Konsekwencje: Brak funkcji chmurowych i zdalnego dostępu.

- Decyzja: Limit długości wejścia to 20 000 znaków z komunikatem błędu.
  Uzasadnienie: PRD podaje zakres 10–20 tys. znaków bez dokładnej granicy, wybrano górny limit jako najprostsze założenie.
  Konsekwencje: Dłuższe teksty są odrzucane z komunikatem „Text too long. Please shorten the input.”

- Decyzja: Streaming realizowany jest jako strumień tekstowy HTTP z jednego endpointu `/translate`.
  Uzasadnienie: PRD nie narzuca formatu transportu, wybrano najprostszą formę bez dodatkowych protokołów.
  Konsekwencje: Klient odbiera surowe fragmenty tekstu i może przerwać połączenie (Cancel) przez anulowanie żądania.

- Decyzja (PRD 001): Konfiguracja adresu Ollama i weryfikacji TLS przez zmienne środowiskowe.
  Uzasadnienie: PRD wymaga ustawiania adresu i weryfikacji certyfikatu bez zmian w UI.
  Konsekwencje: Konfiguracja odbywa się poza aplikacją; konieczne jest udokumentowanie zmiennych.

- Decyzja: Adres startu serwera Flask może być ustawiany przez `FLASK_BIND_ADDR`.
  Uzasadnienie: Wymaganie umożliwienia uruchomienia aplikacji pod innym adresem bez zmian w kodzie.
  Konsekwencje: Parametry host/port są pobierane z URL; domyślnie pozostaje `http://127.0.0.1:8000`.

- Decyzja (PRD 002): Konfiguracja wczytywana z `.env` przez `python-dotenv`, z priorytetem zmiennych systemowych.
  Uzasadnienie: PRD wymaga uproszczenia konfiguracji przy zachowaniu nadpisywania przez env systemowy.
  Konsekwencje: `python-dotenv` staje się zależnością projektu; `.env` nie jest wersjonowany.

- Decyzja (PRD 003): Panel skrótów to statyczny element UI z lekko wyszarzanym tekstem.
  Uzasadnienie: PRD wymaga czytelnej, nienachalnej informacji w tle bez zmian logiki aplikacji.
  Konsekwencje: Brak dodatkowych zależności; utrzymanie listy skrótów w UI.

- Decyzja (PRD 004): Ikony akcji Kopiuj/Zapisz są realizowane jako inline SVG w stylu outline i kolorowane przez `currentColor`.
  Uzasadnienie: PRD wymaga wizualnej spójności z istniejącym layoutem i pełnej kontroli stanów przez CSS bez nowych bibliotek.
  Konsekwencje: Brak nowych zależności; aktualizacja HTML/CSS dla przycisków ikon.

- Decyzja (PRD 004): Potwierdzenie powodzenia akcji Kopiuj/Zapisz realizowane jest krótką klasą stanu `.success` po stronie UI.
  Uzasadnienie: PRD wymaga subtelnego feedbacku bez zmiany layoutu i bez zmian w logice tłumaczenia.
  Konsekwencje: Drobna logika JS dla czasowego przełączania klasy; zachowanie dotychczasowych komunikatów statusu.

- Decyzja (PRD 005): Przycisk GitHub jest umieszczony nad kartą tłumaczeń, w prawym górnym rogu kontenera `.app`.
  Uzasadnienie: Wdrożenie doprecyzowuje docelowe położenie jako element nad kartami tłumaczeń, z zachowaniem czytelności głównego interfejsu.
  Konsekwencje: Zmiana dotyczy wyłącznie layoutu UI i pozycjonowania CSS; brak wpływu na backend i logikę tłumaczenia.

- Decyzja (PRD 005): Ikona GitHub korzysta z inline SVG i istniejących klas `.icon` oraz `.icon-svg`.
  Uzasadnienie: PRD wymaga spójności wizualnej z wcześniej wdrożonym systemem ikon i obsługi motywów przez `currentColor`.
  Konsekwencje: Brak nowych zależności i brak duplikacji stylowania ikon.

- Decyzja (PRD 006): Stopka jest realizowana jako osobna sekcja `<footer>` pod panelem skrótów.
  Uzasadnienie: PRD wymaga wyraźnego wydzielenia strukturalnego stopki i zachowania kolejności sekcji layoutu strony.
  Konsekwencje: Zmiana dotyczy wyłącznie warstwy UI (HTML/CSS); brak wpływu na backend i logikę tłumaczenia.

- Decyzja (PRD 006): Stopka ma subtelny styl oparty o `--muted` i zawiera pojedynczy link zewnętrzny `GitHub`.
  Uzasadnienie: PRD wymaga lekkiej wizualnie sekcji informacyjnej, spójnej z light/dark mode i bez rozbudowy nawigacji.
  Konsekwencje: Brak nowych zależności; utrzymanie prostego, statycznego komponentu UI.

- Decyzja (PRD 007): Ikony social nad kartą tłumaczeń są grupowane we wrapperze `page-social` zamiast pojedynczego przycisku pozycyjnego.
  Uzasadnienie: PRD wymaga równoległego wyświetlenia ikon GitHub i X w tej samej pozycji UI, z zachowaniem spójnego pozycjonowania.
  Konsekwencje: Zmiana ogranicza się do warstwy UI (HTML/CSS); brak wpływu na backend i logikę tłumaczenia.

- Decyzja (PRD 007): Link X jest udostępniany zarówno w górnej sekcji social, jak i w stopce.
  Uzasadnienie: PRD wymaga spójnej obecności kanału X w obu miejscach nawigacji zewnętrznej.
  Konsekwencje: Brak nowych zależności; rozszerzenie istniejącej nawigacji zewnętrznej o dodatkowy link.

---

## Jakość i kryteria akceptacji
Wspólne wymagania jakościowe dla całego projektu.

- 100% offline, brak telemetrii i wysyłki danych
- szybkie uruchamianie i minimalna liczba zależności
- stabilny streaming odpowiedzi w czasie rzeczywistym
- nowoczesny, minimalistyczny interfejs z trybem dark mode
- kompatybilność z macOS i działanie tylko na localhost

---

## Zasady zmian i ewolucji
- zmiany funkcjonalne → aktualizacja `ROADMAP.md`
- zmiany architektoniczne → aktualizacja tej specyfikacji
- nowe zależności → wpis do `## Decyzje techniczne`
- refactory tylko w ramach aktualnego milestone’u

---

## Powiązanie z roadmapą
- Szczegóły milestone’ów i ich statusy znajdują się w `ROADMAP.md`.

---

## Status specyfikacji
- Data utworzenia:
- Ostatnia aktualizacja:
- Aktualny zakres obowiązywania:

- Data utworzenia: 2026-02-01
- Ostatnia aktualizacja: 2026-02-07
- Aktualny zakres obowiązywania: MVP (v1) zgodnie z PRD 000-initial-prd.md oraz rozszerzeniami PRD 001-007
