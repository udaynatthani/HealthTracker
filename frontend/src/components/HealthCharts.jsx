import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Tooltip,
    Legend
  } from "chart.js";
  
  import { Line, Bar } from "react-chartjs-2";
  
  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Tooltip,
    Legend
  );
  function HealthCharts() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      fetch("https://healthtracker-1-o89e.onrender.com/api/export")
        .then(res => res.json())
        .then(json => setData(json))
        .catch(err => console.error(err));
    }, []);
    const labels = data.map(item =>
        new Date(item.date).toLocaleDateString()
      );
    
      const heartRateData = {
        labels,
        datasets: [
          {
            label: "Heart Rate",
            data: data.map(item => item.heartRate),
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.2)"
          }
        ]
      };
    
      const stepsData = {
        labels,
        datasets: [
          {
            label: "Steps",
            data: data.map(item => item.steps),
            backgroundColor: "blue"
          }
        ]
      };
    
      const sleepData = {
        labels,
        datasets: [
          {
            label: "Sleep Hours",
            data: data.map(item => item.sleepHours),
            borderColor: "green",
            backgroundColor: "rgba(0,255,0,0.2)"
          }
        ]
      };
      return (
        <div style={{ padding: "20px" }}>
          <h2>Heart Rate Trend</h2>
          <Line data={heartRateData} />
    
          <h2>Steps Trend</h2>
          <Bar data={stepsData} />
    
          <h2>Sleep Trend</h2>
          <Line data={sleepData} />
        </div>
      );
    }
    
    export default HealthCharts;