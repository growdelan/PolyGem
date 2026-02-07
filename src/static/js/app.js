const sourceText = document.getElementById("source-text");
const targetText = document.getElementById("target-text");
const sourceLang = document.getElementById("source-lang");
const targetLang = document.getElementById("target-lang");
const swapButton = document.getElementById("swap");
const copyButton = document.getElementById("copy");
const exportButton = document.getElementById("export");
const githubButton = document.getElementById("github");
const xButton = document.getElementById("x");
const themeToggle = document.getElementById("theme-toggle");
const translateButton = document.getElementById("translate");
const cancelButton = document.getElementById("cancel");
const spinner = document.getElementById("spinner");
const statusLabel = document.getElementById("status");

let currentController = null;
let currentTheme = "light";

const applyTheme = (theme) => {
    document.body.classList.toggle("theme-dark", theme === "dark");
    themeToggle.textContent = theme === "dark" ? "Tryb jasny" : "Tryb ciemny";
    currentTheme = theme;
};

const saveLanguages = () => {
    localStorage.setItem("source_lang", sourceLang.value);
    localStorage.setItem("target_lang", targetLang.value);
};

const setStatus = (message) => {
    statusLabel.textContent = message;
};

const pulseSuccess = (button) => {
    button.classList.add("success");
    setTimeout(() => button.classList.remove("success"), 600);
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

themeToggle.addEventListener("click", () => {
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
});

swapButton.addEventListener("click", () => {
    const sourceValue = sourceLang.value;
    sourceLang.value = targetLang.value;
    targetLang.value = sourceValue;

    const sourceTextValue = sourceText.value;
    sourceText.value = targetText.value;
    targetText.value = sourceTextValue;

    saveLanguages();
});

sourceLang.addEventListener("change", saveLanguages);
targetLang.addEventListener("change", saveLanguages);

copyButton.addEventListener("click", async () => {
    const text = targetText.value;
    if (!text) {
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        setStatus("Skopiowano");
        pulseSuccess(copyButton);
    } catch (error) {
        setStatus("Nie udało się skopiować");
    }
});

exportButton.addEventListener("click", () => {
    const text = targetText.value;
    if (!text) {
        return;
    }

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "translation.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setStatus("Zapisano");
    pulseSuccess(exportButton);
});

if (githubButton) {
    githubButton.addEventListener("click", () => {
        window.open("https://github.com/growdelan/PolyGem", "_blank", "noopener,noreferrer");
    });
}

if (xButton) {
    xButton.addEventListener("click", () => {
        window.open("https://x.com/growdelan", "_blank", "noopener,noreferrer");
    });
}

document.addEventListener("keydown", (event) => {
    const isCommand = event.metaKey || event.ctrlKey;
    if (!isCommand) {
        return;
    }

    if (event.key === "Enter") {
        event.preventDefault();
        translateButton.click();
        return;
    }

    if (event.key.toLowerCase() === "k") {
        event.preventDefault();
        swapButton.click();
        return;
    }

    if (event.shiftKey && event.key.toLowerCase() === "c") {
        event.preventDefault();
        copyButton.click();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "light") {
        applyTheme(storedTheme);
    } else {
        applyTheme("light");
    }

    const storedSource = localStorage.getItem("source_lang");
    const storedTarget = localStorage.getItem("target_lang");
    if (storedSource) {
        sourceLang.value = storedSource;
    }
    if (storedTarget) {
        targetLang.value = storedTarget;
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
