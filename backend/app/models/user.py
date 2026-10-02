from datetime import datetime, timezone


def user_document(
    name: str,
    email: str,
    password_hash: str,
    role: str = "user",
):
    now = datetime.now(timezone.utc)

    return {
        "name": name.strip(),
        "email": email.lower().strip(),
        "password": password_hash,
        "role": role,
        "is_active": True,
        "reset_token": None,
        "reset_token_expires": None,
        "created_at": now,
        "updated_at": now,
    }