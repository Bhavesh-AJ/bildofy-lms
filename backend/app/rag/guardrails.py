def validate_context(context: str) -> str:
    """
    Basic safety guardrails for injected context.
    Prevents empty or malformed prompts.
    """

    if not context.strip():
        raise ValueError("Empty retrieval context")

    return context
