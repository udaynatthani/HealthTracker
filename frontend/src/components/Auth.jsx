import { useState } from "react";

const styles = `
  * { box-sizing: border-box; }

  .auth-page {
    background: #f2f2f7;
    min-height: 100vh;
    font-family: -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif;
  }

  .auth-app-bar {
    background: white;
    border-bottom: 0.5px solid #d1d1d6;
    padding: 0 20px;
    height: 52px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .auth-app-icon {
    width: 28px; height: 28px; border-radius: 7px;
    background: #ff2d55;
    display: flex; align-items: center; justify-content: center;
  }
  .auth-app-icon svg { width: 16px; height: 16px; }
  .auth-app-bar-title { font-size: 17px; font-weight: 600; color: #1c1c1e; letter-spacing: -0.3px; }

  .auth-content {
    padding: 28px 20px 40px;
    max-width: 480px;
    margin: 0 auto;
  }

  .auth-page-title {
    font-size: 28px; font-weight: 700; color: #1c1c1e;
    letter-spacing: -0.5px; margin-bottom: 24px;
  }

  .auth-tabs {
    display: flex; margin-bottom: 20px;
  }
  .auth-tab-btn {
    flex: 1; padding: 10px 0;
    border: none; background: #e5e5ea;
    font-size: 14px; font-weight: 600; color: #8e8e93;
    cursor: pointer; font-family: inherit;
    transition: all 0.15s;
  }
  .auth-tab-btn:first-child { border-radius: 10px 0 0 10px; }
  .auth-tab-btn:last-child { border-radius: 0 10px 10px 0; }
  .auth-tab-btn.active { background: #ff2d55; color: white; }

  .auth-section-label {
    font-size: 13px; font-weight: 600; color: #8e8e93;
    text-transform: uppercase; letter-spacing: 0.5px;
    margin-bottom: 8px; padding-left: 4px;
  }

  .auth-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .auth-card-row {
    display: flex; align-items: center;
    padding: 14px 16px;
    border-bottom: 0.5px solid #f2f2f7;
    gap: 12px;
  }
  .auth-card-row:last-child { border-bottom: none; }

  .auth-row-icon {
    width: 32px; height: 32px; border-radius: 8px;
    background: #ff2d55;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .auth-row-label { font-size: 15px; color: #1c1c1e; flex: 1; }
  .auth-row-input {
    flex: 1.4; border: none; outline: none;
    font-size: 15px; color: #1c1c1e;
    text-align: right; background: transparent;
    font-family: inherit;
  }
  .auth-row-input::placeholder { color: #c7c7cc; }

  .auth-upload-card {
    background: white;
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 20px;
  }
  .auth-upload-zone {
    border: 1.5px dashed #d1d1d6;
    border-radius: 12px;
    padding: 28px 16px;
    text-align: center;
    background: #fafafa;
    cursor: pointer;
    position: relative;
    transition: border-color 0.2s, background 0.2s;
    margin-bottom: 12px;
  }
  .auth-upload-zone:hover, .auth-upload-zone.has-file {
    border-color: #ff2d55;
    background: #fff5f7;
  }
  .auth-upload-zone input[type="file"] {
    position: absolute; inset: 0; opacity: 0;
    cursor: pointer; width: 100%; height: 100%;
  }
  .auth-upload-icon-wrap {
    width: 44px; height: 44px; background: #fff0f3;
    border-radius: 12px; margin: 0 auto 10px;
    display: flex; align-items: center; justify-content: center;
  }
  .auth-upload-icon-wrap svg { color: #ff2d55; width: 22px; height: 22px; }
  .auth-upload-zone-title { font-size: 15px; font-weight: 600; color: #1c1c1e; margin-bottom: 3px; }
  .auth-upload-zone-sub { font-size: 13px; color: #8e8e93; }
  .auth-upload-filename { margin-top: 8px; font-size: 13px; color: #ff2d55; font-weight: 600; }

  .auth-primary-btn {
    width: 100%; padding: 15px;
    background: #ff2d55; border: none;
    border-radius: 14px; color: white;
    font-size: 16px; font-weight: 600;
    cursor: pointer; font-family: inherit;
    letter-spacing: -0.2px;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: opacity 0.15s, transform 0.1s;
  }
  .auth-primary-btn:active { transform: scale(0.98); opacity: 0.88; }
  .auth-primary-btn:disabled {
    background: #e5e5ea; color: #aeaeb2; cursor: not-allowed; transform: none;
  }

  .auth-secondary-btn {
    width: 100%; padding: 15px;
    background: white; border: none;
    border-radius: 14px; color: #ff2d55;
    font-size: 16px; font-weight: 600;
    cursor: pointer; font-family: inherit;
    letter-spacing: -0.2px; margin-top: 10px;
  }

  .auth-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: white; border-radius: 50%;
    animation: auth-spin 0.7s linear infinite;
  }
  @keyframes auth-spin { to { transform: rotate(360deg); } }

  .auth-insights-card {
    background: white; border-radius: 16px;
    padding: 16px; margin-bottom: 20px;
  }
  .auth-insights-header {
    display: flex; align-items: center; gap: 6px; margin-bottom: 10px;
  }
  .auth-insights-title { font-size: 15px; font-weight: 600; color: #1c1c1e; }
  .auth-insights-body {
    background: #f9f9fb; border-radius: 12px; padding: 14px;
    font-size: 14px; color: #8e8e93; text-align: center; line-height: 1.5;
  }
`;

