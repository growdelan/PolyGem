const sourceText = document.getElementById("source-text");
const targetText = document.getElementById("target-text");
const sourceLang = document.getElementById("source-lang");
const targetLang = document.getElementById("target-lang");
const translateButton = document.getElementById("translate");
const statusLabel = document.getElementById("status");

const setStatus = (message) => {
    statusLabel.textContent = message;
};

const setBusy = (busy) => {
    translateButton.disabled = busy;
    sourceText.disabled = busy;
};

translateButton.addEventListener("click", async () => {
    const text = sourceText.value.trim();
    setBusy(true);
    setStatus("Tłumaczenie...");
    targetText.value = "";

    try {
        const response = await fetch("/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text,
                source_lang: sourceLang.value,
                target_lang: targetLang.value,
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            targetText.value = data.error || "Błąd tłumaczenia.";
            setStatus("Błąd");
        } else {
            targetText.value = data.translation || "";
            setStatus("Gotowe");
        }
    } catch (error) {
        targetText.value = "Błąd połączenia z serwerem.";
        setStatus("Błąd");
    } finally {
        setBusy(false);
    }
});
