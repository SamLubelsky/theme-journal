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

# Create your views here.
data = [
  {'id': "todo-0", 'name':"Eat", 'completed':True},
  {'id': "todo-1", 'name':"Sleep", 'completed':False},
  {'id': "todo-2", 'name':"Repeat", 'completed':False},
]
class MainPageView(LoginRequiredMixin, TemplateView):
    template_name = 'mainpage.html'

    def get_context_data(self, **kwargs):
        #return {}
        context = super().get_context_data(**kwargs)
        taskLists = TaskList.objects.filter(owner=self.request.user)
        if not(taskLists):
            context['tasks'] = []
            return context
        tasks = taskLists[0].task_set.all()
        context['tasks'] = [{'name': task.name, 'completed': task.completed, 'id': f'todo-{task.id}'} for task in tasks]
        return context
    
class GoalList(generics.ListCreateAPIView):
    def get_queryset(self):
        return Goal.objects.filter(owner__exact=self.request.user)
    serializer_class=GoalSerializer

class GoalDetail(generics.RetrieveUpdateDestroyAPIView):
    def get_queryset(self):
        return Goal.objects.all().filter(owner__exact=self.request.user)
    serializer_class = GoalSerializer

class UserList(generics.ListAPIView):
    queryset=User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'snippets': reverse('goal-list', request=request, format=format)
    })