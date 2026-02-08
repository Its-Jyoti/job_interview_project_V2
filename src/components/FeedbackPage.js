import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Feedback.css';

const FeedbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { userAnswer, question } = location.state || {};

  const [feedback, setFeedback] = useState('');
  const [reward, setReward] = useState(0);
  const [error, setError] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleReadFeedback = useCallback(() => {
    if (!feedback) return;
    const utterance = new SpeechSynthesisUtterance(feedback);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
  }, [feedback]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/feedback/`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user_answer: userAnswer,
              question: question,
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch feedback');
        }

        const data = await response.json();
        setFeedback(data.feedback);
        setReward(data.score);
      } catch (err) {
        console.error(err);
        setError('Error fetching feedback. Please try again.');
      }
    };

    if (userAnswer && question) {
      fetchFeedback();
    }

    return () => window.speechSynthesis.cancel();
  }, [userAnswer, question]);

  useEffect(() => {
    if (feedback) {
      handleReadFeedback();
    }
  }, [feedback, handleReadFeedback]);

  const toggleSpeaker = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      handleReadFeedback();
    }
  };

  const renderStars = () => {
    const totalStars = 5;
    const filledStars = Math.round((reward / 100) * totalStars);

    return (
      <div className="star-rating">
        {[...Array(totalStars)].map((_, index) => (
          <span
            key={index}
            className={index < filledStars ? 'filled-star' : 'empty-star'}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="feedback-container">
      <h2>Feedback</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {feedback ? (
        <>
          <div className="feedback-header">
            <h3>Your Feedback</h3>
            <button onClick={toggleSpeaker}>
              {isSpeaking ? '🔇' : '🔊'}
            </button>
          </div>

          <p>{feedback}</p>

          <h4>Your Reward</h4>
          {renderStars()}

          <p>Thank you for using our system!</p>

          <button
            className="back-button"
            onClick={() => navigate('/questions')}
          >
            Back to Questions
          </button>
        </>
      ) : (
        <p>Loading feedback...</p>
      )}
    </div>
  );
};

export default FeedbackPage;
