from django.db import models

class TriviaQuestion(models.Model):
    """
    Model for Trivia questions
    """	
    TYPE_OF_QUESTION = (
        ('MC', 'Multiple Choice'),
        ('TI', 'Text Input'),
        ('TF', 'True or False'),
    )

    question = models.CharField(max_length=255)
    choice_a = models.CharField(max_length=255, blank=True, null=True)
    choice_b = models.CharField(max_length=255, blank=True, null=True)
    choice_c = models.CharField(max_length=255, blank=True, null=True)
    choice_d = models.CharField(max_length=255, blank=True, null=True)
    correct_answer = models.CharField(max_length=255)
    question_type = models.CharField(max_length=2, choices=TYPE_OF_QUESTION)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.question
    

