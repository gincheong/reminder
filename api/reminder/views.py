from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import TaskSerializers
from .models import Task

# Create your views here.

# Viewsets for rest_framework
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializers

    filter_backends = (DjangoFilterBackend, )
    filter_fields = ('title', 'description', )

    # TODO get_queryset 함수를 커스텀해서, description만 검색해도
    # 검색결과를 반환할 수 있게 함