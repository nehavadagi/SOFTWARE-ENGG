from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import requests
from models import User, SavedSearch
import os

app = Flask(__name__)
CORS(app)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET', 'your-secret-key-change-in-production')
jwt = JWTManager(app)

# Openverse API configuration
OPENVERSE_API_URL = "https://api.openverse.engineering/v1/images/"

# Auth Routes
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        if User.find_by_username(username):
            return jsonify({'error': 'Username already exists'}), 400
            
        user_id = User.create_user(username, email, password)
        return jsonify({'message': 'User created successfully', 'user_id': user_id}), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        user = User.find_by_username(username)
        if user and User.verify_password(user, password):
            access_token = create_access_token(identity=str(user['_id']))
            return jsonify({
                'access_token': access_token,
                'user_id': str(user['_id']),
                'username': user['username']
            }), 200
        
        return jsonify({'error': 'Invalid credentials'}), 401
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Saved Searches Routes
@app.route('/saved-searches', methods=['GET', 'POST'])
@jwt_required()
def manage_saved_searches():
    user_id = get_jwt_identity()
    
    if request.method == 'GET':
        searches = SavedSearch.get_user_searches(user_id)
        return jsonify(searches), 200
        
    elif request.method == 'POST':
        data = request.get_json()
        search_id = SavedSearch.save_search(
            user_id, 
            data['query'], 
            data.get('filters')
        )
        return jsonify({'message': 'Search saved', 'search_id': search_id}), 201

@app.route('/saved-searches/<search_id>', methods=['DELETE'])
@jwt_required()
def delete_saved_search(search_id):
    user_id = get_jwt_identity()
    if SavedSearch.delete_search(user_id, search_id):
        return jsonify({'message': 'Search deleted'}), 200
    return jsonify({'error': 'Search not found'}), 404

# Existing search endpoint (protected)
@app.route('/search')
@jwt_required()
def search_images():
    query = request.args.get('q')
    # ... rest of your existing search code ...