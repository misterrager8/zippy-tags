import os
from pathlib import Path

import dotenv

dotenv.load_dotenv()

PORT = os.getenv("port") or "5000"
HOME_DIR = Path(os.getenv("home_dir"))
