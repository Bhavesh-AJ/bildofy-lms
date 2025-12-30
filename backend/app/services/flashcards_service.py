from app.ai import OllamaClient, select_model
from app.schemas.flashcards import FlashcardSetResponse
from app.schemas.common import ClientContext

ollama = OllamaClient()


async def generate_flashcards(
    subject: str,
    chapter: str,
    context: ClientContext,
) -> FlashcardSetResponse:
    model = select_model(context)

    prompt = f"""
Generate high-quality flashcards.

Subject: {subject}
Chapter: {chapter}

Rules:
- Short
- Fact-based
- Exam-focused
"""

    response = await ollama.generate(
        prompt=prompt,
        model_name=model,
        temperature=0.3,
        max_tokens=800,
    )

    cards = [
        {"front": line.split(" - ")[0], "back": line.split(" - ")[1]}
        for line in response.split("\n")
        if " - " in line
    ]

    return FlashcardSetResponse(
        set_id=1,
        subject=subject,
        chapter=chapter,
        cards=cards,
    )
