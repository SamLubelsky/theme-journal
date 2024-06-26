from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import generics
from .serializers import GoalSerializer, UserSerializer, ThemeSerializer
from .models import Goal, Theme
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import viewsets, permissions
# Create your views here.
class MainPageView(LoginRequiredMixin, TemplateView):
    template_name = 'mainpage.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        goals = Goal.objects.filter(owner__exact=self.request.user)
        try:
            theme = self.request.user.theme
            context['theme'] = {'name': theme.name,'id': f'{theme.id}'}
        except:
            context['theme'] = {'name': "",'id': 0}
        if not(goals):
            context['goals'] = []
        else:
            context['goals'] = [{'name': goal.name, 'archived': goal.archived, 'id': f'{goal.id}'} for goal in goals]
        return context

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

class ThemeViewSet(viewsets.ModelViewSet):
    serializer_class = ThemeSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        try:
            self.request.user.theme
            return Theme.objects.filter(owner__exact=self.request.user)
        except:
            return Theme.objects.none()
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)