import hashlib

from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.db import transaction
from django.utils import timezone

from rest_framework_simplejwt.token_blacklist.models import (
    BlacklistedToken,
    OutstandingToken,
)

from account_app.models import PasswordResetToken


class PasswordResetService:
    """
    Handles the business logic for completing a password reset.

    This service is intentionally independent of HTTP concerns so that
    the same business logic can later be reused by:
        - API endpoints
        - administrative workflows
        - background jobs
        - security monitoring
        - future AI/risk-analysis systems
    """

    @staticmethod
    def _hash_token(raw_token: str) -> str:
        """
        Hash the raw password-reset token using SHA-256.

        The raw token must never be stored in the database.
        """
        return hashlib.sha256(
            raw_token.encode("utf-8")
        ).hexdigest()

    @staticmethod
    def _validate_password(
        password: str,
        user,
    ) -> None:
        """
        Validate the new password against Django's configured
        password validators.
        """
        validate_password(password, user=user)

    @staticmethod
    def _invalidate_refresh_tokens(user) -> None:
        """
        Blacklist all outstanding refresh tokens belonging to the user.

        This prevents previously issued refresh tokens from creating
        new access tokens after the password has been changed.
        """
        outstanding_tokens = OutstandingToken.objects.filter(
            user=user,
        ).exclude(
            blacklistedtoken__isnull=False,
        )

        for outstanding_token in outstanding_tokens:
            BlacklistedToken.objects.get_or_create(
                token=outstanding_token,
            )

    @classmethod
    @transaction.atomic
    def confirm_password_reset(
        cls,
        *,
        raw_token: str,
        new_password: str,
    ) -> None:
        """
        Complete a password reset securely.

        The entire operation runs inside one database transaction so
        that password change, token consumption, and session
        invalidation succeed or fail together.

        Raises:
            ValueError:
                If the reset token is invalid, expired, or already used.

            ValidationError:
                If the new password does not satisfy Django's
                configured password validators.
        """

        if not raw_token:
            raise ValueError("Invalid password reset request.")

        token_hash = cls._hash_token(raw_token)

        try:
            reset_token = (
                PasswordResetToken.objects
                .select_for_update()
                .select_related("user")
                .get(token_hash=token_hash)
            )
        except PasswordResetToken.DoesNotExist:
            raise ValueError(
                "Invalid or expired password reset link."
            )

        now = timezone.now()

        # Check whether the token has already been consumed.
        if reset_token.used_at is not None:
            raise ValueError(
                "This password reset link has already been used."
            )

        # Check expiration.
        if now >= reset_token.expires_at:
            raise ValueError(
                "This password reset link has expired."
            )

        user = reset_token.user

        # Validate the new password before changing anything.
        cls._validate_password(
            new_password,
            user,
        )

        # Change the password.
        user.set_password(new_password)

        user.save(
            update_fields=["password"],
        )

        # Invalidate existing refresh tokens so the user's
        # previous sessions cannot be refreshed.
        cls._invalidate_refresh_tokens(user)

        # Mark the password-reset token as consumed.
        reset_token.used_at = now

        reset_token.save(
            update_fields=["used_at"],
        )