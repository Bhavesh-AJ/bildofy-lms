from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.sql import func
from app.db.session import Base


class FlashcardSet(Base):
    __tablename__ = "flashcard_sets"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    subject = Column(String(100), nullable=False)
    chapter = Column(String(200), nullable=False)

    cards = Column(JSON, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
