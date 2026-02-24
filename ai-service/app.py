from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from model import analyze_health
import uvicorn

app = FastAPI()

# 👇 DEFINE INPUT SCHEMA
class HealthData(BaseModel):
    heartRate: float
    steps: int
    sleepHours: float

@app.post("/analyze")
def analyze(data: List[HealthData]):
    # Convert Pydantic models to dicts
    clean_data = [item.dict() for item in data]
    return analyze_health(clean_data)

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
