import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login/`,
        { username, password }
      );
      navigate('/form');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="login-container">
      {/* LEFT IMAGE */}
      <div className="login-left">
        <img
          src="/images/background/12.jpg"
          alt="Login background"
          className="login-image"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="login-right">
        <div className="login-form">
          <h2>Login to Your Account</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="forgot-password-link">
              <button
                type="button"
                className="link-button"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>

            {error && <p className="error-message">{error}</p>}

            <div className="signup-link">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                className="link-button"
                onClick={() => navigate('/signup')}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
