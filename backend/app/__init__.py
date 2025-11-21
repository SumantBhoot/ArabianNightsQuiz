from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config

db = SQLAlchemy()
jwt = JWTManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": app.config['CORS_ORIGINS'], "allow_headers": ["Content-Type", "Authorization"], "methods": ["GET", "POST", "OPTIONS"], "supports_credentials": True}})
    
    # Register blueprints
    from app.routes.auth import auth_bp
    from app.routes.questions import questions_bp
    from app.routes.leaderboard import leaderboard_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(questions_bp, url_prefix='/api/questions')
    app.register_blueprint(leaderboard_bp, url_prefix='/api/leaderboard')
    
    # Create tables
    with app.app_context():
        # Import models to ensure they are known to SQLAlchemy
        from app.models.user import User
        from app.models.question import Question
        from app.models.score import Score
        db.create_all()
    
    return app
