from functools import lru_cache
from pydantic_settings import BaseSettings
from typing import Literal


class Settings(BaseSettings):
    # App
    APP_NAME: str = "AI LMS Backend"
    APP_ENV: Literal["local", "staging", "production"] = "local"
    DEBUG: bool = False

    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # CORS
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
    ]

    # Ollama
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_TIMEOUT_SECONDS: int = 120

    # Model routing
    OFFLINE_MODEL_NAME: str = "phi3:mini"
    ONLINE_MODEL_NAME: str = "mistral:7b-instruct"

    # Payload limits (mobile safety)
    MAX_RESPONSE_KB_MOBILE: int = 256
    MAX_RESPONSE_KB_DESKTOP: int = 1024

    # Database (placeholder – wired later)
    DATABASE_URL: str = "postgresql+asyncpg://user:password@localhost:5432/lms"

    # Logging
    LOG_LEVEL: Literal["DEBUG", "INFO", "WARNING", "ERROR"] = "INFO"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    return Settings()
