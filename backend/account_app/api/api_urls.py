from django.urls import path
from .login import login_api
from .signup import signup_api
from .auth.password_reset_request import password_reset_request

# automatically added for testing
from .auth.password_reset_confirm import password_reset_confirm
# from .logout import logout_api
 
urlpatterns = [
    path('login/', login_api, name='api_login'),
    path('signup/', signup_api, name='api_signup'),
    # path('api/logout/', logout_api, name='api_logout'),
    
    path(
        "auth/password-reset/request/",
        password_reset_request,
        name="password_reset_request",
    ),
    
    path(
        "auth/password-reset/confirm/",
        password_reset_confirm,
        name="password_reset_confirm",
    ),
]