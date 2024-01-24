import os
import jwt
import logging
import uuid
import bcrypt
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from server.settings import env
from .serializers import UserSerializer, ExpenseSerializer
from .models import User, Expense

def authenticated_resource(func):
    def wrapper(request, *args, **kwargs):
        if request.session.get("isAuthenticated"):
            try:
                encoded_payload = jwt.decode(request.session.get("token"), env.get("jwt-secret"), algorithms="HS256")
                return func(request, *args, **kwargs)
            except Exception as err:
                return Response({"error": "Unauthorized request"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Unauthorized request"}, status=status.HTTP_400_BAD_REQUEST)
    return wrapper

@api_view(["GET"])
def isAuthenticated(request):
    try:
        encoded_payload = jwt.decode(request.session.get("token"), env.get("jwt-secret"), algorithms="HS256")
        if request.session.get("isAuthenticated"):
            return Response({"message": "Authencticated"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as err:
        print("here")
        logging.error(f"Error: {err}")
        return Response({"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(["POST"])
def register(request):
    first_name = request.data.get("first_name")
    last_name = request.data.get("last_name", "")
    username = request.data.get("username")
    password = request.data.get("password")
    
    try:
        if first_name is None or username is None or password is None:
            return Response({"error": 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)

        salt = bcrypt.gensalt(10)
        encoded_password = password.encode()
        hashed_password = bcrypt.hashpw(encoded_password, salt)
        
        data = {
            "id": f"{uuid.uuid4()}",
            "first_name": first_name,
            "last_name": last_name,
            "username": username,
            "password": hashed_password.decode()
        }

        serializer = UserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        token = jwt.encode({"userId": data.get("id")}, env.get("jwt-secret"), algorithm="HS256")
        request.session["token"] = token
        request.session["isAuthenticated"] = True
        request.session["userId"] = data.get("id")

        return Response({"message": "User Created", "token": token}, status=status.HTTP_201_CREATED)
    except Exception as err:
        return Response({"error": "server error", "error": f"{err}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["POST"])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    
    try:
        if username is None or password is None:
            return Response({"error": 'Invalid response'}, status=status.HTTP_401_UNAUTHORIZED)
        
        user = User.objects.filter(username=username).first()
        if not user:
            return Response({"error": "invalid username"}, status=status.HTTP_401_UNAUTHORIZED)

        stored_hash = user.password
        check_pw_result = bcrypt.checkpw(password.encode(), stored_hash.encode())
        if check_pw_result:
            token = jwt.encode({"userId": user.id}, env.get("jwt-secret"), algorithm="HS256")
            request.session["token"] = token
            request.session["isAuthenticated"] = True
            request.session["userId"] = user.id
            return Response({ "message": "Login Success", "token": token }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as err:
        return Response({"error": "server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@authenticated_resource
def logout(request):
    try:
        del request.session["isAuthenticated"];
        del request.session["userId"];
        return Response({"message": "user logged out"}, status=status.HTTP_200_OK)
    except Exception as err:
        return Response({"error": "server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET", "POST", "PUT", "DELETE"])
@authenticated_resource
def expense(request):
    try:
        if request.method == "GET":
            user_id = request.session.get("userId")
            print(user_id)
            expenses = Expense.objects.filter(user_created=user_id)
            serializer = ExpenseSerializer(expenses, many=True)
            print(serializer.data)
            return Response({"result": serializer.data }, status=status.HTTP_201_CREATED)

        elif request.method == "POST":
            data = {
                    "amount" : request.data.get("amount"),
                    "title" : request.data.get("title"),
                    "description" : request.data.get("description", ""),
                    "date" : request.data.get("date"),
                    "tags" : request.data.get("tags", ""),
                    "category" : request.data.get("category", ""),
                    "user_created": request.session.get("userId")
            }

            if data.get("title") is None or data.get("amount") is None or data.get("date") is None:
                return Response({"error": "title, amount, date is required"}, status=status.HTTP_400_BAD_REQUEST)

            serializer = ExpenseSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            saved_data = serializer.save()
            return Response({"message": "expense created", "expenseId": saved_data.id }, status=status.HTTP_201_CREATED)
        
        elif request.method == "PUT":
            data = {
                "expenseId": request.data.get("expenseId"),
                "amount" : request.data.get("amount"),
                "title" : request.data.get("title"),
                "description" : request.data.get("description", ""),
                "date" : request.data.get("date"),
                "tags" : request.data.get("tags", ""),
                "category" : request.data.get("category", ""),
            }
            if not data.get("expenseId"):
                return Response({"error": "expenseId is required"}, status=status.HTTP_400_BAD_REQUEST)
            expense = Expense.objects.get(id=data.get("expenseId"))
            serializer = ExpenseSerializer(expense, data=data, partial=True)
            serializer.is_valid(raise_exception=True)
            saved_data = serializer.save()
            return Response({"message": f"expense {data.get('expenseId')} has been updated"}, status=status.HTTP_201_CREATED)

        elif request.method == "DELETE":
            data = {
                "expenseId": request.query_params.get("expenseId")
            }
            expense = Expense.objects.filter(id=data.get("expenseId")).first()
            if not expense:
                return Response({"error": "Invalid expense id"}, status=status.HTTP_400_BAD_REQUEST)
            expense.delete()
            return Response({"message": "expense deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

    except Exception as err:
        logging.error(f"failed on storing expense, error: {err}")
        return Response({"error": "server error", "error_message": f"{err}"}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["GET", "POST"])
def ping(request):
    return Response({"message": "Pong!"})