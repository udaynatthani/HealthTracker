import pandas as pd
from sklearn.ensemble import IsolationForest


def analyze_health(data):
    df = pd.DataFrame(data)

    for col in ["heartRate", "steps", "sleepHours"]:
        df[col] = pd.to_numeric(df.get(col, 0), errors="coerce").fillna(0)

    insights = []
    risk_score = 0

    # Heart rate anomaly
    if len(df) >= 3:
        model = IsolationForest(contamination=0.3, random_state=42)
        df["hr_anomaly"] = model.fit_predict(df[["heartRate"]])

        if (df["hr_anomaly"] == -1).any():
            insights.append("Abnormal heart rate detected.")
            risk_score += 40

    # Low activity
    if df["steps"].mean() < 2000:
        insights.append("Low physical activity detected.")
        risk_score += 30

    # Low sleep
    if df["sleepHours"].mean() < 6:
        insights.append("Insufficient sleep detected.")
        risk_score += 30

    if not insights:
        insights.append(
            "No major health risks detected. Keep maintaining healthy habits."
        )

    return {
        "risk_score": risk_score,
        "risk_level": (
            "High" if risk_score >= 60
            else "Medium" if risk_score >= 30
            else "Low"
        ),
        "insights": insights
    }