import re
from argon2 import PasswordHasher
from pydantic import BaseModel, EmailStr

ph = PasswordHasher()

EMAIL_REGEX = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")

def hash_password(password: str) -> str:
    return ph.hash(password)

def verify_password(password: str, hashed: str) -> bool:
    try:
        ph.verify(hashed, password)
        return True
    except Exception:
        return False

def password_valid(password: str) -> bool:
    # >= 8 chars, 1 upper, 1 lower, 1 digit, 1 symbol
    if len(password) < 8: return False
    if not re.search(r"[A-Z]", password): return False
    if not re.search(r"[a-z]", password): return False
    if not re.search(r"\d", password): return False
    if not re.search(r"[!@#$%^&*()_\-+=\[{\]};:'\",<.>/?\\|`~]", password): return False
    return True

class SignupPayload(BaseModel):
    email: EmailStr
    password: str
    username: str | None = None