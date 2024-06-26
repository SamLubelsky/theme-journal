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
from django.urls import path, include
from mainpage import views
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'goals', views.GoalViewSet, basename='goal')
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'themes', views.ThemeViewSet, basename='theme')
#router.register(r'goals', GoalViewSet, basename="tasks")
#router.register(r'taskList',TaskListViewSet)
urlpatterns = [ 
    path('', views.MainPageView.as_view()),
    path('', include(router.urls)),
]
