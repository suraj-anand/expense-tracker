from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register, name="user-register"),
    path("login/", views.login, name="user-login"),
    path("logout/", views.logout, name="user-logout"),
    path("expense/", views.expense, name="expense"),
    path("ping/", views.ping, name="health-check-view"),
    path("isAuthenticated/", views.isAuthenticated, name="isAuthenticated"),
]