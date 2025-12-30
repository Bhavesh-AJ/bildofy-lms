from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.sql import func
from app.db.session import Base


class Test(Base):
    __tablename__ = "tests"

    id = Column(Integer, primary_key=True)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)

    title = Column(String(255), nullable=False)
    subject = Column(String(100), nullable=False)
    difficulty = Column(String(20), nullable=False)

    questions = Column(JSON, nullable=False)
    total_marks = Column(Integer, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
