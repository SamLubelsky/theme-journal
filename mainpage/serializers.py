from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Goal, Theme, Entry

class UserSerializer(serializers.HyperlinkedModelSerializer):
    goals = serializers.HyperlinkedRelatedField(view_name='goal-detail',many=True, queryset=Goal.objects.all())

    class Meta:
        model = User
        fields = ['id','username','goals']

class GoalSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    time_created = serializers.ReadOnlyField()
    class Meta:
        model = Goal
        fields = ['id','name','owner','archived','days','time_created']

class GoalInstanceSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Goal
        fields = ['id','name','owner','archived']


class ThemeSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Theme
        fields = ['id','name','owner']
    
class EntrySerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    last_updated = serializers.ReadOnlyField()
    time_created = serializers.ReadOnlyField()
    class Meta:
        model = Entry
        fields = ['title','body','id','owner','last_updated','time_created']
    