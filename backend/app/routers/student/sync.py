from fastapi import APIRouter
from app.schemas.sync import SyncRequest, SyncResponse
from app.services.sync_service import get_available_sync_items

router = APIRouter(prefix="/api/student/sync", tags=["Student Sync"])


@router.post("/available", response_model=SyncResponse)
async def available_sync_items(payload: SyncRequest):
    return await get_available_sync_items(
        last_sync_at=payload.last_sync_at,
        client_known_ids=payload.client_known_ids,
    )
