from django.urls import path
from .views import *

urlpatterns = [
    path('questions/', AllQuestionsViews.as_view(), name='all-questions'),
    path('question/<int:pk>/', QuestionRetriveUpdateDestroyView.as_view(), name='question-detail'),
    path('create-question/', CreateQuestionView.as_view(), name='create-question'),

]