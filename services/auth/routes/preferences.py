from flask import Blueprint, jsonify, request
from sqlalchemy.orm import Session
from data.userdb.database import SessionLocal
from data.userdb.models import UserPreference
from services.auth.utils.auth import require_auth
from data.userdb.dto import PreferencesPayload

bp = Blueprint("preferences", __name__, url_prefix="/api/user")