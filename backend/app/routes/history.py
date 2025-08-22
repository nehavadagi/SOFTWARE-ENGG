from flask import request, jsonify, Blueprint
from flask_login import login_required, current_user
from app import db
from app.models import SearchHistory

bp = Blueprint('history', __name__, url_prefix='/api')

@bp.route('/search-history', methods=['GET'])
@login_required
def get_search_history():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    history = current_user.searches.order_by(
        SearchHistory.timestamp.desc()
    ).paginate(page=page, per_page=per_page, error_out=False)
    
    return jsonify({
        'items': [{
            'id': item.id,
            'query': item.query,
            'filters': item.search_filters,
            'timestamp': item.timestamp.isoformat()
        } for item in history.items],
        'total': history.total,
        'pages': history.pages,
        'current_page': page
    })

@bp.route('/search-history/<int:history_id>', methods=['DELETE'])
@login_required
def delete_search_history(history_id):
    item = SearchHistory.query.filter_by(id=history_id, user_id=current_user.id).first()
    
    if not item:
        return jsonify({'error': 'Search history item not found'}), 404
        
    db.session.delete(item)
    db.session.commit()
    
    return jsonify({'message': 'Search history item deleted'})