from rest_framework import serializers
from .models import TriviaQuestion

class TriviaQuestionSerializer(serializers.ModelSerializer):
    """
    Trivia Serializer
    """
    class Meta:
        model = TriviaQuestion
        exclude = ['created_at', 'updated_at']

