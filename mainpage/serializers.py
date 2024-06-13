from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Goal

class UserSerializer(serializers.HyperlinkedModelSerializer):
    goals = serializers.HyperlinkedRelatedField(view_name='goal-detail',many=True, queryset=Goal.objects.all())

    class Meta:
        model = User
        fields = ['id','username','goals']

class GoalSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Goal
        fields = ['id','name','owner','archived']
