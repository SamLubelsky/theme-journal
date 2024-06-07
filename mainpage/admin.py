from django.contrib import admin
from .models import TaskList, TaskListItem
# Register your models here.
admin.site.register(TaskList)
admin.site.register(TaskListItem)