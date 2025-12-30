import time
from fastapi import HTTPException, Request

# Simple in-memory rate limiter (replace with Redis in production)
RATE_LIMIT = 30  # requests
WINDOW_SECONDS = 60

_client_requests: dict[str, list[float]] = {}


def rate_limit(request: Request) -> None:
    client_ip = request.client.host
    now = time.time()

    timestamps = _client_requests.get(client_ip, [])
    timestamps = [t for t in timestamps if now - t < WINDOW_SECONDS]

    if len(timestamps) >= RATE_LIMIT:
        raise HTTPException(
            status_code=429,
            detail="Too many requests. Please try again later.",
        )

    timestamps.append(now)
    _client_requests[client_ip] = timestamps
