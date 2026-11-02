"""
AI Platform health check endpoints.
"""
from fastapi import APIRouter
from app.ai_platform.services.llm_service import LLMService
from app.core.config import settings
from app.modules.shift_roster.shift_time_checker import get_shift_status_summary

router = APIRouter()


@router.get("/ai-health", tags=["health"])
async def ai_health_check():
    """
    Test the configured LLM provider (LLM_PROVIDER) by sending a simple ping message.
    Returns provider and model info and confirms the API key is working.
    """
    provider = settings.LLM_PROVIDER.lower()
    if provider == "gemini":
        api_key, key_name, model = settings.GEMINI_API_KEY, "GEMINI_API_KEY", settings.GEMINI_MODEL
    else:
        api_key, key_name, model = settings.ANTHROPIC_API_KEY, "ANTHROPIC_API_KEY", settings.ANTHROPIC_MODEL

    if not api_key or api_key == "your-anthropic-api-key-here":
        return {"status": "not_configured", "provider": provider, "message": f"{key_name} is not set in .env"}

    try:
        llm = LLMService()
        # No tiny max_tokens here: Gemini's thinking tokens count toward the limit
        response = await llm.complete(
            messages=[{"role": "user", "content": "Say 'OK' and nothing else."}],
        )
        return {"status": "healthy", "provider": provider, "model": model, "response": response}
    except Exception as e:
        return {"status": "unhealthy", "provider": provider, "model": model, "error": str(e)}


@router.get("/shift-status", tags=["health"])
async def shift_status():
    """
    Returns which shifts are currently active based on real-world time.
    Use this to verify the shift time checker is working correctly.
    """
    return {"status": "ok", "shifts": get_shift_status_summary()}

