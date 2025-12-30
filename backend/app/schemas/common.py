from pydantic import BaseModel
from typing import Literal, Optional


class ClientContext(BaseModel):
    client_type: Literal["mobile", "desktop"]
    connectivity: Literal["online", "offline"]
    model_capability: Literal["light", "heavy"]
    cache_allowed: bool = True
    max_payload_kb: Optional[int] = None
