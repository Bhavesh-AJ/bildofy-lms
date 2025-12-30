from fastapi import Request
from app.logging.logger import logger
import time


async def logging_middleware(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = int((time.time() - start_time) * 1000)

    logger.info(
        f"{request.method} {request.url.path} "
        f"{response.status_code} {duration}ms"
    )

    return response
