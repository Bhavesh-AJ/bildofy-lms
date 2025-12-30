from fastapi import HTTPException
from app.schemas.common import ClientContext


def enforce_client_capabilities(context: ClientContext) -> None:
    """
    Prevents misuse of heavy models or server-only features.
    """

    if context.connectivity == "offline" and context.model_capability == "heavy":
        raise HTTPException(
            status_code=400,
            detail="Heavy model access not allowed in offline mode",
        )
