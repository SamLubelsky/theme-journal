# Generated by Django 4.2.13 on 2024-07-08 16:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainpage', '0010_remove_tasklist_owner_delete_task_delete_tasklist'),
    ]

    operations = [
        migrations.RenameField(
            model_name='goalinstance',
            old_name='date_created',
            new_name='time_created',
        ),
    ]