from app.ai import OllamaClient, select_model
from app.schemas.notes import NotesGenerateRequest, NotesResponse
from app.rag import build_context, validate_context

ollama = OllamaClient()


async def generate_notes(request: NotesGenerateRequest) -> NotesResponse:
    model = select_model(request.context)

    retrieved_chunks = []  # populated later via VectorRetriever
    context = build_context(retrieved_chunks)
    context = validate_context(context)

    prompt = f"""
You are an expert school teacher.
Generate concise, syllabus-aligned notes.

Subject: {request.subject}
Chapter: {request.chapter}
Difficulty: {request.difficulty}

Context:
{context}

Rules:
- Accurate
- Structured
- No hallucinations
"""

    response = await ollama.generate(
        prompt=prompt,
        model_name=model,
        temperature=0.2,
        max_tokens=1200,
    )

    return NotesResponse(
        content_id=f"{request.subject}_{request.chapter}".lower().replace(" ", "_"),
        summary=response[:500],
        pdf_url="/files/notes/sample.pdf",
        offline_ready=True,
        expires_at="2026-01-01",
    )
