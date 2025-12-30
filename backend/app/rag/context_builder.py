from typing import List


def build_context(chunks: List[str], max_tokens: int = 1500) -> str:
    """
    Builds a bounded context string from retrieved chunks.
    Hard token budgeting to prevent prompt overflow.
    """

    context = []
    token_estimate = 0

    for chunk in chunks:
        chunk_tokens = len(chunk.split())
        if token_estimate + chunk_tokens > max_tokens:
            break
        context.append(chunk)
        token_estimate += chunk_tokens

    return "\n\n".join(context)
