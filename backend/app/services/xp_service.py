from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.progress import Progress


# XP rules (authoritative, backend-only)
XP_RULES = {
    "TEST_COMPLETED": 100,
    "ASSIGNMENT_SUBMITTED": 75,
    "NOTES_GENERATED": 40,
    "FLASHCARDS_REVIEWED": 30,
    "AI_CHAT_INTERACTION": 10,
    "DAILY_STREAK_BONUS": 50,
}


def calculate_level(xp: int) -> int:
    """
    Simple level curve:
    Level increases every 500 XP.
    """
    return max(1, xp // 500 + 1)


async def apply_xp_event(
    db: AsyncSession,
    user_id: int,
    event: str,
) -> Progress:
    """
    Applies XP for a given event and updates user progress.
    """

    xp_gain = XP_RULES.get(event)
    if xp_gain is None:
        raise ValueError(f"Unknown XP event: {event}")

    result = await db.execute(
        select(Progress).where(Progress.user_id == user_id)
    )
    progress = result.scalar_one_or_none()

    if progress is None:
        progress = Progress(
            user_id=user_id,
            xp=0,
            level=1,
            stats={},
        )
        db.add(progress)

    progress.xp += xp_gain
    progress.level = calculate_level(progress.xp)

    await db.commit()
    await db.refresh(progress)

    return progress
