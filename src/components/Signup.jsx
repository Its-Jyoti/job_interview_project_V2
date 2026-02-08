import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/signup/`,
        { username, password }
      );
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="signup-container">
      {/* LEFT SIDE IMAGE */}
      <div className="signup-left">
        <img
          src="/images/background/12.jpg"
          alt="Signup background"
          className="signup-image"
        />
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="signup-right">
        <div className="signup-form">
          <h2>Create a Free Account</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="signup-button">
              Register
            </button>

            {error && <p className="error-message">{error}</p>}

            <div className="login-link">
              Already have an account? <a href="/login">Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
