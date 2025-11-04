from flask import Flask
from flask_cors import CORS
from services.auth.config import Config
from data.userdb.database import init_db
from services.auth.routes.auth import bp as auth_bp
from services.auth.routes.preferences import bp as preferences_bp
from services.auth.routes.parties import bp as parties_bp

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = Config.SECRET_KEY
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    init_db()  # creates tables using data/userdb/models.py
    app.register_blueprint(auth_bp)
    app.register_blueprint(preferences_bp)
    app.register_blueprint(parties_bp)

    @app.get("/api/health")
    def health():
        return {"ok": True}

    return app

app = create_app()
