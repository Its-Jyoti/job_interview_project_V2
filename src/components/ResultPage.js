import React from 'react';

const ResultPage = () => {
    const answers = JSON.parse(localStorage.getItem('answers')) || {};
    const correctAnswers = JSON.parse(localStorage.getItem('correctAnswers')) || {}; // Assuming correct answers are stored in localStorage

    const feedback = Object.keys(answers).map((key, index) => {
        const isCorrect = answers[key] === correctAnswers[key]; // Check if the user's answer is correct
        return (
            <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h4>Question {parseInt(key) + 1}:</h4>
                <p>Your Answer: {answers[key]}</p>
                <p>
                    Feedback: {isCorrect ? 'Correct!' : 'Incorrect. Keep improving!'}
                </p>
                {isCorrect ? null : (
                    <p>Correct Answer: {correctAnswers[key]}</p> // Show correct answer if user's answer is incorrect
                )}
            </div>
        );
    });

    const score = Object.keys(answers).reduce((total, key) => {
        return total + (answers[key] === correctAnswers[key] ? 10 : 0);
    }, 0); // Calculate score based on correct answers

    return (
        <div>
            <h2>Your Interview Feedback</h2>
            {feedback.length > 0 ? feedback : <p>No answers found.</p>}
            <h3>Total Score: {score}/100</h3>
        </div>
    );
};

export default ResultPage;  