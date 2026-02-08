import React, { useState } from "react";
import "./ForgotPassword.css"; // Link to your CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate an API request
    if (email === "") {
      setError("Email is required");
      return;
    }

    // Simulate sending reset email (you would integrate this with your backend here)
    setMessage("A password reset link has been sent to your email.");
    setError("");
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h2>Forgot Password</h2>
        <p className="description">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Send Reset Link</button>
        </form>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="back-to-login">
          Remembered your password? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;