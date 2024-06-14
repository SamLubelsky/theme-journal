# Generated by Django 4.2.13 on 2024-06-10 16:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('mainpage', '0004_goal'),
    ]

    operations = [
        migrations.AlterField(
            model_name='goal',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='goals', to=settings.AUTH_USER_MODEL),
        ),
    ]