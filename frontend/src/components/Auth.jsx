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
    width: 28px;
    height: 28px;
    border-radius: 7px;
    background: #ff2d55;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .auth-app-bar-title {
    font-size: 17px;
    font-weight: 600;
    color: #1c1c1e;
  }

  .auth-content {
    padding: 28px 20px 40px;
    max-width: 480px;
    margin: 0 auto;
  }

  .auth-page-title {
    font-size: 28px;
    font-weight: 700;
    color: #1c1c1e;
    margin-bottom: 24px;
  }

  .auth-tabs {
    display: flex;
    margin-bottom: 20px;
  }

  .auth-tab-btn {
    flex: 1;
    padding: 10px 0;
    border: none;
    background: #e5e5ea;
    font-size: 14px;
    font-weight: 600;
    color: #8e8e93;
    cursor: pointer;
  }

  .auth-tab-btn:first-child { border-radius: 10px 0 0 10px; }
  .auth-tab-btn:last-child { border-radius: 0 10px 10px 0; }

  .auth-tab-btn.active {
    background: #ff2d55;
    color: white;
  }

  .auth-section-label {
    font-size: 13px;
    font-weight: 600;
    color: #8e8e93;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .auth-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 20px;
  }

  .auth-card-row {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    border-bottom: 0.5px solid #f2f2f7;
    gap: 12px;
  }

  .auth-card-row:last-child { border-bottom: none; }

  .auth-row-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #ff2d55;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .auth-row-label {
    font-size: 15px;
    color: #1c1c1e;
    flex: 1;
  }

  .auth-row-input {
    flex: 1.4;
    border: none;
    outline: none;
    font-size: 15px;
    text-align: right;
    background: transparent;
  }

  .auth-primary-btn {
    width: 100%;
    padding: 15px;
    background: #ff2d55;
    border: none;
    border-radius: 14px;
    color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }

  .auth-secondary-btn {
    width: 100%;
    padding: 15px;
    background: white;
    border: none;
    border-radius: 14px;
    color: #ff2d55;
    font-size: 16px;
    font-weight: 600;
    margin-top: 10px;
  }

  .auth-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: white;
    border-radius: 50%;
    animation: auth-spin 0.7s linear infinite;
  }

  @keyframes auth-spin {
    to { transform: rotate(360deg); }
  }
`;

function Auth({ onAuth }) {

  const [tab, setTab] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
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
      if (onAuth) await onAuth({ name, email, password });
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
            >
              Sign In
            </button>

            <button
              className={`auth-tab-btn ${tab === "signup" ? "active" : ""}`}
              onClick={() => setTab("signup")}
            >
              Create Account
            </button>
          </div>

          {tab === "signin" && (
            <form onSubmit={handleSignIn}>

              <div className="auth-section-label">Account</div>

              <div className="auth-card">

                <div className="auth-card-row">
                  <div className="auth-row-icon">📧</div>
                  <span className="auth-row-label">Email</span>

                  <input
                    className="auth-row-input"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="auth-card-row">
                  <div className="auth-row-icon">🔒</div>
                  <span className="auth-row-label">Password</span>

                  <input
                    className="auth-row-input"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>

              </div>

              <button className="auth-primary-btn" type="submit" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <button
                type="button"
                className="auth-secondary-btn"
                onClick={() => setTab("signup")}
              >
                Create Account
              </button>

            </form>
          )}

          {tab === "signup" && (
            <form onSubmit={handleSignUp}>

              <div className="auth-section-label">Personal Info</div>

              <div className="auth-card">

                <div className="auth-card-row">
                  <div className="auth-row-icon">👤</div>
                  <span className="auth-row-label">Full Name</span>

                  <input
                    className="auth-row-input"
                    type="text"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="auth-card-row">
                  <div className="auth-row-icon">📧</div>
                  <span className="auth-row-label">Email</span>

                  <input
                    className="auth-row-input"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="auth-card-row">
                  <div className="auth-row-icon">🔒</div>
                  <span className="auth-row-label">Password</span>

                  <input
                    className="auth-row-input"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>

              </div>

              <button className="auth-primary-btn" type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </button>

            </form>
          )}

        </div>
      </div>
    </>
  );
}

export default Auth;