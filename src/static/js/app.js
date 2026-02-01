const sourceText = document.getElementById("source-text");
const targetText = document.getElementById("target-text");
const sourceLang = document.getElementById("source-lang");
const targetLang = document.getElementById("target-lang");
const swapButton = document.getElementById("swap");
const copyButton = document.getElementById("copy");
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

swapButton.addEventListener("click", () => {
    const sourceValue = sourceLang.value;
    sourceLang.value = targetLang.value;
    targetLang.value = sourceValue;

    const sourceTextValue = sourceText.value;
    sourceText.value = targetText.value;
    targetText.value = sourceTextValue;
});

copyButton.addEventListener("click", async () => {
    const text = targetText.value;
    if (!text) {
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        setStatus("Skopiowano");
    } catch (error) {
        setStatus("Nie udało się skopiować");
    }
});

document.addEventListener("keydown", (event) => {
    if (!event.metaKey) {
        return;
    }

    if (event.key === "Enter") {
        event.preventDefault();
        translateButton.click();
        return;
    }

    if (event.key.toLowerCase() === "l") {
        event.preventDefault();
        swapButton.click();
        return;
    }

    if (event.shiftKey && event.key.toLowerCase() === "c") {
        event.preventDefault();
        copyButton.click();
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
