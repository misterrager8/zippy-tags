import os

import dotenv

dotenv.load_dotenv()

PORT = os.getenv("port") or "5000"
