from flask import Flask
from flask_cors import CORS
from app.extensions import db, login_manager, migrate
from config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    db.init_app(app)
    login_manager.init_app(app)
    migrate.init_app(app, db)
    CORS(app, supports_credentials=True)
    
    # Register blueprints
    from app.routes.auth import bp as auth_bp
    from app.routes.search import bp as search_bp
    from app.routes.history import bp as history_bp
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(search_bp)
    app.register_blueprint(history_bp)
    
    return app