from flask import Blueprint, request, jsonify
from app import db
from app.models.question import Question

questions_bp = Blueprint('questions', __name__)

@questions_bp.route('', methods=['GET'])
def get_questions():
    """Get questions filtered by story and/or difficulty"""
    try:
        story = request.args.get('story')
        difficulty = request.args.get('difficulty')
        
        query = Question.query
        
        if story:
            query = query.filter_by(story=story)
        if difficulty:
            query = query.filter_by(difficulty=difficulty)
        
        questions = query.all()
        
        # Don't include answers in the response
        return jsonify({
            'questions': [q.to_dict(include_answer=False) for q in questions],
            'count': len(questions)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@questions_bp.route('/stories', methods=['GET'])
def get_stories():
    """Get list of unique stories"""
    try:
        stories = db.session.query(Question.story).distinct().all()
        return jsonify({
            'stories': [s[0] for s in stories]
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@questions_bp.route('/check', methods=['POST'])
def check_answer():
    """Check if submitted answer is correct"""
    try:
        data = request.get_json()
        question_id = data.get('question_id')
        answer_index = data.get('answer_index')
        
        if question_id is None or answer_index is None:
            return jsonify({'error': 'question_id and answer_index required'}), 400
        
        question = Question.query.get(question_id)
        if not question:
            return jsonify({'error': 'Question not found'}), 404
        
        is_correct = question.answer_index == answer_index
        
        return jsonify({
            'correct': is_correct,
            'correct_answer': question.answer_index,
            'explanation': question.explanation
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
