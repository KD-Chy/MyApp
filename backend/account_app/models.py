from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

# Inherits built-in AbstractUser
class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        # First value = stored in database,
        # second value = displayed in django forms
        ("superadmin", "SuperAdmin"),
        
        # If a user has the role Admin,
        # the database stores the "admin" in the role field
        ("admin", "Admin"),
        ("user", "User"),
    ]
    
    # Defines the allowed values for role field
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="user"
    )
    
    # Defines how the object should be displayed as a string.
    # Without it, prints CustomUser object (1)
    # With it, prints karan as a username
    def __str__(self):
        return self.username