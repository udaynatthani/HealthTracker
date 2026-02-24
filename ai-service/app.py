from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from model import analyze_health
import os

app = FastAPI()

# ✅ Input Schema
class HealthData(BaseModel):
    heartRate: float
    steps: int
    sleepHours: float


@app.get("/")
def root():
    return {"message": "AI Health Service Running"}


@app.post("/analyze")
def analyze(data: List[HealthData]):
    try:
        # Convert Pydantic models to dictionaries
        clean_data = [item.dict() for item in data]

        # Call ML logic
        result = analyze_health(clean_data)

        return result

    except Exception as e:
        print("AI ERROR:", str(e))
        return {
            "risk_score": "N/A",
            "risk_level": "Error",
            "insights": ["AI processing failed"]
        }