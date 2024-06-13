from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from .models import TaskList
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import generics
from .serializers import GoalSerializer, UserSerializer
from .models import Goal
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import viewsets, permissions
# Create your views here.
data = [
  {'id': "todo-0", 'name':"Eat", 'completed':True},
  {'id': "todo-1", 'name':"Sleep", 'completed':False},
  {'id': "todo-2", 'name':"Repeat", 'completed':False},
]
class MainPageView(LoginRequiredMixin, TemplateView):
    template_name = 'mainpage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        goals = Goal.objects.filter(owner__exact=self.request.user)
        if not(goals):
            context['goals'] = []
            return context
        context['goals'] = [{'name': goal.name, 'archived': goal.archived, 'id': f'{goal.id}'} for goal in goals]
        return context
    
# class GoalList(generics.ListCreateAPIView):
#     def get_queryset(self):
#         return Goal.objects.filter(owner__exact=self.request.user)
#     serializer_class=GoalSerializer

# class GoalDetail(generics.RetrieveUpdateDestroyAPIView):
#     def get_queryset(self):
#         return Goal.objects.all().filter(owner__exact=self.request.user)
#     serializer_class = GoalSerializer

# class UserList(generics.ListAPIView):
#     queryset=User.objects.all()
#     serializer_class = UserSerializer


# class UserDetail(generics.RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GoalViewSet(viewsets.ModelViewSet):
    serializer_class = GoalSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Goal.objects.filter(owner__exact=self.request.user)
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)