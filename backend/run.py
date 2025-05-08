from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Open Media Search API"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

from flask_jwt_extended import JWTManager, create_access_token, jwt_required

app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)

@app.route("/login", methods=["POST"])
def login():
    return jsonify(access_token=create_access_token(identity="user"))

from models import db
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
db.init_app(app)
with app.app_context():
    db.create_all()
