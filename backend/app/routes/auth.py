import secrets
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, status

from app.core.dependencies import get_current_user
from app.database.mongodb import get_database
from app.schemas.user import (
    ForgotPasswordRequest,
    ResetPasswordRequest,
    UserLogin,
    UserProfileUpdate,
    UserRegister,
)
from app.services.auth_service import (
    change_user_password,
    login_user,
    register_user,
    update_user_profile,
)
from app.services.email_service import send_password_reset_email


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post("/register")
def register(data: UserRegister):
    try:
        result = register_user(
            name=data.name,
            email=data.email,
            password=data.password,
        )

        return {
            "message": "Registration successful",
            **result,
        }

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        )


@router.post("/login")
def login(data: UserLogin):
    try:
        result = login_user(
            email=data.email,
            password=data.password,
        )

        return {
            "message": "Login successful",
            **result,
        }

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(error),
        )


@router.post("/logout")
def logout():
    return {
        "message": "Logout successful"
    }


@router.get("/me")
def get_profile(
    current_user=Depends(get_current_user),
):
    return {
        "id": str(current_user["_id"]),
        "name": current_user["name"],
        "email": current_user["email"],
        "role": current_user.get("role", "user"),
        "is_active": current_user.get("is_active", True),
    }


@router.put("/profile")
def update_profile(
    data: UserProfileUpdate,
    current_user=Depends(get_current_user),
):
    try:
        user = update_user_profile(
            user_id=str(current_user["_id"]),
            name=data.name,
        )

        return {
            "message": "Profile updated successfully",
            "user": {
                "id": str(user["_id"]),
                "name": user["name"],
                "email": user["email"],
                "role": user.get("role", "user"),
                "is_active": user.get("is_active", True),
            },
        }

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        )


@router.post("/forgot-password")
def forgot_password(
    data: ForgotPasswordRequest,
):
    database = get_database()
    users = database["users"]

    email = data.email.lower().strip()

    user = users.find_one({
        "email": email
    })

    # Do not reveal whether an email exists.
    if not user:
        return {
            "message": (
                "If the email is registered, "
                "a password reset link has been sent."
            )
        }

    reset_token = secrets.token_urlsafe(32)

    expires_at = (
        datetime.now(timezone.utc)
        + timedelta(minutes=30)
    )

    users.update_one(
        {"_id": user["_id"]},
        {
            "$set": {
                "reset_token": reset_token,
                "reset_token_expires": expires_at,
            }
        },
    )

    try:
        send_password_reset_email(
            to_email=email,
            reset_token=reset_token,
        )
    except Exception:
        # Remove the reset token if email sending fails.
        users.update_one(
            {"_id": user["_id"]},
            {
                "$set": {
                    "reset_token": None,
                    "reset_token_expires": None,
                }
            },
        )

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to send password reset email",
        )

    return {
        "message": (
            "If the email is registered, "
            "a password reset link has been sent."
        )
    }


@router.post("/reset-password")
def reset_password(
    data: ResetPasswordRequest,
):
    database = get_database()
    users = database["users"]

    user = users.find_one({
        "reset_token": data.token
    })

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token",
        )

    expires_at = user.get("reset_token_expires")

    if not expires_at:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token",
        )

    # MongoDB may return a timezone-aware datetime.
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(
            tzinfo=timezone.utc
        )

    if expires_at < datetime.now(timezone.utc):
        users.update_one(
            {"_id": user["_id"]},
            {
                "$set": {
                    "reset_token": None,
                    "reset_token_expires": None,
                }
            },
        )

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Reset token has expired",
        )

    try:
        change_user_password(
            user_id=str(user["_id"]),
            new_password=data.new_password,
        )

        users.update_one(
            {"_id": user["_id"]},
            {
                "$set": {
                    "reset_token": None,
                    "reset_token_expires": None,
                }
            },
        )

        return {
            "message": "Password reset successfully"
        }

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        )