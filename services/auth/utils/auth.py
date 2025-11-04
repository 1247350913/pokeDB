import time, jwt
from functools import wraps
from flask import request, jsonify
from config import Config

ALGO = "HS256"

def create_access_token(user_id: str, ttl_seconds: int = 60*60*24) -> str:
    now = int(time.time())
    payload = {"sub": user_id, "iat": now, "exp": now + ttl_seconds}
    return jwt.encode(payload, Config.SECRET_KEY, algorithm=ALGO)

def decode_token(token: str) -> dict | None:
    try:
        return jwt.decode(token, Config.SECRET_KEY, algorithms=[ALGO])
    except Exception:
        return None

def require_auth(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        auth = request.headers.get("Authorization", "")
        if not auth.startswith("Bearer "):
            return jsonify({"ok": False, "reason": "NO_TOKEN"}), 401
        token = auth.removeprefix("Bearer ").strip()
        payload = decode_token(token)
        if not payload:
            return jsonify({"ok": False, "reason": "BAD_TOKEN"}), 401
        request.user_id = payload.get("sub")
        return fn(*args, **kwargs)
    return wrapper
