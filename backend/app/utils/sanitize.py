import re


def sanitize_markdown(md: str) -> str:
    # Basic sanitization to avoid unsupported chars
    if not md:
        return ""
    # Replace some unicode chars that fpdf may struggle with
    replacements = {
        "\u2013": "-",  # en dash
        "\u2014": "-",  # em dash
        "\u2022": "-",  # bullet
        "\u00b2": "^2",  # superscript 2
    }
    for k, v in replacements.items():
        md = md.replace(k, v)
    # Trim repeated blank lines
    md = re.sub(r"\n{3,}", "\n\n", md)
    return md.strip()
