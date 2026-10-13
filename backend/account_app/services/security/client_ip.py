from django.http import HttpRequest


def get_client_ip(request: HttpRequest) -> str | None:
    """
    Return the direct peer IP address.

    This is safe as a default when Django receives connections
    directly from clients. Behind a proxy, configure trusted-proxy
    handling before using forwarded IP headers.
    """
    return request.META.get("REMOTE_ADDR") or None