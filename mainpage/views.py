from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from .models import TaskList
from django.contrib.auth.mixins import LoginRequiredMixin
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
        taskList = TaskList.objects.filter(owner=self.request.user)[0]
        tasks = taskList.tasklistitem_set.all()
        context = super().get_context_data(**kwargs)
        context['tasks'] = [{'name': task.name, 'completed': task.completed, 'id': f'todo-{task.id}'} for task in tasks]
        return context