from django.contrib import admin
from .models import Task

# Register your models here.

# Below Models will be shown in '/admin'
admin.site.register(Task)
