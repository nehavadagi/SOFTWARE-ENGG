# backend/history.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, SearchHistory
from datetime import datetime, timedelta

history_bp = Blueprint('history', __name__)

@history_bp.route('/searches', methods=['GET'])
@jwt_required()
def get_search_history():
    try:
        user_id = get_jwt_identity()
        
        # Get optional query parameters
        limit = request.args.get('limit', 10, type=int)
        offset = request.args.get('offset', 0, type=int)
        
        searches = SearchHistory.query.filter_by(user_id=user_id)\
            .order_by(SearchHistory.created_at.desc())\
            .offset(offset).limit(limit).all()
        
        return jsonify([{
            'id': search.id,
            'query': search.query,
            'filters': search.filters,
            'created_at': search.created_at.isoformat(),
            'results_count': search.results_count
        } for search in searches]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@history_bp.route('/searches/<int:search_id>', methods=['DELETE'])
@jwt_required()
def delete_search(search_id):
    try:
        user_id = get_jwt_identity()
        
        search = SearchHistory.query.filter_by(id=search_id, user_id=user_id).first()
        
        if not search:
            return jsonify({'error': 'Search not found'}), 404
        
        db.session.delete(search)
        db.session.commit()
        
        return jsonify({'message': 'Search deleted successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@history_bp.route('/searches/clear', methods=['DELETE'])
@jwt_required()
def clear_search_history():
    try:
        user_id = get_jwt_identity()
        
        # Delete searches older than 30 days or all if specified
        days = request.args.get('days', type=int)
        
        if days:
            cutoff_date = datetime.utcnow() - timedelta(days=days)
            SearchHistory.query.filter(
                SearchHistory.user_id == user_id,
                SearchHistory.created_at < cutoff_date
            ).delete()
        else:
            SearchHistory.query.filter_by(user_id=user_id).delete()
        
        db.session.commit()
        
        return jsonify({'message': 'Search history cleared successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500