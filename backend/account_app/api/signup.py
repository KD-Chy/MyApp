from django.contrib.auth import get_user_model;
from django.core.validators import validate_email;
from django.core.exceptions import ValidationError;
from django.http import JsonResponse;
from django.views.decorators.csrf import csrf_exempt;
import json;
User = get_user_model()
@csrf_exempt
def signup_api(request):
    if request.method != 'POST':
        return JsonResponse(
            {'error': '00000000Invalid request method'},
            status=405
        )
    # If invalid json is sent,this can raise an exception, so we need to handle it gracefully.
    try:
        data = json.loads(request.body) # Convert JSON string (bytes) to Python dictionary.
    except json.JSONDecodeError:
        return JsonResponse(
            {'error': 'Invalid JSON data'},
            status=400
        )
    
    first_name = data.get('firstName').strip()
    last_name = data.get('lastName').strip()
    username = data.get('username').strip()
    password = data.get('password')
    confirm_password = data.get('confirmPassword')
    accepted_terms = data.get('acceptTerms', False)
    
    # Checks required fields
    if not first_name or not last_name or not username or not password or not confirm_password:
        return JsonResponse(
            {'error': 'All fields are required'},
            status=400
        )
        
    # Email validation
    try:
        validate_email(username)
    except ValidationError:
        return JsonResponse(
            {'error': 'Please enter a valid email address'},
            status=400
        )
        
    # Checks terms acceptance
    if not accepted_terms:
        return JsonResponse(
            {'error': 'You must have to accept Terms of Service and Security Policy'},
            status=400
        )
        
    # Checks password confirmation
    if password != confirm_password:
        return JsonResponse(
            {'error': 'Passwords do not match'},
            status=400
        )
    
    # checks username/email uniqueness
    if User.objects.filter(username=username).exists():
        return JsonResponse(
            {'error': 'Username already exists'},
            status=400
        )
        
    # Creates user and saves it to the database
    user = User.objects.create_user(
        username=username,
        email=username,
        password=password,
        first_name=first_name,
        last_name=last_name
    )
    
    return JsonResponse(
        {'message': 'Account created successfully'},
        status=201
    )