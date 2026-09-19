from fastapi import FastAPI

app = FastAPI(title="The QUEUE API", version="1.0")


@app.get("/")
def read_root():
    return {"name": "The QUEUE API", "version": "1.0", "endpoints": ["/tasks"]}


@app.get("/health")
def health_check():
    return {"status": "ok"}