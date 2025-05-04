import os
from pathlib import Path

import dotenv

dotenv.load_dotenv()

HOME_DIR = Path(os.getenv("home_dir"))
GENIUS_ACCESS_TOKEN = os.getenv("GENIUS_ACCESS_TOKEN")
CLIENT_ID = os.getenv("client_id")
USER_AGENT = os.getenv("user_agent")
CLIENT_SECRET = os.getenv("client_secret")
PORT = os.getenv("port") or "1556"
