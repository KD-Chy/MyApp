import logging
from typing import Any

# from django.http import HttpRequest
from django.db import DatabaseError

from account_app.models import SecurityEvent
from account_app.services.security.client_ip import get_client_ip

# Creates a dedicated secruity logger named security
security_logger = logging.getLogger("security")

# Events that the application recognizes.
KNOWN_SECURITY_EVENTS = {
    "password_reset_succeeded",
    "password_reset_failed",
    "login_succeeded",
    "login_failed",
    "rate_limit_exceeded",
    "privileged_role_changed",
    "refresh_token_revoked",
}

# Only these events are persisted in PostgreSQL
AUDIT_PERSISTED_EVENTS = KNOWN_SECURITY_EVENTS

#-----------------------------------------------------------------------------------------------------------------
# Allow only explicityly approved metadata fields (e.g. method, reason_code, throttle_scope) for each event.
# Metadata fields describe why an event happened, which rate limit was triggered, or how an action was performed.
#-----------------------------------------------------------------------------------------------------------------
SAFE_DETAIL_KEYS = {
    "password_reset_succeeded": {"method"},
    "password_reset_failed": {"reason_code"},
    "login_succeeded": {"method"},
    "login_failed": {"reason_code"},
    "rate_limit_exceeded": {"throttle_scope"},
    "privileged_role_changed": {"target_user_id"},
    "refresh_token_revoked": {"reason_code"},
}

def log_security_event(
    event: str,
    *,
    request: None,
    user_id: int | None = None,
    details: dict[str, Any] | None = None,
) -> None:
    """
    Send recognized security events to application logging
    and persist selected events in PostgreSQL.

    Never include passwords, raw tokens, reset URLs, or credentials.
    """
    if event not in KNOWN_SECURITY_EVENTS:
        raise ValueError("Unrecognized security event.")
    
    supplied_details = details or {}
    
    if not isinstance(supplied_details, dict):
        raise TypeError("Security event deatails must be a dictionary.")
    
    allowed_keys = SAFE_DETAIL_KEYS[event]
    
    safe_details = {
        key: value
        for key, value in supplied_details.items()
        if key in allowed_keys
        and isinstance(value, (str, int, float, bool, type(None)))
    }
    
    client_ip = get_client_ip(request) if request else None
        
    event_data = {
        "event": event,
        "user_id": user_id,
        "client_ip": client_ip,
        "details": safe_details,
    }

    # Destination 1: application logging.
    security_logger.info(
        "Security event: %s",
        event,
        extra={"security_event": event_data},
    )
    
    # Destination 2: persistent/continuous audit history
    if event in AUDIT_PERSISTED_EVENTS:
        try:
            SecurityEvent.objects.create(
                event=event,
                user_id=user_id,
                client_ip=client_ip,
                details=safe_details,
            )
        except DatabaseError:
            security_logger.exception(
                "Failed to persist security audit event: %s",
                event,
            )