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
- Ostatnia aktualizacja: 2026-02-01
- Aktualny zakres obowiązywania: MVP (v1) zgodnie z PRD 000-initial-prd.md
