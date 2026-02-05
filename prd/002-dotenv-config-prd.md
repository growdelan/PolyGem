# Dotenv konfiguracja — PRD

## 1. Przegląd

**Nazwa funkcji:** Obsługa konfiguracji przez `.env`  
**Cel:** Przenieść konfigurację środowiskową do pliku `.env` i wczytywać ją przez `python-dotenv`.  
**Zakres:** Tylko sposób dostarczania konfiguracji (bez zmian UI).  

---

## 2. Uzasadnienie biznesowe

Ułatwienie konfiguracji aplikacji bez konieczności ustawiania zmiennych w systemie lub powłoce. Plik `.env` upraszcza uruchamianie i przenoszenie konfiguracji między środowiskami.

---

## 3. Wymagania funkcjonalne

1. Aplikacja wczytuje konfigurację z pliku `.env` przy starcie.
2. Wspierane są dotychczasowe zmienne:
   - `OLLAMA_CUSTOM_ADDR`
   - `OLLAMA_VERYFI_SSL`
   - `FLASK_BIND_ADDR`
3. Brak zmian w UI.

---

## 4. Wymagania niefunkcjonalne

- Plik `.env` nie jest wersjonowany w repozytorium.
- Konfiguracja pozostaje możliwa także przez zmienne systemowe (jeśli ustawione).

---

## 5. Konfiguracja

- `.env` jest ładowany na starcie aplikacji przez `python-dotenv`.
- Priorytet: zmienne systemowe nadpisują wartości z `.env`.
- Dokumentacja uruchomienia opisuje przykład pliku `.env` i listę wspieranych zmiennych.

---

## 6. Zakres poza PRD

- Brak panelu ustawień w UI.
- Brak zarządzania konfiguracją w aplikacji.
