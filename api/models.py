from django.db import models
from django.utils import timezone

# Create your models here.
class User(models.Model):
    id = models.TextField(primary_key=True)
    first_name = models.CharField(max_length=200, blank=False, null=False)
    last_name = models.CharField(max_length=200, blank=True, null=True)
    username = models.CharField(max_length=200, blank=True, null=True, unique=True)
    password = models.TextField(blank=False)

class Expense(models.Model):
    amount = models.IntegerField(null=False, blank=False)
    title = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(blank=True, null=True)
    category = models.TextField(blank=True, null=True)
    tags = models.TextField(blank=True, null=True)
    date = models.DateTimeField(default=timezone.now)
    user_created = models.ForeignKey(User, on_delete=models.CASCADE)