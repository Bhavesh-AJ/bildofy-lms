# backend/app/utils/ai_client.py

import json
import re
import os
from typing import Any, Dict
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
client = AsyncOpenAI(api_key=api_key)


# ============================================================
# 1. FUNCTION CALLING SUPPORT (CORRECT FOR CHAT COMPLETIONS)
# ============================================================

async def call_json_function(model: str, messages: list, function_schema: dict) -> Dict[str, Any]:
    """
    Calls OpenAI chat.completions.create() using function-calling
    and returns the parsed JSON arguments.
    """

    response = await client.chat.completions.create(
        model=model,
        messages=messages,
        tools=[{
            "type": "function",
            "function": function_schema
        }],
        tool_choice={"type": "function", "function": {"name": function_schema["name"]}},
        temperature=0.2
    )

    try:
        # Correct extraction for ChatCompletionMessageFunctionToolCall
        tool_call = response.choices[0].message.tool_calls[0]
        args_str = tool_call.function.arguments  # <-- this is a string
        return json.loads(args_str)

    except Exception as e:
        raise ValueError(
            f"Function call JSON parse failed: {e}\n"
            f"Raw: {response}"
        )


# ============================================================
# 2. FLASHCARD LEGACY SUPPORT (UNCHANGED)
# ============================================================

def _extract_text_from_response(response: Any) -> str:
    try:
        return response.choices[0].message.content
    except Exception:
        return ""


def _strip_code_fences(text: str) -> str:
    cleaned = re.sub(r"^```(?:json)?\s*", "", text)
    cleaned = re.sub(r"\s*```$", "", cleaned)
    return cleaned.strip()


def _extract_first_json(text: str) -> str:
    start = text.find("{")
    if start == -1:
        raise ValueError("No JSON found in AI output.")
    for end in range(len(text) - 1, start, -1):
        try:
            json.loads(text[start:end])
            return text[start:end]
        except:
            pass
    raise ValueError("Unable to extract JSON from AI output.")


async def generate_flashcard_ai_output(subject: str, chapter: str, max_cards: int = 20) -> Dict[str, Any]:
    """
    Legacy flashcard generator — kept EXACTLY as your flashcards expect.
    """

    prompt = f"""
Generate up to {max_cards} flashcards for subject '{subject}' and chapter '{chapter}'.

Respond ONLY with valid JSON in this format:

{{
    "cards": [
        {{
            "front": "Question text",
            "back": "Answer text"
        }}
    ]
}}
"""

    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a flashcard generator that outputs ONLY valid JSON."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )

    text = _extract_text_from_response(response)
    if not text:
        raise ValueError("AI returned empty response.")

    cleaned = _strip_code_fences(text)

    try:
        return json.loads(cleaned)
    except:
        candidate = _extract_first_json(cleaned)
        return json.loads(candidate)
