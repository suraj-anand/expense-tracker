# Generated by Django 4.2.7 on 2024-01-13 16:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='fisrt_name',
            new_name='first_name',
        ),
    ]
