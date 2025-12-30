from typing import List


class VectorRetriever:
    """
    Abstract retriever interface.
    Concrete implementations can use FAISS, pgvector, etc.
    """

    async def retrieve(self, query: str, limit: int = 5) -> List[str]:
        raise NotImplementedError("Vector retrieval not implemented")
