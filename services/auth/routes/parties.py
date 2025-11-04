from flask import Blueprint, jsonify, request
from sqlalchemy.orm import Session
from sqlalchemy import select, func
from data.userdb.database import SessionLocal
from data.userdb.models import Party, PartyMember
from services.auth.utils.auth import require_auth
from data.userdb.dto import PartyCreatePayload, PartyRenamePayload, PartyMembersPayload

bp = Blueprint("parties", __name__, url_prefix="/api/parties")

# unchanged handlers