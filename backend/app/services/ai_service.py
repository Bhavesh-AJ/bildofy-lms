from typing import List, Dict
from app.ai import OllamaClient, select_model
from app.schemas.common import ClientContext

ollama = OllamaClient()


def _build_chat_prompt(messages: List[Dict[str, str]]) -> str:
    """
    Converts chat history into a single prompt.
    Expected message format:
    { "role": "user" | "assistant", "content": str }
    """

    prompt_lines = [
        "You are a helpful, accurate AI tutor for school students.",
        "Follow the syllabus strictly.",
        "Do not hallucinate.",
        "Explain concepts clearly and simply.",
        "",
        "Conversation:",
    ]

    for msg in messages:
        role = msg.get("role", "user")
        content = msg.get("content", "").strip()
        if not content:
            continue
        prompt_lines.append(f"{role.capitalize()}: {content}")

    prompt_lines.append("Assistant:")

    return "\n".join(prompt_lines)


async def chat_with_ai(
    messages: List[Dict[str, str]],
    context: ClientContext,
) -> str:
    """
    Main AI chat entry point for students.
    """

    model = select_model(context)
    prompt = _build_chat_prompt(messages)

    response = await ollama.generate(
        prompt=prompt,
        model_name=model,
        temperature=0.25,
        max_tokens=900 if context.client_type == "mobile" else 1400,
    )

    return response.strip()
