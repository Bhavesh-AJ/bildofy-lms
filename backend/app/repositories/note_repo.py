from ..models.note import Note
from .base_repo import BaseRepo
from sqlalchemy.ext.asyncio import AsyncSession


class NoteRepo(BaseRepo[Note]):
    def __init__(self):
        super().__init__(Note)

    async def create_note(self, db: AsyncSession, **kwargs):
        n = Note(**kwargs)
        return await self.create(db, n)
