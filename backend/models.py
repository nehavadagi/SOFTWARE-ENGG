from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class SearchHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(50))
    query = db.Column(db.String(200))
