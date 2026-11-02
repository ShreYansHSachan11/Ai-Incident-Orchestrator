from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

from pydantic import field_validator
from pydantic_settings import BaseSettings


class DatabaseSettings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/incident_ai"

    @field_validator("DATABASE_URL")
    @classmethod
    def use_asyncpg(cls, url: str) -> str:
        # Accept plain URLs from hosted providers (e.g. Neon's
        # "postgresql://...?sslmode=require&channel_binding=require")
        # and rewrite them for the asyncpg driver.
        parts = urlsplit(url)
        if parts.scheme not in ("postgres", "postgresql"):
            return url
        query = []
        for key, value in parse_qsl(parts.query):
            if key == "sslmode":
                query.append(("ssl", value))
            elif key != "channel_binding":  # not supported by asyncpg
                query.append((key, value))
        return urlunsplit(parts._replace(scheme="postgresql+asyncpg", query=urlencode(query)))

    class Config:
        env_file = ".env"
        case_sensitive = True
