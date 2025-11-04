import os
from dotenv import load_dotenv

load_dotenv()

class DBConfig:
    # Only DB-related config lives here
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./local.db")