from flask import request, jsonify, Blueprint
from flask_login import current_user
import requests
from app import db
from app.models import SearchHistory

bp = Blueprint('search', __name__, url_prefix='/api')

@bp.route('/search')
def search():
    # Get and validate parameters
    query = request.args.get('q', '')
    license_type = request.args.get('license')
    image_type = request.args.get('image_type')
    page = request.args.get('page', 1, type=int)
    
    if not query or len(query.strip()) < 2:
        return jsonify({'error': 'Query must be at least 2 characters long'}), 400
    
    # Build Openverse API parameters
    params = {
        'q': query,
        'page': page,
        'page_size': 20
    }
    
    if license_type and license_type != 'all':
        params['license'] = license_type
    if image_type and image_type != 'all':
        params['extension'] = image_type
    
    # Call Openverse API
    try:
        response = requests.get(
            'https://api.openverse.engineering/v1/images/',
            params=params,
            headers={'Accept': 'application/json'},
            timeout=30
        )
        response.raise_for_status()
        
        results = response.json()
        
        # Save to search history if user is authenticated
        if current_user.is_authenticated:
            search_history = SearchHistory(
                query=query,
                search_filters=params,
                user_id=current_user.id
            )
            db.session.add(search_history)
            db.session.commit()
        
        return jsonify(results)
        
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Failed to fetch results: {str(e)}'}), 502