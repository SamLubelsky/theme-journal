# Generated by Django 4.2.13 on 2024-06-07 21:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainpage', '0002_rename_checked_tasklistitem_completed'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='TaskListItem',
            new_name='Task',
        ),
    ]