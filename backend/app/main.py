from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from uuid import uuid4
import time

from app.config import get_settings
from app.routers.student import (
    notes_router,
    flashcards_router,
    tests_router,
    ai_chat_router,
    progress_router,
)

app.include_router(notes_router)
app.include_router(flashcards_router)
app.include_router(tests_router)
app.include_router(ai_chat_router)
app.include_router(progress_router)

settings = get_settings()


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        debug=settings.DEBUG,
        version="1.0.0",
    )

    # -------------------------
    # Middleware
    # -------------------------

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.add_middleware(
        GZipMiddleware,
        minimum_size=500
    )

    # -------------------------
    # Request ID + Timing
    # -------------------------

    @app.middleware("http")
    async def add_request_id_and_timing(request: Request, call_next):
        request_id = request.headers.get("X-Request-ID", str(uuid4()))
        start_time = time.time()

        response = await call_next(request)

        duration_ms = int((time.time() - start_time) * 1000)
        response.headers["X-Request-ID"] = request_id
        response.headers["X-Response-Time-ms"] = str(duration_ms)

        return response

    # -------------------------
    # Health & Meta
    # -------------------------

    @app.get("/health", tags=["System"])
    async def health_check():
        return {
            "status": "ok",
            "env": settings.APP_ENV
        }

    @app.get("/version", tags=["System"])
    async def version():
        return {
            "app": settings.APP_NAME,
            "version": "1.0.0"
        }

    # -------------------------
    # Global Error Handler
    # -------------------------

    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception):
        return JSONResponse(
            status_code=500,
            content={
                "error": "internal_server_error",
                "message": str(exc),
            },
        )

    return app


app = create_app()
