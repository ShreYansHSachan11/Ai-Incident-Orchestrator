"""
Gemini LLM Client — shared, reusable by any agent.

Calls Gemini through its OpenAI-compatible chat completions endpoint.
All agents call this client through LLMService.
Never call this directly from agents — use LLMService instead.
"""
import logging
import httpx
from app.core.config import settings

logger = logging.getLogger(__name__)


async def gemini_chat_completion(messages: list[dict], model: str, max_tokens: int) -> str:
    """Send OpenAI-style messages (system message included) to Gemini and return the reply text."""
    if not settings.GEMINI_API_KEY:
        raise RuntimeError("GEMINI_API_KEY is not set in .env")

    url = settings.GEMINI_BASE_URL.rstrip("/") + "/chat/completions"
    payload = {"model": model, "messages": messages, "max_tokens": max_tokens}
    if settings.GEMINI_REASONING_EFFORT:
        payload["reasoning_effort"] = settings.GEMINI_REASONING_EFFORT
    headers = {"Authorization": f"Bearer {settings.GEMINI_API_KEY}"}

    async with httpx.AsyncClient(timeout=120.0) as client:
        response = await client.post(url, json=payload, headers=headers)

    if response.status_code != 200:
        raise RuntimeError(f"Gemini API error {response.status_code}: {response.text[:300]}")

    content = response.json()["choices"][0]["message"].get("content") or ""
    return content.strip()
