import { useState } from "react";
import { loginUser, signupUser } from "../services/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  .auth-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0e1a14;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .auth-root::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(74, 222, 128, 0.08) 0%, transparent 70%);
    top: -100px;
    right: -150px;
    pointer-events: none;
  }

  .auth-root::after {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(52, 211, 153, 0.06) 0%, transparent 70%);
    bottom: -80px;
    left: -100px;
    pointer-events: none;
  }

  .auth-card {
    width: 100%;
    max-width: 400px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 24px;
    padding: 48px 40px;
    position: relative;
    backdrop-filter: blur(20px);
    z-index: 1;
    animation: fadeUp 0.5s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .auth-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #4ade80, #34d399);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 28px;
    font-size: 22px;
  }

  .auth-heading {
    font-family: 'DM Serif Display', serif;
    font-size: 28px;
    color: #f0faf4;
    margin: 0 0 4px 0;
    letter-spacing: -0.3px;
  }

  .auth-subheading {
    font-size: 13.5px;
    color: rgba(255,255,255,0.35);
    margin: 0 0 36px 0;
    font-weight: 300;
  }

  .auth-error {
    background: rgba(248, 113, 113, 0.1);
    border: 1px solid rgba(248, 113, 113, 0.25);
    color: #fca5a5;
    font-size: 13px;
    padding: 10px 14px;
    border-radius: 10px;
    margin-bottom: 20px;
    animation: shake 0.3s ease;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
  }

  .auth-field {
    margin-bottom: 16px;
    animation: fadeUp 0.4s ease both;
  }

  .auth-field:nth-child(1) { animation-delay: 0.05s; }
  .auth-field:nth-child(2) { animation-delay: 0.10s; }
  .auth-field:nth-child(3) { animation-delay: 0.15s; }

  .auth-label {
    display: block;
    font-size: 11.5px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    margin-bottom: 7px;
  }

  .auth-input {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 12px;
    padding: 13px 16px;
    font-size: 14px;
    color: #e8f5ee;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }

  .auth-input::placeholder {
    color: rgba(255,255,255,0.2);
  }

  .auth-input:focus {
    border-color: rgba(74, 222, 128, 0.45);
    background: rgba(74, 222, 128, 0.04);
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.08);
  }

  .auth-submit {
    width: 100%;
    margin-top: 24px;
    padding: 14px;
    background: linear-gradient(135deg, #4ade80, #22c55e);
    border: none;
    border-radius: 12px;
    color: #052e10;
    font-size: 14.5px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(74, 222, 128, 0.25);
  }

  .auth-submit:hover {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(74, 222, 128, 0.35);
  }

  .auth-submit:active {
    transform: translateY(0);
  }

  .auth-footer {
    margin-top: 24px;
    text-align: center;
    font-size: 13.5px;
    color: rgba(255,255,255,0.3);
  }

  .auth-toggle {
    background: none;
    border: none;
    color: #4ade80;
    font-size: 13.5px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    padding: 0;
    margin-left: 4px;
    font-weight: 500;
    transition: opacity 0.15s;
  }

  .auth-toggle:hover {
    opacity: 0.75;
  }

  .auth-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 28px 0 0;
  }

  .auth-divider-line {
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.07);
  }

  .auth-divider-text {
    font-size: 11px;
    color: rgba(255,255,255,0.2);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
`;

function Auth({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        const data = await loginUser({
          email: form.email,
          password: form.password
        });
        if (data.token) {
          localStorage.setItem("token", data.token);
          onAuth();
        } else {
          setError(data.error || "Login failed");
        }
      } else {
        const data = await signupUser(form);
        if (data.success) {
          setIsLogin(true);
        } else {
          setError(data.error || "Signup failed");
        }
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-root">
        <div className="auth-card">
          <div className="auth-icon">🌿</div>

          <h2 className="auth-heading">
            {isLogin ? "Welcome back" : "Create account"}
          </h2>
          <p className="auth-subheading">
            {isLogin
              ? "Sign in to continue your health journey"
              : "Start tracking your health today"}
          </p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="auth-field">
                <label className="auth-label">Full Name</label>
                <input
                  className="auth-input"
                  name="name"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="auth-field">
              <label className="auth-label">Email</label>
              <input
                className="auth-input"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input
                className="auth-input"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="auth-submit" type="submit">
              {isLogin ? "Sign in" : "Create account"}
            </button>
          </form>

          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">or</span>
            <div className="auth-divider-line" />
          </div>

          <p className="auth-footer">
            {isLogin ? "New here?" : "Already have an account?"}
            <button className="auth-toggle" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Create account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default Auth;