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
from .models import Task, TaskList, Goal
from rest_framework import routers, serializers, viewsets, generics
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

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
# class TaskViewSet(viewsets.ModelViewSet):
#     # def get_queryset(self):
#     #     taskLists = TaskList.objects.filter(owner=self.request.user)
#     #     tasks = taskLists[0].task_set.all()
#     #     return tasks
#     queryset = TaskList.objects.all()
#     def get_queryset(self):
#         qs = super().get_queryset()
#         taskLists = TaskList.objects.all().filter(owner__exact=self.request.user).map(lambda x: qs.union(x))
#         # for taskList in taskLists:
#         #     qs.union(taskList.task_set.all())
#         return qs
#     serializer_class=TaskSerializer



# class GoalViewSet(viewsets.ModelViewSet):
#     serializer_class=GoalSerializer
#     def get_queryset(self):
#         return Goal.objects.filter(owner__exact=self.request.user)
#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)
#     permission_classes=[IsAuthenticated]


router = routers.DefaultRouter()
#router.register(r'goals', GoalViewSet, basename="tasks")
#router.register(r'taskList',TaskListViewSet)
urlpatterns = [ 
    path('', views.MainPageView.as_view()),
    #path('add/', include(router.urls)),
    path('goals/', views.GoalList.as_view(), name='goal-list'),
    path('goal/<int:pk>', views.GoalDetail.as_view(), name='goal-detail'),
    path('users/', views.UserList.as_view(), name='user-list'),
    path('user/<int:pk>', views.UserDetail.as_view(), name='user-detail'),
    path('', views.api_root)

]
