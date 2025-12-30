from app.schemas.common import ClientContext
from app.config import get_settings

settings = get_settings()


def select_model(context: ClientContext) -> str:
    """
    Determines which model to use based on client capabilities.
    """

    # Offline or light-capability clients always use the lightweight model
    if context.connectivity == "offline" or context.model_capability == "light":
        return settings.OFFLINE_MODEL_NAME

    # Online + heavy-capability clients use the server-grade model
    return settings.ONLINE_MODEL_NAME
