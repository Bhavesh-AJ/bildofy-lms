from pydantic import BaseModel
from typing import List, Optional


class SyncItem(BaseModel):
    content_id: str
    content_type: str  # notes | flashcards | tests
    version: str
    updated_at: str


class SyncRequest(BaseModel):
    last_sync_at: Optional[str] = None
    client_known_ids: List[str] = []


class SyncResponse(BaseModel):
    available: List[SyncItem]
