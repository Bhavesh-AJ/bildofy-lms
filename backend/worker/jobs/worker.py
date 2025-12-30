import os
from redis import Redis
from rq import Worker, Connection
from worker.queue import default_queue, pdf_queue, ai_queue

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

redis_conn = Redis.from_url(REDIS_URL)

if __name__ == "__main__":
    with Connection(redis_conn):
        worker = Worker(
            queues=[
                default_queue,
                pdf_queue,
                ai_queue,
            ]
        )
        worker.work()
