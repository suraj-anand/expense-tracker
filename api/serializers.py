from rest_framework.serializers import ModelSerializer
from .models import User, Expense

class UserSerializer(ModelSerializer):
    class Meta:
        fields = "__all__"
        model = User

class ExpenseSerializer(ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Expense