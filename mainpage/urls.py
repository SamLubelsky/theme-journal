"""
URL configuration for theme_journal project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView, RedirectView
from django.conf import settings
from django.conf.urls.static import static
from . import views
from .models import Task, TaskList
from rest_framework import routers, serializers, viewsets

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['name','taskList']

class TaskListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskList
        fields = ['name']

# class TaskListViewSet(viewsets.ModelViewSet):
#     def get_queryset(self):
#         return TaskList.objects.all().filter(owner__exact=self.request.user)
class TaskViewSet(viewsets.ModelViewSet):
    # def get_queryset(self):
    #     taskLists = TaskList.objects.filter(owner=self.request.user)
    #     tasks = taskLists[0].task_set.all()
    #     return tasks
    def get_queryset(self):
        taskLists = TaskList.objects.all().filter(owner__exact=self.request.user)
        # tasks = []
        # for taskList in taskLists:
        #     tasks += taskList.task_set.all()
        # return tasks
        print(taskLists[0])
        return taskLists[0].task_set.all()
    serializer_class=TaskSerializer

router = routers.DefaultRouter()
router.register(r'tasks', TaskViewSet)
#router.register(r'taskList',TaskListViewSet)
urlpatterns = [ 
    path('', views.MainPageView.as_view()),
    path('add/', include(router.urls), basename="Add")
]
