import unittest

from src.app import app


class SmokeTest(unittest.TestCase):
    def test_translate_echo(self):
        client = app.test_client()
        response = client.post("/translate", json={"text": "Hello"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {"translation": "Hello"})


if __name__ == "__main__":
    unittest.main()
