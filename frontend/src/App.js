import { useEffect, useState } from "react";
import UploadForm from "./components/UploadForm";
import DataList from "./components/DataList";
import AIInsights from "./components/AIInsights";
import Auth from "./components/Auth";
import { fetchData } from "./services/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0e1a14;
    color: #e8f5ee;
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }

  .app-root {
    min-height: 100vh;
    background: #0e1a14;
    position: relative;
    overflow-x: hidden;
  }

  .app-root::before {
    content: '';
    position: fixed;
    width: 700px;
    height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(74, 222, 128, 0.06) 0%, transparent 70%);
    top: -200px;
    right: -200px;
    pointer-events: none;
    z-index: 0;
  }

  .app-root::after {
    content: '';
    position: fixed;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(52, 211, 153, 0.04) 0%, transparent 70%);
    bottom: -150px;
    left: -100px;
    pointer-events: none;
    z-index: 0;
  }

  /* ── TOP NAV ── */
  .app-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    height: 64px;
    background: rgba(14, 26, 20, 0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .app-nav-brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .app-nav-icon {
    width: 34px;
    height: 34px;
    background: linear-gradient(135deg, #4ade80, #22c55e);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  .app-nav-title {
    font-family: 'DM Serif Display', serif;
    font-size: 19px;
    color: #f0faf4;
    letter-spacing: -0.2px;
  }

  .app-logout-btn {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.09);
    color: rgba(255,255,255,0.5);
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    padding: 8px 16px;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }

  .app-logout-btn:hover {
    background: rgba(248, 113, 113, 0.1);
    border-color: rgba(248, 113, 113, 0.3);
    color: #fca5a5;
  }

  /* ── MAIN LAYOUT ── */
  .app-main {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    padding: 40px 40px 80px;
    display: grid;
    grid-template-columns: 340px 1fr;
    grid-template-rows: auto 1fr;
    gap: 24px;
  }

  /* ── CARDS ── */
  .app-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    padding: 28px 28px;
    animation: fadeUp 0.5s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .app-card:nth-child(1) { animation-delay: 0.05s; }
  .app-card:nth-child(2) { animation-delay: 0.10s; }
  .app-card:nth-child(3) { animation-delay: 0.15s; }

  .app-card-label {
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    margin-bottom: 20px;
  }

  /* left column: upload + insights stacked */
  .app-left {
    grid-column: 1;
    grid-row: 1 / 3;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  /* right column: data list */
  .app-right {
    grid-column: 2;
    grid-row: 1 / 3;
  }

  /* ── DIVIDER ── */
  .app-divider {
    display: none;
  }

  @media (max-width: 768px) {
    .app-main {
      grid-template-columns: 1fr;
      padding: 24px 20px 60px;
    }
    .app-left, .app-right {
      grid-column: 1;
      grid-row: auto;
    }
    .app-nav {
      padding: 0 20px;
    }
  }
`;

function App() {
  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const loadData = async () => {
    const res = await fetchData();
    setData(res);
  };

  useEffect(() => {
    if (loggedIn) loadData();
  }, [loggedIn]);

  if (!loggedIn) {
    return <Auth onAuth={() => setLoggedIn(true)} />;
  }

  return (
    <>
      <style>{styles}</style>
      <div className="app-root">
        {/* Nav */}
        <nav className="app-nav">
          <div className="app-nav-brand">
            <div className="app-nav-icon">🌿</div>
            <span className="app-nav-title">Smart Health Tracker</span>
          </div>
          <button
            className="app-logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              setLoggedIn(false);
            }}
          >
            Sign out
          </button>
        </nav>

        {/* Content */}
        <main className="app-main">
          {/* Left column */}
          <div className="app-left">
            <div className="app-card">
              <p className="app-card-label">Import Data</p>
              <UploadForm onUpload={loadData} />
            </div>

            <div className="app-card">
              <AIInsights />
            </div>
          </div>

          {/* Right column */}
          <div className="app-right">
            <div className="app-card" style={{ height: "100%" }}>
              <DataList data={data} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;