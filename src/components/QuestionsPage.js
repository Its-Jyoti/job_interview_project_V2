import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './QuestionsPage.css';

const QuestionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions } = location.state || { questions: [] };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState('');

  const { transcript, resetTranscript } = useSpeechRecognition();

  // If no questions
  if (!questions.length) {
    return <p style={{ color: 'red' }}>No questions found!</p>;
  }

  const header = questions[0];
  const formattedQuestions = questions.slice(1);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < formattedQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserAnswer('');
      resetTranscript();
    } else {
      alert('You have reached the end of the questions.');
    }
  };

  const handleSubmit = async () => {
    if (!userAnswer) {
      alert('Please provide an answer before submitting.');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/feedback/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_answer: userAnswer,
            question: formattedQuestions[currentQuestionIndex],
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get feedback');
      }

      await response.json(); // response is validated, no unused variable

      navigate('/feedback', {
        state: {
          userAnswer,
          question: formattedQuestions[currentQuestionIndex],
        },
      });
    } catch (err) {
      console.error('Error fetching feedback:', err);
      setError('Error fetching feedback. Please try again.');
    }
  };

  const handleVoiceRecognition = () => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert('Sorry, your browser does not support speech recognition.');
      return;
    }

    if (isListening) {
      SpeechRecognition.stopListening();
      setUserAnswer(transcript);
      resetTranscript();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }

    setIsListening(!isListening);
  };

  const handleReadQuestion = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(
        formattedQuestions[currentQuestionIndex]
      );
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
    }
  };

  return (
    <div className="questions-page">
      <h1 className="header-title">Interview</h1>
      <h2 className="question-header">{header}</h2>
      <h3 className="current-question">
        {formattedQuestions[currentQuestionIndex]}
      </h3>

      <textarea
        className="answer-input"
        placeholder="Type your answer..."
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />

      <div className="button-container">
        <button
          className="primary-btn"
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex >= formattedQuestions.length - 1}
        >
          Next Question
        </button>

        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>

        <button className="mic-btn" onClick={handleVoiceRecognition}>
          {isListening ? '🎙️ Stop' : '🎙️ Start'}
        </button>

        <button className="speaker-btn" onClick={handleReadQuestion}>
          {isSpeaking ? '🔇' : '🔊'}
        </button>
      </div>

      <p className="question-counter">
        Question {currentQuestionIndex + 1} of {formattedQuestions.length}
      </p>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default QuestionsPage;
