from config import Config
import smtplib
from email.message import EmailMessage

def send_verification_email(to_email: str, verify_url: str):
    """
    Simple SMTP sender. Works with most providers (Mailgun/SendGrid/Resend SMTP, etc).
    Swap this for provider SDKs later if you prefer.
    """
    msg = EmailMessage()
    msg["Subject"] = "Verify your email"
    msg["From"] = Config.EMAIL_FROM
    msg["To"] = to_email
    msg.set_content(
        f"Welcome! Please verify your email by clicking the link:\n\n{verify_url}\n\n"
        f"If you did not request this, you can ignore this email."
    )

    if not Config.SMTP_HOST:
        # Dev fallback: print to console instead of sending
        print(f"[DEV] Email to {to_email}:\n{msg.get_content()}")
        return

    with smtplib.SMTP(Config.SMTP_HOST, Config.SMTP_PORT) as server:
        if Config.SMTP_USE_TLS:
            server.starttls()
        if Config.SMTP_USERNAME and Config.SMTP_PASSWORD:
            server.login(Config.SMTP_USERNAME, Config.SMTP_PASSWORD)
        server.send_message(msg)