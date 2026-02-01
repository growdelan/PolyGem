import unittest
from unittest.mock import patch

from src.app import app


class SmokeTest(unittest.TestCase):
    def test_index_loads(self):
        client = app.test_client()
        response = client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("Local AI Translator", response.get_data(as_text=True))

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


if __name__ == "__main__":
    unittest.main()
