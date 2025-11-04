from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from .config import DBConfig

engine = create_engine(DBConfig.DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

class Base(DeclarativeBase):
    pass

def init_db():
    from .models import User, EmailVerification, UserPreference, Party, PartyMember
    Base.metadata.create_all(bind=engine)