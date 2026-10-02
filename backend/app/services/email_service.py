import smtplib
from email.message import EmailMessage

from app.core.config import (
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USERNAME,
    SMTP_PASSWORD,
    SMTP_FROM_EMAIL,
    SMTP_FROM_NAME,
)


def send_email(
    to_email: str,
    subject: str,
    body: str,
):
    if not SMTP_USERNAME or not SMTP_PASSWORD:
        raise ValueError(
            "SMTP credentials are not configured"
        )

    message = EmailMessage()

    message["Subject"] = subject
    message["From"] = f"{SMTP_FROM_NAME} <{SMTP_FROM_EMAIL}>"
    message["To"] = to_email

    message.set_content(body)

    with smtplib.SMTP(
        SMTP_HOST,
        SMTP_PORT,
    ) as server:
        server.starttls()

        server.login(
            SMTP_USERNAME,
            SMTP_PASSWORD,
        )

        server.send_message(message)


def send_password_reset_email(
    to_email: str,
    reset_token: str,
):
    reset_link = (
        f"http://localhost:5173/reset-password"
        f"?token={reset_token}"
    )

    subject = "FreshHive - Password Reset"

    body = f"""Hello,

We received a request to reset your FreshHive password.

Use the following link to reset your password:

{reset_link}

This link is valid for 30 minutes.

If you did not request a password reset,
you can safely ignore this email.

Regards,
FreshHive Team
"""

    send_email(
        to_email=to_email,
        subject=subject,
        body=body,
    )