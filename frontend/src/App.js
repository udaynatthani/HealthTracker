import { useEffect, useState } from "react";
import UploadForm from "./components/UploadForm";
import DataList from "./components/DataList";
import AIInsights from "./components/AIInsights";
import Auth from "./components/Auth";
import { fetchData } from "./services/api";
import HealthCharts from "./components/HealthCharts";
const styles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #f2f2f7;
    color: #1c1c1e;
    font-family: 'Inter', -apple-system, sans-serif;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  .app-root {
    min-height: 100vh;
    background: #f2f2f7;
    position: relative;
    overflow-x: hidden;
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
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }

  .app-nav-brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .app-nav-icon {
    width: 32px;
    height: 32px;
    background: #ff2d55;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: white;
    box-shadow: 0 2px 8px rgba(255, 45, 85, 0.3);
  }

  .app-nav-title {
    font-size: 18px;
    font-weight: 600;
    color: #1c1c1e;
    letter-spacing: -0.02em;
  }

  .app-user-section {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .app-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #e5e5ea;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    color: #8e8e93;
    cursor: pointer;
    user-select: none;
    transition: background 0.2s;
  }
  
  .app-avatar:hover {
    background: #d1d1d6;
  }

  .profile-dropdown {
    position: absolute;
    top: 50px;
    right: 0;
    width: 200px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    padding: 16px;
    z-index: 1000;
    animation: dropDown 0.2s ease;
    transform-origin: top right;
  }

  @keyframes dropDown {
    from { opacity: 0; transform: scale(0.95) translateY(-10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  .profile-dropdown-header {
    margin-bottom: 12px;
  }

  .profile-dropdown-name {
    font-size: 15px;
    font-weight: 600;
    color: #1c1c1e;
  }

  .profile-dropdown-email {
    font-size: 13px;
    color: #8e8e93;
    margin-top: 2px;
  }

  .profile-dropdown-divider {
    height: 1px;
    background: #f2f2f7;
    margin: 12px -16px;
  }

  .profile-logout-btn {
    background: transparent;
    border: none;
    color: #ff3b30;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    width: 100%;
    text-align: left;
    padding: 8px 0;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: opacity 0.2s;
  }

  .profile-logout-btn:hover {
    opacity: 0.7;
  }

  .app-logout-btn {
    background: transparent;
    border: none;
    color: #ff3b30;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .app-logout-btn:hover {
    opacity: 0.7;
  }

  /* ── MAIN LAYOUT ── */
  .app-main {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 32px 40px 80px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 24px;
    align-items: start;
  }

  /* ── CARDS ── */
  .app-card {
    background: #ffffff;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
    animation: fadeUp 0.5s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .app-card-title {
    font-size: 18px;
    font-weight: 600;
    color: #1c1c1e;
    margin-bottom: 20px;
    letter-spacing: -0.01em;
  }

  .left-pane {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  .main-pane {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  /* Header Section */
  .page-header {
    margin-bottom: 16px;
  }
  .page-title {
    font-size: 34px;
    font-weight: 700;
    color: #1c1c1e;
    letter-spacing: -0.03em;
  }

  @media (max-width: 900px) {
    .dashboard-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    .app-main {
      padding: 24px 20px 60px;
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
  const [showProfile, setShowProfile] = useState(false);
  const userName = localStorage.getItem("userName") || "User";
  const userEmail = localStorage.getItem("userEmail") || "";

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
            <div className="app-nav-icon">❤️</div>
            <span className="app-nav-title">Health</span>
          </div>
          <div className="app-user-section" style={{ position: 'relative' }}>
            <div 
              className="app-avatar" 
              onClick={() => setShowProfile(!showProfile)}
            >
              {userName.charAt(0).toUpperCase()}
            </div>
            {showProfile && (
              <div className="profile-dropdown">
                <div className="profile-dropdown-header">
                  <div className="profile-dropdown-name">{userName}</div>
                  {userEmail && <div className="profile-dropdown-email">{userEmail}</div>}
                </div>
                <div className="profile-dropdown-divider"></div>
                <button
                  className="profile-logout-btn"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userName");
                    localStorage.removeItem("userEmail");
                    setLoggedIn(false);
                    setShowProfile(false);
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Log Out
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Content */}
        <main className="app-main">
          <div className="page-header">
            <h1 className="page-title">Summary</h1>
          </div>
          
          <div className="dashboard-grid">
            <div className="left-pane">
              <AIInsights />
              <div className="app-card" style={{ animationDelay: "0.1s" }}>
                <h2 className="app-card-title">Add Data</h2>
                <UploadForm onUpload={loadData} />
              </div>
            </div>

            <div className="main-pane">
              {data.length > 0 && <HealthCharts />}
              <DataList data={data} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;