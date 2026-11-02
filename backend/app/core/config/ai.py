from pydantic_settings import BaseSettings

class AISettings(BaseSettings):
    # Which LLM provider LLMService uses: "anthropic" or "gemini"
    LLM_PROVIDER: str = "anthropic"

    ANTHROPIC_API_KEY: str = ""
    ANTHROPIC_MODEL: str = "claude-3-5-sonnet-20241022"
    ANTHROPIC_MAX_TOKENS: int = 1024
    ANTHROPIC_TEMPERATURE: float = 0.0

    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-3.5-flash"
    # "low" keeps thinking short: ~3s per call instead of ~10s+; empty string = model default
    GEMINI_REASONING_EFFORT: str = "low"
    GEMINI_MAX_TOKENS: int = 1024
    GEMINI_BASE_URL: str = "https://generativelanguage.googleapis.com/v1beta/openai/"

    class Config:
        env_file = ".env"
        case_sensitive = True
