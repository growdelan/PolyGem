import unittest
from unittest.mock import patch

from src.app import app


class SmokeTest(unittest.TestCase):
    def test_index_loads(self):
        client = app.test_client()
        response = client.get("/")
        body = response.get_data(as_text=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn("Local AI Translator", body)
        self.assertIn("Offline • Private • Ollama", body)
        self.assertIn("Język wejściowy", body)
        self.assertIn("Język wyjściowy", body)
        self.assertIn("Tutaj pojawi się tłumaczenie...", body)
        self.assertIn("Gotowe do tłumaczenia", body)

    def test_translate_stubbed(self):
        client = app.test_client()
        with patch("src.app.translate_text", return_value="Czesc"):
            response = client.post(
                "/translate",
                json={
                    "text": "Hello",
                    "source_lang": "en",
                    "target_lang": "pl",
                },
            )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {"translation": "Czesc"})

    def test_translate_stream_stubbed(self):
        client = app.test_client()
        with patch("src.app.translate_stream", return_value=iter(["A", "B"])):
            response = client.post(
                "/translate",
                json={
                    "text": "Hello",
                    "source_lang": "en",
                    "target_lang": "pl",
                    "stream": True,
                },
            )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_data(as_text=True), "AB")

    def test_translate_too_long(self):
        client = app.test_client()
        response = client.post("/translate", json={"text": "a" * 20001})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.get_json(),
            {"error": "Text too long. Please shorten the input."},
        )

    def test_translate_auto_uses_detected_language(self):
        client = app.test_client()
        with patch("src.app.detect_source_language", return_value="de") as detect_mock:
            with patch("src.app.translate_text", return_value="Czesc") as translate_mock:
                response = client.post(
                    "/translate",
                    json={
                        "text": "Hallo Welt",
                        "source_lang": "auto",
                        "target_lang": "pl",
                    },
                )
        self.assertEqual(response.status_code, 200)
        detect_mock.assert_called_once_with("Hallo Welt")
        translate_mock.assert_called_once_with("Hallo Welt", "de", "pl")
        self.assertEqual(
            response.get_json(),
            {"translation": "Czesc", "detected_source_lang": "de"},
        )

    def test_translate_stream_auto_sets_detected_header(self):
        client = app.test_client()
        with patch("src.app.detect_source_language", return_value="fr"):
            with patch("src.app.translate_stream", return_value=iter(["A", "B"])):
                response = client.post(
                    "/translate",
                    json={
                        "text": "Bonjour",
                        "source_lang": "auto",
                        "target_lang": "pl",
                        "stream": True,
                    },
                )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_data(as_text=True), "AB")
        self.assertEqual(response.headers.get("X-Detected-Language"), "fr")


if __name__ == "__main__":
    unittest.main()
