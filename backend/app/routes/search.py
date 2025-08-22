# backend/search.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_optional, get_jwt_identity
from models import db, SearchHistory
import requests
from datetime import datetime

search_bp = Blueprint('search', __name__)

OPENVERSE_BASE_URL = "https://api.openverse.engineering/v1"

def build_openverse_query(base_query, filters):
    query_params = {"q": base_query}
    
    # Add advanced filters
    if filters.get('license_type'):
        query_params['license_type'] = filters['license_type']
    if filters.get('license'):
        query_params['license'] = filters['license']
    if filters.get('extension'):
        query_params['extension'] = filters['extension']
    if filters.get('size'):
        query_params['size'] = filters['size']
    if filters.get('aspect_ratio'):
        query_params['aspect_ratio'] = filters['aspect_ratio']
    if filters.get('source'):
        query_params['source'] = filters['source']
    
    # Pagination
    if filters.get('page'):
        query_params['page'] = filters['page']
    if filters.get('page_size'):
        query_params['page_size'] = min(filters['page_size'], 50)  # Openverse limit
    
    return query_params

@search_bp.route('/search', methods=['GET'])
@jwt_optional()
def search_images():
    try:
        query = request.args.get('q')
        if not query:
            return jsonify({'error': 'Query parameter "q" is required'}), 400
        
        # Get advanced filters from request
        filters = {
            'license_type': request.args.get('license_type'),
            'license': request.args.get('license'),
            'extension': request.args.get('extension'),
            'size': request.args.get('size'),
            'aspect_ratio': request.args.get('aspect_ratio'),
            'source': request.args.get('source'),
            'page': request.args.get('page', 1, type=int),
            'page_size': request.args.get('page_size', 20, type=int)
        }
        
        # Build Openverse query
        openverse_params = build_openverse_query(query, filters)
        
        # Make request to Openverse API
        response = requests.get(
            f"{OPENVERSE_BASE_URL}/images/",
            params=openverse_params,
            headers={'Accept': 'application/json'}
        )
        
        if response.status_code != 200:
            return jsonify({'error': 'Openverse API error'}), response.status_code
        
        data = response.json()
        
        # Save search history if user is authenticated
        user_id = get_jwt_identity()
        if user_id:
            search_entry = SearchHistory(
                user_id=user_id,
                query=query,
                filters=filters,
                results_count=data.get('result_count', 0)
            )
            db.session.add(search_entry)
            db.session.commit()
        
        return jsonify({
            'results': data.get('results', []),
            'total_count': data.get('result_count', 0),
            'filters_applied': filters
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500