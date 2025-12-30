from app.services.notes_service import generate_notes
from app.services.pdf_generator import generate_notes_pdf


async def generate_notes_pdf_job(payload):
    """
    Background job for:
    1. Generating notes using AI
    2. Rendering notes into a PDF
    """

    notes_response = await generate_notes(payload)

    pdf_buffer = generate_notes_pdf(
        title="Generated Notes",
        subject=payload.subject,
        chapter=payload.chapter,
        content=notes_response.summary,
    )

    return {
        "content_id": notes_response.content_id,
        "pdf_ready": True,
    }
