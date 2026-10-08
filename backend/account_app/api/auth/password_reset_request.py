import hashlib

from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from account_app.models import CustomUser, PasswordResetToken


from account_app.constants.constants import RESET_TOKEN_LIFETIME


@csrf_exempt
@require_POST
def password_reset_request(request):
    """
    Request a password reset link.

    Security properties:
    - Does not reveal whether an account exists.
    - Generates a cryptographically secure token.
    - Stores only the token hash.
    - Invalidates previous unused reset tokens.
    """

    import json

    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, TypeError):
        return JsonResponse(
            {
                "message": (
                    "If an account matches the information provided, "
                    "you will receive a password reset link shortly."
                )
            },
            status=200,
        )

    email = str(data.get("email", "")).strip().lower()

    generic_message = (
        "If an account matches the information provided, "
        "you will receive a password reset link shortly."
    )

    if not email:
        return JsonResponse(
            {"message": generic_message},
            status=200,
        )

    try:
        user = CustomUser.objects.get(
            email__iexact=email,
            is_active=True,
        )
    except CustomUser.DoesNotExist:
        # Deliberately return the same response.
        return JsonResponse(
            {"message": generic_message},
            status=200,
        )

    # Invalidate previous unused reset tokens.
    PasswordResetToken.objects.filter(
        user=user,
        used_at__isnull=True,
    ).update(
        used_at=timezone.now()
    )

    raw_token, token_hash = PasswordResetToken.generate_token()

    PasswordResetToken.objects.create(
        user=user,
        token_hash=token_hash,
        expires_at=timezone.now() + RESET_TOKEN_LIFETIME,
    )

    frontend_url = getattr(
        settings,
        "FRONTEND_URL",
        "http://localhost:5173",
    )

    reset_url = (
        f"{frontend_url}/reset-password/{raw_token}"
    )

    send_mail(
        subject="Reset your password",
        message=(
            "We received a request to reset your password.\n\n"
            f"Reset your password using this link:\n\n"
            f"{reset_url}\n\n"
            f"This link expires in {RESET_TOKEN_LIFETIME.total_seconds() / 60:.0f} minutes and can only be used once.\n\n"
            "If you did not request this, you can safely ignore this email."
        ),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )

    return JsonResponse(
        {"message": generic_message},
        status=200,
    )