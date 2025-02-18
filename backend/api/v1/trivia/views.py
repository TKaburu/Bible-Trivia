from django.shortcuts import render
from rest_framework import generics
from .models import TriviaQuestion
from .serializers import TriviaQuestionSerializer

class AllQuestionsViews(generics.ListAPIView):
    """"
    View to list all the questions in the database
    """
    queryset = TriviaQuestion.objects.all()
    serializer_class = TriviaQuestionSerializer

class QuestionRetriveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    View to retrieve a single question
    """
    queryset = TriviaQuestion.objects.all()
    serializer_class = TriviaQuestionSerializer

class CreateQuestionView(generics.CreateAPIView):
    """
    View to create a new question
    """
    queryset = TriviaQuestion.objects.all()
    serializer_class = TriviaQuestionSerializer


