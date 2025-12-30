import os
from redis import Redis
from rq import Queue

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

redis_conn = Redis.from_url(REDIS_URL)

default_queue = Queue("default", connection=redis_conn)
pdf_queue = Queue("pdf", connection=redis_conn)
ai_queue = Queue("ai", connection=redis_conn)
