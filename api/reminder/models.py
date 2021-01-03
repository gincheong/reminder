from django.db import models

# Create your models here.

class BaseModel(models.Model):
    # 생성될 모델들에 기본적으로 추가될 추상 모델
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

# TODO 카테고리 모델 추가할 것, Task 모델에 Foriegn Key로 추가되어야 함
# class Category(BaseModel):
#     objects = models.Manager()

class Task(BaseModel):
    objects = models.Manager()

    title = models.CharField(max_length=200, null=False)
    description = models.TextField(null=True)
    task_date = models.DateField(null=True)
    # TODO Improvement, 알람 기능 복잡화(몇 분, 하루 전 알람)하려면 Boolean만 쓰면 안 됨
    alarm = models.BooleanField(default=False)
