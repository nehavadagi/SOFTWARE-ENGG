from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"status": "OK"}), 200

@app.route("/search")
def search():
    query = request.args.get("q")
    if not query:
        return jsonify({"error": "Missing search query"}), 400

    try:
        url = f"https://api.openverse.org/v1/images?q={query}"
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        results = [
            {
                "id": item["id"],
                "thumbnail": item.get("thumbnail"),
                "title": item.get("title")
            }
            for item in data.get("results", [])
        ]

        return jsonify({"results": results})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Listen on all interfaces so Docker can route traffic in
    app.run(host="0.0.0.0", port=5000)
