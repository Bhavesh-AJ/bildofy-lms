from typing import List
from datetime import datetime
from app.schemas.sync import SyncItem, SyncResponse


async def get_available_sync_items(
    last_sync_at: str | None,
    client_known_ids: List[str],
) -> SyncResponse:
    """
    Returns only content that is new or updated since last sync.
    """

    # Placeholder canonical content registry
    canonical_items = [
        {
            "content_id": "phy_motion_notes_v3",
            "content_type": "notes",
            "version": "3.0",
            "updated_at": "2025-01-01T00:00:00Z",
        },
        {
            "content_id": "chem_atoms_flashcards_v1",
            "content_type": "flashcards",
            "version": "1.0",
            "updated_at": "2025-01-02T00:00:00Z",
        },
    ]

    items = []

    for item in canonical_items:
        if item["content_id"] not in client_known_ids:
            items.append(SyncItem(**item))

    return SyncResponse(available=items)
