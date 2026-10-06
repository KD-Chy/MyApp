import hashlib
import secrets

from account_app.constants import PASSWORD_RESET_TOKEN_BYTES


def generate_password_reset_token() -> str:
    """
    Generate a cryptographically secure password-reset token.

    Returns:
        A URL-safe random token.

    Security:
        The token is generated using Python's `secrets` module,
        which is designed for security-sensitive random values.

        The raw token must never be stored in the database.
    """

    return secrets.token_urlsafe(
        PASSWORD_RESET_TOKEN_BYTES
    )


def hash_token(token: str) -> str:
    """
    Create a SHA-256 hash of a token.

    Args:
        token: The raw token.

    Returns:
        A 64-character hexadecimal SHA-256 digest.

    Raises:
        TypeError: If token is not a string.
    """

    if not isinstance(token, str):
        raise TypeError("Token must be a string.")

    return hashlib.sha256(
        token.encode("utf-8")
    ).hexdigest()