from flask import Flask
from pymongo import MongoClient
import bcrypt
from datetime import datetime
import os

# MongoDB connection
client = MongoClient(os.getenv('MONGO_URI', 'mongodb://localhost:27017/'))
db = client['media_search_db']

class User:
    collection = db['users']
    
    @staticmethod
    def create_user(username, email, password):
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        user = {
            'username': username,
            'email': email,
            'password': hashed_password,
            'created_at': datetime.utcnow()
        }
        result = User.collection.insert_one(user)
        return str(result.inserted_id)
    
    @staticmethod
    def find_by_username(username):
        return User.collection.find_one({'username': username})
    
    @staticmethod
    def verify_password(user, password):
        return bcrypt.checkpw(password.encode('utf-8'), user['password'])

class SavedSearch:
    collection = db['saved_searches']
    
    @staticmethod
    def save_search(user_id, query, filters=None):
        search = {
            'user_id': user_id,
            'query': query,
            'filters': filters or {},
            'saved_at': datetime.utcnow()
        }
        result = SavedSearch.collection.insert_one(search)
        return str(result.inserted_id)
    
    @staticmethod
    def get_user_searches(user_id):
        return list(SavedSearch.collection.find(
            {'user_id': user_id}, 
            {'_id': 0, 'user_id': 0}
        ).sort('saved_at', -1))
    
    @staticmethod
    def delete_search(user_id, search_id):
        result = SavedSearch.collection.delete_one({
            'user_id': user_id,
            '_id': search_id
        })
        return result.deleted_count > 0