# Generated by Django 4.2.7 on 2024-01-13 18:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_fisrt_name_user_first_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.TextField(primary_key=True, serialize=False),
        ),
    ]
