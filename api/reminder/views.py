from django.db.models import Case, When, Value, IntegerField

from rest_framework import viewsets
from rest_framework.response import Response
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

    def list(self, request):
        queryset = Task.objects.all().annotate(
            date_none=Case(
                When(task_date=None, then=Value(1)),
                default=Value(0),
                output_field=IntegerField()
            )
        ).order_by('date_none', 'task_date')
        # 이른 날짜 -> 늦은 날짜 -> 날짜 입력 없음 순으로 정렬

        serializer_class = TaskSerializers(queryset, many=True)
        
        return Response(serializer_class.data)
