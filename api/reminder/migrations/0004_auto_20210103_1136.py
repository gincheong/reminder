# Generated by Django 3.1 on 2021-01-03 11:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reminder', '0003_auto_20201228_1712'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='task_date',
            field=models.DateField(null=True),
        ),
    ]