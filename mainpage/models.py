from django.db import models
from django.conf import settings
from django.urls import reverse
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.
class Goal(models.Model):
    name = models.CharField(max_length = 200)
    owner = models.ForeignKey(User, related_name='goals',on_delete=models.CASCADE)
    archived = models.BooleanField(default=False)
    days = models.JSONField(default=dict)
    time_created = models.DateField(default=timezone.now)
    def __str__(self):
        return f'{self.name} - {self.owner}'
    
    def get_absolute_url(self):
        return reverse('goal-detail-view', args=[str(self.id)])
    
class Theme(models.Model):
    name = models.CharField(max_length = 200)
    owner = models.OneToOneField(User, related_name='theme', on_delete=models.CASCADE)
    def __str__(self):
        return self.name

class Entry(models.Model):
    title = models.CharField(max_length=200, null=True, blank=True)
    body = models.TextField(max_length = 10000, null=True, blank=True)
    owner = models.ForeignKey(User, related_name='entries',on_delete=models.CASCADE, null=True)
    time_created = models.DateTimeField(default=timezone.now)
    last_updated = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering= ['-time_created']

