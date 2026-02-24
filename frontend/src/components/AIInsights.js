import { useEffect, useState } from "react";
import { fetchAIInsights } from "../services/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  .insights-wrapper {
    font-family: 'DM Sans', sans-serif;
    margin-top: 8px;
  }

  .insights-heading {
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    color: #f0faf4;
    margin: 0 0 20px 0;
    letter-spacing: -0.2px;
  }

  .insights-loading {
    display: flex;
    align-items: center;
    gap: 10px;
    color: rgba(255,255,255,0.35);
    font-size: 13.5px;
    padding: 20px 0;
  }

  .insights-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(74, 222, 128, 0.2);
    border-top-color: #4ade80;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .insights-empty {
    text-align: center;
    padding: 32px 20px;
    color: rgba(255,255,255,0.25);
    font-size: 14px;
    border: 1px dashed rgba(255,255,255,0.08);
    border-radius: 14px;
    background: rgba(255,255,255,0.02);
  }

  .insights-scores {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 20px;
  }

  .insights-score-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px;
    padding: 16px 18px;
  }

  .insights-score-label {
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.28);
    margin-bottom: 6px;
  }

  .insights-score-value {
    font-size: 22px;
    font-family: 'DM Serif Display', serif;
    color: #f0faf4;
  }

  .insights-score-value.low    { color: #4ade80; }
  .insights-score-value.medium { color: #facc15; }
  .insights-score-value.high   { color: #f87171; }

  .insights-list-label {
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.28);
    margin-bottom: 12px;
  }

  .insights-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .insights-list-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 13.5px;
    color: rgba(255,255,255,0.65);
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    padding: 13px 15px;
    line-height: 1.5;
    animation: fadeUp 0.4s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .insights-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #4ade80;
    margin-top: 6px;
    flex-shrink: 0;
  }
`;

function getRiskClass(level = "") {
  const l = level.toLowerCase();
  if (l.includes("low")) return "low";
  if (l.includes("high")) return "high";
  return "medium";
}

function AIInsights() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setInsights(null);
    if (!token) return;
    setLoading(true);
    fetchAIInsights()
      .then((data) => { setInsights(data); })
      .catch(() => { setInsights(null); })
      .finally(() => { setLoading(false); });
  }, [token]);

  if (!token) return null;

  return (
    <>
      <style>{styles}</style>
      <div className="insights-wrapper">
        <h3 className="insights-heading">AI Health Insights</h3>

        {loading && (
          <div className="insights-loading">
            <span className="insights-spinner" />
            Analyzing your data...
          </div>
        )}

        {!loading && (!insights || !insights.insights?.length) && (
          <p className="insights-empty">No AI insights available</p>
        )}

        {!loading && insights && insights.insights?.length > 0 && (
          <>
            <div className="insights-scores">
              <div className="insights-score-card">
                <div className="insights-score-label">Risk Score</div>
                <div className={`insights-score-value ${getRiskClass(insights.risk_level)}`}>
                  {insights.risk_score}
                </div>
              </div>
              <div className="insights-score-card">
                <div className="insights-score-label">Status</div>
                <div className={`insights-score-value ${getRiskClass(insights.risk_level)}`}>
                  {insights.risk_level}
                </div>
              </div>
            </div>

            <div className="insights-list-label">Recommendations</div>
            <ul className="insights-list">
              {insights.insights.map((i, idx) => (
                <li
                  key={idx}
                  className="insights-list-item"
                  style={{ animationDelay: `${idx * 0.07}s` }}
                >
                  <span className="insights-dot" />
                  {i}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default AIInsights;