import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./InterviewPage.css";

const InterviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // values coming from previous page
  const { domain, difficulty, interview_type } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleStartInterview = () => {
    setLoading(true);
    setError("");

    const payload = {
      domain,
      difficulty,
      interview_type,
    };

    console.log("Sending payload:", payload); // 🔍 IMPORTANT

    fetch(`${process.env.REACT_APP_API_URL}/api/generate-questions/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify(payload),
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    if (data.questions && data.questions.length > 0) {
      navigate("/questions", { state: { questions: data.questions } });
    } else {
      setError("No questions generated. Please try again.");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
    setError("An error occurred: " + error.message);
  })
  .finally(() => {
    setLoading(false);
  });

  const handleReadWelcomeMessage = () => {
    const message =
      "Welcome to Our Company! How do you feel? All the best for your interview!";
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    handleReadWelcomeMessage();
    setIsSpeaking(true);

    return () => {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    };
  }, []);

  const toggleSpeaker = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
    } else {
      handleReadWelcomeMessage();
    }
    setIsSpeaking(!isSpeaking);
  };

  return (
    <div className="interview-container">
      <h2 className="welcome-message">Welcome to Our Company!</h2>
      <p className="comfort-message">
        How do you feel? All the best for your interview!
      </p>

      {error && <p className="error-message">{error}</p>}

      <button
        className="start-button"
        onClick={handleStartInterview}
        disabled={loading}
      >
        {loading ? "Fetching Questions..." : "Start Interview"}
      </button>

      <button onClick={toggleSpeaker}>🔊</button>
    </div>
  );
};

export default InterviewPage;


