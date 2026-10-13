# This file rate_limits.py helps protect our login, signup, and
# password-reset endpoints from excessive requests.

from rest_framework.throttling import SimpleRateThrottle
# Limits reset-email requests
class ScopedIPRateThrottle(SimpleRateThrottle):
    """Apply a configured rate limit per client IP address."""

    def get_cache_key(self, request, view):
        return self.cache_format % {
            "scope": self.scope,
            "ident": self.get_ident(request),
        }
class PasswordResetRequestThrottle(ScopedIPRateThrottle):
    """
    Applies the configured password-reset request rate.
    """
    scope = "password_reset_request"

# Limits reset confirmations
class PasswordResetConfirmThrottle(ScopedIPRateThrottle):
    """
    Applies the configured password-reset confirmation rate.
    """
    scope = "password_reset_confirm"
    
# Limits login requests
class LoginThrottle(ScopedIPRateThrottle):
    """
    Applies the configured login rate.
    """
    scope = "login"

# Limits signup requests
class SignupThrottle(ScopedIPRateThrottle):
    """
    Applies the configured signup rate.
    """
    scope = "signup"