import { useEffect, useState } from "react";
import { fetchAIInsights } from "../services/api";

const styles = `
  .insights-wrapper {
    font-family: inherit;
  }

  .insights-heading {
    font-size: 18px;
    font-weight: 600;
    color: #1c1c1e;
    margin: 0 0 16px 0;
    letter-spacing: -0.01em;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .sparkle-icon {
    color: #ff9500;
  }

  .insights-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: #8e8e93;
    font-size: 14px;
    padding: 32px 0;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  }

  .insights-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid #e5e5ea;
    border-top-color: #ff9500;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .insights-empty {
    text-align: center;
    padding: 32px 20px;
    color: #8e8e93;
    font-size: 14px;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  }

  .insights-card {
    background: #ffffff;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
    margin-bottom: 24px;
  }

  .insights-scores {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
  }

  .insights-score-box {
    flex: 1;
    background: #f2f2f7;
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .insights-score-label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    color: #8e8e93;
    letter-spacing: 0.05em;
  }

  .insights-score-value {
    font-size: 24px;
    font-weight: 700;
    color: #1c1c1e;
    letter-spacing: -0.02em;
  }

  .insights-score-value.low    { color: #34c759; } /* Green */
  .insights-score-value.medium { color: #ff9500; } /* Orange */
  .insights-score-value.high   { color: #ff3b30; } /* Red */

  .insights-list-label {
    font-size: 14px;
    font-weight: 600;
    color: #1c1c1e;
    margin-bottom: 12px;
  }

  .insights-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .insights-list-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 14px;
    color: #3a3a3c;
    background: #fdfdfd;
    border: 1px solid #f2f2f7;
    border-left: 4px solid #ff9500;
    border-radius: 12px;
    padding: 16px;
    line-height: 1.5;
    animation: fadeUp 0.4s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
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
        <h3 className="insights-heading">
          <span className="sparkle-icon">✨</span>
          Smart Insights
        </h3>

        {loading && (
          <div className="insights-loading">
            <span className="insights-spinner" />
            Analyzing health patterns...
          </div>
        )}

        {!loading && (!insights || !insights.insights?.length) && (
          <div className="insights-empty">
            <p>Upload data to see AI personalized health insights.</p>
          </div>
        )}

        {!loading && insights && insights.insights?.length > 0 && (
          <div className="insights-card">
            <div className="insights-scores">
              <div className="insights-score-box">
                <div className="insights-score-label">Risk Score</div>
                <div className={`insights-score-value ${getRiskClass(insights.risk_level)}`}>
                  {insights.risk_score}
                </div>
              </div>
              <div className="insights-score-box">
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
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  {i}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default AIInsights;