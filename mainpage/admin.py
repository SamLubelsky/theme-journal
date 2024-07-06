from django.contrib import admin
from .models import Entry, Goal, Theme, GoalInstance
# Register your models here.
admin.site.register(Goal)
admin.site.register(GoalInstance)
admin.site.register(Theme)
admin.site.register(Entry)