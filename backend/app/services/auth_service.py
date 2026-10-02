from bson import ObjectId
from pymongo.errors import DuplicateKeyError

from app.database.mongodb import get_database
from app.models.user import user_document
from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)


def get_users_collection():
    database = get_database()
    collection = database["users"]

    # Prevent duplicate email accounts
    collection.create_index("email", unique=True)

    return collection


def register_user(name: str, email: str, password: str):
    collection = get_users_collection()

    email = email.lower().strip()

    existing_user = collection.find_one({"email": email})

    if existing_user:
        raise ValueError("Email is already registered")

    password_hash = hash_password(password)

    document = user_document(
        name=name,
        email=email,
        password_hash=password_hash,
        role="user",
    )

    try:
        result = collection.insert_one(document)
    except DuplicateKeyError:
        raise ValueError("Email is already registered")

    user_id = str(result.inserted_id)

    access_token = create_access_token(
        user_id=user_id,
        role=document["role"],
    )

    return {
        "user": {
            "id": user_id,
            "name": document["name"],
            "email": document["email"],
            "role": document["role"],
            "is_active": document["is_active"],
        },
        "access_token": access_token,
    }


def login_user(email: str, password: str):
    collection = get_users_collection()

    email = email.lower().strip()

    user = collection.find_one({"email": email})

    if not user:
        raise ValueError("Invalid email or password")

    if not verify_password(password, user["password"]):
        raise ValueError("Invalid email or password")

    if not user.get("is_active", True):
        raise ValueError("User account is inactive")

    user_id = str(user["_id"])

    access_token = create_access_token(
        user_id=user_id,
        role=user.get("role", "user"),
    )

    return {
        "user": {
            "id": user_id,
            "name": user["name"],
            "email": user["email"],
            "role": user.get("role", "user"),
            "is_active": user.get("is_active", True),
        },
        "access_token": access_token,
    }


def get_user_by_id(user_id: str):
    collection = get_users_collection()

    if not ObjectId.is_valid(user_id):
        return None

    return collection.find_one(
        {"_id": ObjectId(user_id)}
    )


def update_user_profile(user_id: str, name: str):
    collection = get_users_collection()

    if not ObjectId.is_valid(user_id):
        raise ValueError("Invalid user ID")

    result = collection.update_one(
        {"_id": ObjectId(user_id)},
        {
            "$set": {
                "name": name.strip(),
            }
        },
    )

    if result.matched_count == 0:
        raise ValueError("User not found")

    return get_user_by_id(user_id)


def change_user_password(user_id: str, new_password: str):
    collection = get_users_collection()

    if not ObjectId.is_valid(user_id):
        raise ValueError("Invalid user ID")

    password_hash = hash_password(new_password)

    result = collection.update_one(
        {"_id": ObjectId(user_id)},
        {
            "$set": {
                "password": password_hash,
            }
        },
    )

    if result.matched_count == 0:
        raise ValueError("User not found")

    return True