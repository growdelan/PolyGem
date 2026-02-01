const sourceText = document.getElementById("source-text");
const targetText = document.getElementById("target-text");
const sourceLang = document.getElementById("source-lang");
const targetLang = document.getElementById("target-lang");
const translateButton = document.getElementById("translate");
const cancelButton = document.getElementById("cancel");
const spinner = document.getElementById("spinner");
const statusLabel = document.getElementById("status");

let currentController = null;

const setStatus = (message) => {
    statusLabel.textContent = message;
};

const setBusy = (busy) => {
    translateButton.disabled = busy;
    sourceText.disabled = busy;
    cancelButton.disabled = !busy;
    spinner.classList.toggle("active", busy);
};

cancelButton.addEventListener("click", () => {
    if (currentController) {
        currentController.abort();
    }
});

translateButton.addEventListener("click", async () => {
    const text = sourceText.value.trim();
    setBusy(true);
    setStatus("Translating...");
    targetText.value = "";
    currentController = new AbortController();
    let aborted = false;

    try {
        const response = await fetch("/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text,
                source_lang: sourceLang.value,
                target_lang: targetLang.value,
                stream: true,
            }),
            signal: currentController.signal,
        });

        if (!response.ok) {
            const data = await response.json();
            targetText.value = data.error || "Błąd tłumaczenia.";
            setStatus("Błąd");
            return;
        }

        if (!response.body) {
            setStatus("Błąd");
            targetText.value = "Brak odpowiedzi z serwera.";
            return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                break;
            }
            targetText.value += decoder.decode(value, { stream: true });
        }

        if (!aborted) {
            setStatus("Gotowe");
        }
    } catch (error) {
        if (error.name === "AbortError") {
            aborted = true;
            setStatus("Przerwano");
        } else {
            targetText.value = "Błąd połączenia z serwerem.";
            setStatus("Błąd");
        }
    } finally {
        currentController = null;
        setBusy(false);
    }
});
