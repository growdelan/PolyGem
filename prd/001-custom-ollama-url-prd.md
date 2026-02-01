# Customowy adres Ollama — PRD

## 1. Przegląd

**Nazwa funkcji:** Customowy adres Ollama  
**Cel:** Umożliwić wskazanie własnego adresu serwera Ollama oraz opcjonalne wyłączenie weryfikacji certyfikatu TLS.  
**Zakres:** Tylko konfiguracja po stronie aplikacji (bez zmian UI).  

---

## 2. Uzasadnienie biznesowe

Niektórzy użytkownicy uruchamiają Ollamę pod innym adresem (np. inny host/port, proxy). Dodatkowo w środowiskach testowych może być potrzebne wyłączenie weryfikacji certyfikatu TLS.

---

## 3. Wymagania funkcjonalne

1. Aplikacja umożliwia ustawienie adresu Ollamy przez zmienną środowiskową.
2. Domyślny adres pozostaje bez zmian (lokalny).
3. Aplikacja umożliwia wyłączenie weryfikacji certyfikatu TLS przez zmienną środowiskową.
4. Brak zmian w UI.

---

## 4. Wymagania niefunkcjonalne

- Konfiguracja odbywa się wyłącznie przez zmienne środowiskowe.
- Brak zapisu konfiguracji w repozytorium.

---

## 5. Konfiguracja

- `OLLAMA_CUSTOM_ADDR` — opcjonalny adres serwera Ollama; jeśli niepodany, używany jest domyślny lokalny adres.
- `OLLAMA_VERYFI_SSL` — jeśli ustawione na `false/0/no`, wyłącza weryfikację certyfikatu TLS.

---

## 6. Zakres poza PRD

- Brak panelu ustawień w UI.
- Brak automatycznego wykrywania instancji Ollama.
