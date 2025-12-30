from pydantic import BaseModel


class ProgressResponse(BaseModel):
    xp: int
    level: int
    stats: dict | None = None