function Auth({ onAuth }) {
  const [tab, setTab] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // your sign-in logic here
      if (onAuth) await onAuth({ email, password });
    } catch (err) {
      alert(err.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // your sign-up + optional file upload logic here
      if (onAuth) await onAuth({ name, email, password, file });
    } catch (err) {
      alert(err.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-page">
        <div className="auth-app-bar">
          <div className="auth-app-icon">
            <svg viewBox="0 0 24 24" fill="white">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
            </svg>
          </div>
          <span className="auth-app-bar-title">Health</span>
        </div>

        <div className="auth-content">
          <div className="auth-page-title">
            {tab === "signin" ? "Welcome Back" : "Get Started"}
          </div>

          <div className="auth-tabs">
            <button
              className={`auth-tab-btn ${tab === "signin" ? "active" : ""}`}
              onClick={() => setTab("signin")}
            >Sign In</button>
            <button
              className={`auth-tab-btn ${tab === "signup" ? "active" : ""}`}
              onClick={() => setTab("signup")}
            >Create Account</button>
          </div>

          {tab === "signin" && (
            <form onSubmit={handleSignIn}>
              <div className="auth-section-label">Account</div>
              <div className="auth-card">
                <div className="auth-card-row">
                  <div className="auth-row-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <span className="auth-row-label">Email</span>
                  <input
                    className="auth-row-input" type="email"
                    placeholder="you@example.com"
                    value={email} onChange={e => setEmail(e.target.value)} required
                  />
                </div>
                <div className="auth-card-row">
                  <div className="auth-row-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                    </svg>
                  </div>
                  <span className="auth-row-label">Password</span>
                  <input
                    className="auth-row-input" type="password"
                    placeholder="••••••••"
                    value={password} onChange={e => setPassword(e.target.value)} required
                  />
                </div>
              </div>
              <button className="auth-primary-btn" type="submit" disabled={loading}>
                {loading ? <><span className="auth-spinner" /> Signing In...</> : "Sign In"}
              </button>
              <button type="button" className="auth-secondary-btn" onClick={() => setTab("signup")}>
                Create Account
              </button>
            </form>
          )}

          {tab === "signup" && (
            <form onSubmit={handleSignUp}>
              <div className="auth-section-label">Personal Info</div>
              <div className="auth-card">
                <div className="auth-card-row">
                  <div className="auth-row-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                    </svg>
                  </div>
                  <span className="auth-row-label">Full Name</span>
                  <input
                    className="auth-row-input" type="text"
                    placeholder="Jane Doe"
                    value={name} onChange={e => setName(e.target.value)} required
                  />
                </div>
                <div className="auth-card-row">
                  <div className="auth-row-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <span className="auth-row-label">Email</span>
                  <input
                    className="auth-row-input" type="email"
                    placeholder="you@example.com"
                    value={email} onChange={e => setEmail(e.target.value)} required
                  />
                </div>
                <div className="auth-card-row">
                  <div className="auth-row-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                    </svg>
                  </div>
                  <span className="auth-row-label">Password</span>
                  <input
                    className="auth-row-input" type="password"
                    placeholder="••••••••"
                    value={password} onChange={e => setPassword(e.target.value)} required
                  />
                </div>
              </div>

              {/* <div className="auth-section-label">Add Records</div> */}
              <div className="auth-upload-card">
                {/* <div className={`auth-upload-zone ${file ? "has-file" : ""}`}>
                  <input
                    type="file" accept=".csv"
                    onChange={e => setFile(e.target.files[0])}
                  />
                  <div className="auth-upload-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  </div>
                  <div className="auth-upload-zone-title">{file ? "File ready" : "Upload Data"}</div>
                  {!file && <div className="auth-upload-zone-sub">Tap to browse records</div>}
                  {file && <div className="auth-upload-filename">{file.name}</div>}
                </div> */}
                <button className="auth-primary-btn" type="submit" disabled={loading}>
                  {loading ? <><span className="auth-spinner" /> Creating...</> : "Create Account"}
                </button>
              </div>

              {/* <div className="auth-insights-card">
                <div className="auth-insights-header">
                  <span style={{fontSize:"15px"}}>✦</span>
                  <span className="auth-insights-title">Smart Insights</span>
                </div>
                <div className="auth-insights-body">
                  Upload data to see AI personalized<br/>health insights.
                </div>
              </div> */}
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Auth;