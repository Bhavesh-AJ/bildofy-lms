from io import BytesIO
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT


def generate_notes_pdf(
    title: str,
    subject: str,
    chapter: str,
    content: str,
) -> BytesIO:
    """
    Generates a PDF for AI-generated notes and returns an in-memory buffer.
    """

    buffer = BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=1 * inch,
        leftMargin=1 * inch,
        topMargin=1 * inch,
        bottomMargin=1 * inch,
    )

    styles = getSampleStyleSheet()

    styles.add(
        ParagraphStyle(
            name="TitleStyle",
            fontSize=18,
            spaceAfter=16,
            alignment=TA_LEFT,
        )
    )

    styles.add(
        ParagraphStyle(
            name="BodyStyle",
            fontSize=11,
            leading=15,
            spaceAfter=10,
        )
    )

    story = []

    story.append(Paragraph(title, styles["TitleStyle"]))
    story.append(Spacer(1, 0.2 * inch))

    story.append(Paragraph(f"<b>Subject:</b> {subject}", styles["BodyStyle"]))
    story.append(Paragraph(f"<b>Chapter:</b> {chapter}", styles["BodyStyle"]))
    story.append(Spacer(1, 0.3 * inch))

    for line in content.split("\n"):
        if line.strip():
            story.append(Paragraph(line, styles["BodyStyle"]))
            story.append(Spacer(1, 0.1 * inch))

    doc.build(story)
    buffer.seek(0)

    return buffer
