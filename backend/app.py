import os, re
from io import BytesIO
from flask import Flask, render_template, request, send_file, jsonify
from dotenv import load_dotenv
from openai import OpenAI
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib.units import inch

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
app = Flask(__name__)

# ---------------------------------------------------------------------
# Subject → Chapters
# ---------------------------------------------------------------------
CHAPTERS = {
    "Physics": [
        "Motion in a Straight Line", "Laws of Motion", "Work, Power and Energy",
        "Gravitation", "Thermodynamics", "Electrostatics", "Magnetic Effects of Current",
        "Electromagnetic Induction", "Ray Optics", "Wave Optics"
    ],
    "Chemistry": [
        "Some Basic Concepts of Chemistry", "Structure of Atom", "Chemical Bonding",
        "Thermodynamics", "Equilibrium", "Redox Reactions",
        "Organic Chemistry – Basic Principles", "Hydrocarbons", "Solutions", "Electrochemistry"
    ],
    "Mathematics": [
        "Sets", "Relations and Functions", "Trigonometric Functions", "Limits and Derivatives",
        "Straight Lines", "Conic Sections", "Permutations and Combinations",
        "Binomial Theorem", "Differentiation", "Integration"
    ],
    "Biology": [
        "Cell Structure and Function", "Plant Physiology", "Human Physiology",
        "Genetics", "Evolution", "Biotechnology", "Human Health and Disease"
    ]
}

# ---------------------------------------------------------------------
# Prompt Template
# ---------------------------------------------------------------------
PROMPT_TEMPLATE = """
You are an educational assistant creating high-quality, syllabus-aligned notes for Grade {grade} {subject} ({board}).

Topic: {chapter}
Difficulty: {difficulty}

Generate detailed, textbook-style notes with:
- Section titles for each major concept
- Bulleted lists for key ideas
- Plain text equations (write as a = Δv / Δt)
- Proper units (m/s² not m/sÂ²)
- No Markdown symbols like **, #, or LaTeX delimiters
- Each bullet on its own line
- Textbook readability
"""

# ---------------------------------------------------------------------
# Text Cleanup
# ---------------------------------------------------------------------
def clean_text(text):
    replacements = {
        "Â": "", "Î”": "Δ", "â€“": "–", "â€”": "—",
        "â€˜": "'", "â€™": "'", "â€œ": '"', "â€�": '"',
        "â€¢": "•", "\\n": "\n"
    }
    for k, v in replacements.items():
        text = text.replace(k, v)

    # Strip markdown symbols
    text = re.sub(r"[*_#`]+", "", text)

    # Normalize bullets
    text = re.sub(r"(?<!\n)- ", "\n• ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()

# ---------------------------------------------------------------------
# Build PDF
# ---------------------------------------------------------------------
def build_pdf(content, subject, chapter):
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4,
                            leftMargin=50, rightMargin=50,
                            topMargin=60, bottomMargin=50)

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle('TitleStyle', parent=styles['Heading1'],
                                 alignment=TA_CENTER, fontSize=16, leading=20, spaceAfter=12)
    body_style = ParagraphStyle('BodyStyle', parent=styles['Normal'],
                                alignment=TA_LEFT, fontSize=11, leading=15, spaceAfter=5)

    story = [Paragraph(f"<b>{subject} – {chapter}</b>", title_style),
             Spacer(1, 0.2 * inch)]

    for line in content.split("\n"):
        line = line.strip()
        if not line:
            continue
        if line.startswith("•"):
            story.append(Paragraph(f"{line}", body_style))
        elif re.match(r"^[0-9]+\.", line):  # numbered points
            story.append(Paragraph(f"• {line}", body_style))
        else:
            # Treat short all-caps lines as section titles
            if len(line.split()) <= 6 and line.isupper():
                story.append(Paragraph(f"<b>{line}</b>", body_style))
            else:
                story.append(Paragraph(line, body_style))
        story.append(Spacer(1, 0.07 * inch))

    doc.build(story)
    buffer.seek(0)
    return buffer.read()

# ---------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------
@app.route("/")
def index():
    return render_template("index.html", subjects=list(CHAPTERS.keys()), chapters=CHAPTERS)

@app.route("/generate", methods=["POST"])
def generate():
    board = request.form["board"]
    grade = request.form["grade"]
    subject = request.form["subject"]
    chapter = request.form["chapter"]
    difficulty = request.form["difficulty"]

    prompt = PROMPT_TEMPLATE.format(board=board, grade=grade,
                                    subject=subject, chapter=chapter, difficulty=difficulty)

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system",
             "content": "You are a subject expert producing clean, textbook-quality educational notes."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )

    text_output = response.choices[0].message.content
    text_output = clean_text(text_output)

    pdf_bytes = build_pdf(text_output, subject, chapter)
    return send_file(BytesIO(pdf_bytes),
                     mimetype="application/pdf",
                     as_attachment=True,
                     download_name=f"{subject}_{chapter}_notes.pdf")
# ---------------------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
