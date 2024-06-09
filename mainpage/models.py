from django.db import models
from django.conf import settings
from django.urls import reverse
from django.contrib.auth.models import User
# Create your models here.
class Task(models.Model):
    name = models.CharField(max_length = 200)
    completed = models.BooleanField(default=False)
    taskList = models.ForeignKey('TaskList', on_delete=models.CASCADE) #maybe change this to a many to many later, for now do foreignKey so we don't have to deal with annoying shit
    
    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse('task-detail-view', args=[str(self.id)])

class TaskList(models.Model):
    name = models.CharField(max_length = 200, default="My Tasks")
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name} - {self.owner}'
    
    def get_absolute_url(self):
        return reverse('taskList-detail-view', args=[str(self.id)])

class Goal(models.Model):
    name = models.CharField(max_length = 200)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    archived = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.name} - {self.owner}'
    
    def get_absolute_url(self):
        return reverse('goal-detail-view', args=[str(self.id)])