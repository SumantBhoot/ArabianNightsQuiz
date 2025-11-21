from app import db

class Question(db.Model):
    __tablename__ = 'questions'
    
    id = db.Column(db.Integer, primary_key=True)
    story = db.Column(db.String(100), nullable=False, index=True)
    difficulty = db.Column(db.String(20), nullable=False, index=True)
    prompt = db.Column(db.Text, nullable=False)
    options = db.Column(db.JSON, nullable=False)  # List of 4 options
    answer_index = db.Column(db.Integer, nullable=False)
    explanation = db.Column(db.Text, nullable=True)
    
    def to_dict(self, include_answer=False):
        """Convert question to dictionary for JSON response"""
        result = {
            'id': self.id,
            'story': self.story,
            'difficulty': self.difficulty,
            'prompt': self.prompt,
            'options': self.options,
            'explanation': self.explanation
        }
        if include_answer:
            result['answer_index'] = self.answer_index
        return result
