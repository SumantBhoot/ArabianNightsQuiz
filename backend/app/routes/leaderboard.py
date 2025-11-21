from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.score import Score
from app.models.user import User
from sqlalchemy import func
from datetime import datetime, timedelta

leaderboard_bp = Blueprint('leaderboard', __name__)

@leaderboard_bp.route('/submit', methods=['POST'])
@jwt_required()
def submit_score():
    try:
        user_id = int(get_jwt_identity())
        data = request.get_json()
        
        score = Score(
            user_id=user_id,
            score=data.get('score'),
            total_questions=data.get('total_questions'),
            story=data.get('story'),
            difficulty=data.get('difficulty')
        )
        
        db.session.add(score)
        db.session.commit()
        
        return jsonify({'message': 'Score submitted successfully', 'score': score.to_dict()}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@leaderboard_bp.route('', methods=['GET'])
def get_leaderboard():
    try:
        time_filter = request.args.get('time', 'all') # all, weekly
        story_filter = request.args.get('story')
        
        query = db.session.query(
            User.username,
            func.max(Score.score).label('max_score'),
            Score.total_questions,
            Score.timestamp
        ).join(User).group_by(User.id)
        
        if time_filter == 'weekly':
            week_ago = datetime.utcnow() - timedelta(days=7)
            query = query.filter(Score.timestamp >= week_ago)
            
        if story_filter and story_filter != 'All Stories':
            query = query.filter(Score.story == story_filter)
            
        # Order by score descending
        results = query.order_by(func.max(Score.score).desc()).limit(10).all()
        
        leaderboard = []
        for r in results:
            leaderboard.append({
                'username': r.username,
                'score': r.max_score,
                'total': r.total_questions,
                'date': r.timestamp.isoformat()
            })
            
        return jsonify({'leaderboard': leaderboard}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
