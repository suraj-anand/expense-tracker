# Generated by Django 4.2.7 on 2024-01-13 19:31

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_expense_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
