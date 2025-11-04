from flask import Blueprint, request, jsonify, redirect
from sqlalchemy import select
from sqlalchemy.orm import Session
from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired
from data.userdb.database import SessionLocal
from data.userdb.models import User, EmailVerification
from data.userdb.dto import SignupPayload
from services.auth.utils.security import hash_password, password_valid
from services.auth.utils.emailer import send_verification_email
from services.auth.config import Config
import uuid
from datetime import datetime

bp = Blueprint("auth", __name__, url_prefix="/api/auth")
serializer = URLSafeTimedSerializer(Config.SECRET_KEY)

def make_token(email: str) -> str:
    return serializer.dumps({"email": email, "nonce": str(uuid.uuid4())})

def read_token(token: str, max_age: int = 60 * 60 * 24) -> str | None:
    try:
        data = serializer.loads(token, max_age=max_age)
        return data.get("email")
    except SignatureExpired:
        return None
    except BadSignature:
        return None

@bp.post("/signup")
def signup():
    # Double-check client-side constraints on the server
    payload_json = request.get_json() or {}
    try:
        payload = SignupPayload(**payload_json)
    except Exception as e:
        return jsonify({"ok": False, "reason": "INVALID_PAYLOAD"}), 400

    if not password_valid(payload.password):
        return jsonify({"ok": False, "reason": "WEAK_PASSWORD"}), 400

    email = payload.email.lower().strip()
    username = (payload.username or email).strip().lower()

    db: Session = SessionLocal()
    try:
        # If already verified user exists → fail early
        existing_user = db.scalar(select(User).where(User.email == email))
        if existing_user:
            return jsonify({"ok": False, "reason": "EMAIL_IN_USE"}), 409

        # Create or refresh an email verification record
        token = make_token(email)
        ev = EmailVerification(
            email=email,
            token=token,
            expires_at=EmailVerification.expiry(hours=24),
            used=False,
        )
        db.add(ev)
        db.commit()

        verify_link = f"{request.url_root.strip('/')}/api/auth/verify?token={token}"
        send_verification_email(email, verify_link)

        # Do NOT create the user yet; only after verification
        return jsonify({"ok": True, "awaiting_verification": True})
    finally:
        db.close()

@bp.get("/verify")
def verify_email():
    token = request.args.get("token", "")
    email = read_token(token)
    if not email:
        return jsonify({"ok": False, "reason": "INVALID_OR_EXPIRED_TOKEN"}), 400

    db: Session = SessionLocal()
    try:
        ev = db.scalar(
            select(EmailVerification).where(
                EmailVerification.token == token,
                EmailVerification.email == email,
                EmailVerification.used == False,
                EmailVerification.expires_at > datetime.utcnow(),
            )
        )
        if not ev:
            return jsonify({"ok": False, "reason": "INVALID_OR_EXPIRED_TOKEN"}), 400

        # If user already exists & verified, mark token used and success
        user = db.scalar(select(User).where(User.email == email))
        if user and user.is_verified:
            ev.used = True
            db.commit()
            # Redirect back to app with success
            return redirect(f"{Config.APP_BASE_URL}/?verified=1", code=302)

        # Mark token used
        ev.used = True

        # If user doesn’t exist yet, create a skeleton (no password) — or set a random hash
        if not user:
            user = User(
                email=email,
                username=email,      # default username as email
                password_hash=hash_password(str(uuid.uuid4())),  # temporary pwd
                is_verified=True,
            )
            db.add(user)
        else:
            user.is_verified = True

        db.commit()

        return redirect(f"{Config.APP_BASE_URL}/?verified=1", code=302)
    finally:
        db.close()

@bp.post("/login")
def login():
    payload = request.get_json() or {}
    email = (payload.get("email") or "").lower().strip()
    password = payload.get("password") or ""

    if not email or not password:
        return jsonify({"ok": False, "reason": "MISSING_FIELDS"}), 400

    db: Session = SessionLocal()
    try:
        user = db.scalar(select(User).where(User.email == email))
        if not user:
            return jsonify({"ok": False, "reason": "INVALID_CREDENTIALS"}), 401

        if not user.is_verified:
            return jsonify({"ok": False, "reason": "EMAIL_NOT_VERIFIED"}), 403

        if not verify_password(password, user.password_hash):
            return jsonify({"ok": False, "reason": "INVALID_CREDENTIALS"}), 401

        token = create_access_token(user.id)
        return jsonify({"ok": True, "access_token": token, "user": {
            "id": user.id,
            "email": user.email,
            "username": user.username
        }})
    finally:
        db.close()
