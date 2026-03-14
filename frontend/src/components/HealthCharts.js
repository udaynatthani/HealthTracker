import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { API_BASE } from "../services/api";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
  Filler
);

const styles = `
  .charts-section {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 32px;
  }

  .chart-card {
    background: #ffffff;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  }

  .chart-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  .chart-title {
    font-size: 18px;
    font-weight: 600;
    color: #1c1c1e;
    letter-spacing: -0.01em;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .chart-title-icon {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: white;
  }

  .chart-title-icon.hr { background: #ff2d55; }
  .chart-title-icon.st { background: #ff9500; }
  .chart-title-icon.sl { background: #5856d6; }

  .chart-avg {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .chart-avg-val {
    font-size: 24px;
    font-weight: 700;
    color: #1c1c1e;
    letter-spacing: -0.02em;
    line-height: 1;
  }

  .chart-avg-label {
    font-size: 12px;
    font-weight: 500;
    color: #8e8e93;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 4px;
  }

  .chart-container {
    height: 220px;
    position: relative;
    width: 100%;
  }
`;

function HealthCharts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://healthtracker-1-o89e.onrender.com/api/export") 
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  if (!data || data.length === 0) return null;

  // Sort by date chronologically for charts
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const labels = sortedData.map((item) =>
    item.date
      ? new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
      : ""
  );

  const getAvg = (arr) => arr.length ? Math.round(arr.reduce((a,b)=>a+b,0)/arr.length) : 0;
  
  const hrArr = sortedData.map(item => item.heartRate);
  const stepsArr = sortedData.map(item => item.steps);
  const sleepArr = sortedData.map(item => item.sleepHours);

  const avgHR = getAvg(hrArr);
  const avgSteps = getAvg(stepsArr);
  const avgSleep = (sleepArr.length ? (sleepArr.reduce((a,b)=>a+b,0)/sleepArr.length).toFixed(1) : 0);

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(28, 28, 30, 0.9)",
        titleFont: { family: "Inter", size: 13, weight: 600 },
        bodyFont: { family: "Inter", size: 14, weight: 500 },
        padding: 12,
        cornerRadius: 12,
        displayColors: false,
      }
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { font: { family: "Inter", size: 12 }, color: "#8e8e93", maxRotation: 0, autoSkip: true, maxTicksLimit: 6 }
      },
      y: {
        grid: { color: "#f2f2f7", drawBorder: false },
        border: { display: false },
        ticks: { font: { family: "Inter", size: 12 }, color: "#8e8e93", padding: 10 }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  const heartRateData = {
    labels,
    datasets: [
      {
        label: "Heart Rate",
        data: hrArr,
        borderColor: "#ff2d55",
        backgroundColor: "rgba(255, 45, 85, 0.1)",
        borderWidth: 3,
        pointBackgroundColor: "#ff2d55",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4
      }
    ]
  };

  const stepsData = {
    labels,
    datasets: [
      {
        label: "Steps",
        data: stepsArr,
        backgroundColor: "#ff9500",
        borderRadius: 6,
        barPercentage: 0.6,
      }
    ]
  };

  const sleepData = {
    labels,
    datasets: [
      {
        label: "Sleep Hours",
        data: sleepArr,
        borderColor: "#5856d6",
        backgroundColor: "rgba(88, 86, 214, 0.1)",
        borderWidth: 3,
        pointBackgroundColor: "#5856d6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4
      }
    ]
  };

  return (
    <>
      <style>{styles}</style>
      <div className="charts-section">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">
              <div className="chart-title-icon hr">❤️</div>
              Heart Rate
            </h3>
            <div className="chart-avg">
              <div className="chart-avg-val">{avgHR}<span style={{fontSize:'14px', color:'#8e8e93', fontWeight:500, marginLeft:'4px'}}>BPM</span></div>
              <div className="chart-avg-label">Average</div>
            </div>
          </div>
          <div className="chart-container">
            <Line data={heartRateData} options={commonOptions} />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">
              <div className="chart-title-icon st">👟</div>
              Steps
            </h3>
            <div className="chart-avg">
              <div className="chart-avg-val">{avgSteps.toLocaleString()}</div>
              <div className="chart-avg-label">Average Daily</div>
            </div>
          </div>
          <div className="chart-container">
            <Bar data={stepsData} options={commonOptions} />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">
              <div className="chart-title-icon sl">🌙</div>
              Sleep
            </h3>
            <div className="chart-avg">
              <div className="chart-avg-val">{avgSleep}<span style={{fontSize:'14px', color:'#8e8e93', fontWeight:500, marginLeft:'4px'}}>hr</span></div>
              <div className="chart-avg-label">Average</div>
            </div>
          </div>
          <div className="chart-container">
            <Line data={sleepData} options={commonOptions} />
          </div>
        </div>
      </div>
    </>
  );
}

export default HealthCharts;