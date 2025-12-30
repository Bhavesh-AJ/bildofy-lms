from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.schemas.notes import NotesGenerateRequest, NotesResponse
from app.services.notes_service import generate_notes
from app.services.xp_service import apply_xp_event

router = APIRouter(prefix="/api/student/notes", tags=["Student Notes"])


@router.post("/generate", response_model=NotesResponse)
async def generate_notes_endpoint(
    payload: NotesGenerateRequest,
    db: AsyncSession = Depends(get_db),
):
    response = await generate_notes(payload)
    await apply_xp_event(db, user_id=1, event="NOTES_GENERATED")
    return response
