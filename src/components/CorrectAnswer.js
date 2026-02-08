// CorrectAnswer.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CorrectAnswer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { question } = location.state || {};

    // Assuming you have a function to get the correct answer based on the question
    const correctAnswer = "The correct answer will be fetched here based on the question."; // Fetch this from your data source

    return (
        <div>
            <h2>Correct Answer</h2>
            <p><strong>Question:</strong> {question}</p>
            <p><strong>Correct Answer:</strong> {correctAnswer}</p>
            <button onClick={() => navigate('/feedback')}>Back to Feedback</button>
        </div>
    );
};

export default CorrectAnswer;
