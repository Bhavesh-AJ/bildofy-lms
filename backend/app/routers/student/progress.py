from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.session import get_db
from app.models.progress import Progress

router = APIRouter(prefix="/api/student/progress", tags=["Student Progress"])


@router.get("/")
async def get_progress(
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Progress).where(Progress.user_id == 1))
    progress = result.scalar_one_or_none()

    return progress or {"xp": 0, "level": 1, "stats": {}}
