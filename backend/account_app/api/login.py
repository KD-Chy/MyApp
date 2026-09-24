from django.contrib.auth import authenticate, get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import models
import json
# from rest_framework.decorators import api_view

User = get_user_model()


@csrf_exempt
# @api_view(['POST'])
def login_api(request):
    
    if request.method != 'POST':
        return JsonResponse(
            {'error': 'Invalid request method'},
            status=405
        )
    
    # Safely read JSON means parsing the JSON body of the request
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse(
            {'error': 'Invalid JSON data'},
            status=400
        )
    username = data.get('username').strip()
    password = data.get('password')

    # Checks required fields
    if not username or not password:
        return JsonResponse(
            {'error': 'Username and password are required'},
            status=400
        )
    
    # Checks whether the account is exist in the database or not.
    if not User.objects.filter(username=username).exists():
        return JsonResponse(
            {'error': "Register your account, then try again"},
            status=404
        )
    

    # Authenticate user
    user = authenticate(
        username=username,
        password=password
    )

    if user is None:
        return JsonResponse(
            {'error': 'Invalid credentials'},
            status=401
        )

    # Generate JWT tokens for the authenticated user
    refresh = RefreshToken.for_user(user)
    
    return JsonResponse({
        'message': 'Login successful',
        'access': str(refresh.access_token),
        'refresh': str(refresh),
        'role': user.role,
        'username': user.username,
        'first_name': user.first_name,
        "last_name": user.last_name
    },
    status=200
)