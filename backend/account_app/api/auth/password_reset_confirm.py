from django.core.exceptions import ValidationError

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from account_app.services.password_reset_service import (
    PasswordResetService,
)


@api_view(["POST"])
def password_reset_confirm(request):
    """
    Confirm a password reset using a valid password-reset token.
    """

    token = request.data.get("token")
    new_password = request.data.get("new_password")
    confirm_password = request.data.get("confirm_password")

    if not token:
        return Response(
            {
                "detail": "Invalid password reset request.",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    if not new_password or not confirm_password:
        return Response(
            {
                "detail": "Both password fields are required.",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    if new_password != confirm_password:
        return Response(
            {
                "detail": "Passwords do not match.",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        PasswordResetService.confirm_password_reset(
            raw_token=token,
            new_password=new_password,
        )

    except ValidationError:
        return Response(
            {
                "detail": (
                    "The new password does not meet the "
                    "required security requirements."
                ),
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    except ValueError as exc:
        return Response(
            {
                "detail": str(exc),
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    return Response(
        {
            "detail": "Your password has been reset successfully.",
        },
        status=status.HTTP_200_OK,
    )