from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class AssignmentOut(BaseModel):
    id: int
    title: str
    description: Optional[str]
    subject: Optional[str]
    due_date: Optional[datetime]

    class Config:
        orm_mode = True
