from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth import authenticate, login

class RegisterAPI(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Пользователь успешно зарегистрирован"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginAPI(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"detail": "Логин и пароль обязательны"}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({
                "detail": "Успешный вход",
                "redirect_url": "/base",
                "id": user.id  
            }, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Неверный логин или пароль"}, status=status.HTTP_401_UNAUTHORIZED)



