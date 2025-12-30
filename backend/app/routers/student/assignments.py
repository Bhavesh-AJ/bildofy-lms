from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from ...db.session import get_db
from ...repositories.assignment_repo import AssignmentRepo
from ...schemas.assignment import AssignmentOut

router = APIRouter(prefix="/api/student/assignments", tags=["student.assignments"])
repo = AssignmentRepo()


@router.get("/", response_model=list[AssignmentOut])
async def list_assignments(db: AsyncSession = Depends(get_db)):
    rows = await repo.list(db)
    return rows
