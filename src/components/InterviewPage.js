import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./InterviewPage.css";

const InterviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { domain, difficulty, interview_type } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleStartInterview = () => {
    setLoading(true);
    setError("");

    const payload = { domain, difficulty, interview_type };

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
      .catch((err) => {
        console.error(err);
        setError("Something went wrong while fetching questions.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleReadWelcomeMessage = () => {
    const msg =
      "Welcome to Our Company! How do you feel? All the best for your interview!";
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
  };

  useEffect(() => {
    handleReadWelcomeMessage();
    setIsSpeaking(true);

    return () => window.speechSynthesis.cancel();
  }, []);

  const toggleSpeaker = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(!isSpeaking);
  };

  return (
    <div className="interview-container">
      <h2>Welcome to Our Company!</h2>

      {error && <p className="error-message">{error}</p>}

      <button onClick={handleStartInterview} disabled={loading}>
        {loading ? "Fetching Questions..." : "Start Interview"}
      </button>

      <button onClick={toggleSpeaker}>🔊</button>
    </div>
  );
};

export default InterviewPage;
