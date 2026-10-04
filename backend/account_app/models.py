from django.contrib.auth.models import AbstractUser
from django.db import models

import hashlib
import secrets
from django.conf import settings
from django.utils import timezone

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
    
class PasswordResetToken(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="password_reset_tokens",
    )

    token_hash = models.CharField(
        max_length=64,
        unique=True,
        db_index=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    expires_at = models.DateTimeField()

    used_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    def is_valid(self):
        return (
            self.used_at is None
            and timezone.now() < self.expires_at
        )

    @staticmethod
    def generate_token():
        """
        Generate a cryptographically secure random token.
        The raw token is sent to the user.
        Only its SHA-256 hash is stored in the database.
        """
        raw_token = secrets.token_urlsafe(48)

        token_hash = hashlib.sha256(
            raw_token.encode("utf-8")
        ).hexdigest()

        return raw_token, token_hash

    def __str__(self):
        return f"Password reset token for {self.user.username}"