from pydantic import BaseModel
from typing import List


class Flashcard(BaseModel):
    front: str
    back: str


class FlashcardSetResponse(BaseModel):
    set_id: int
    subject: str
    chapter: str
    cards: List[Flashcard]
