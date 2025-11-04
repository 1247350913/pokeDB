import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    APP_BASE_URL = os.getenv("APP_BASE_URL", "http://localhost:5173")
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./local.db")  # fallback
    EMAIL_FROM = os.getenv("EMAIL_FROM", "no-reply@example.com")

    SMTP_HOST = os.getenv("SMTP_HOST")
    SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USERNAME = os.getenv("SMTP_USERNAME")
    SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
    SMTP_USE_TLS = os.getenv("SMTP_USE_TLS", "true").lower() == "true"

    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")