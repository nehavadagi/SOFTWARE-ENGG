from flask import jsonify, request
from flask_login import login_required, current_user
from app import db
from app.models import SavedSearch  # Import the new model

# ... your existing routes ...

# --- Save a new search ---
@main.route('/api/save_search', methods=['POST'])
@login_required
def save_search():
    try:
        data = request.get_json()
        query = data.get('query')
        
        if not query:
            return jsonify({'error': 'Query is required'}), 400
            
        # Check if this search is already saved for the user
        existing_search = SavedSearch.query.filter_by(user_id=current_user.id, query=query).first()
        if existing_search:
            return jsonify({'message': 'Search already saved'}), 200
            
        new_search = SavedSearch(query=query, user_id=current_user.id)
        db.session.add(new_search)
        db.session.commit()
        
        return jsonify({'message': 'Search saved successfully!', 'id': new_search.id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- Get all saved searches for the current user ---
@main.route('/api/saved_searches', methods=['GET'])
@login_required
def get_saved_searches():
    try:
        searches = SavedSearch.query.filter_by(user_id=current_user.id).order_by(SavedSearch.timestamp.desc()).all()
        search_list = [{'id': s.id, 'query': s.query, 'timestamp': s.timestamp.isoformat()} for s in searches]
        return jsonify(search_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- Delete a saved search ---
@main.route('/api/saved_searches/<int:search_id>', methods=['DELETE'])
@login_required
def delete_saved_search(search_id):
    try:
        search = SavedSearch.query.get_or_404(search_id)
        
        # Ensure the user owns this search
        if search.user_id != current_user.id:
            return jsonify({'error': 'Unauthorized'}), 403
            
        db.session.delete(search)
        db.session.commit()
        
        return jsonify({'message': 'Search deleted successfully!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500