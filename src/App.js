import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup.jsx';
import FormPage from './components/FormPage';
import InterviewPage from './components/InterviewPage';
import ResultPage from './components/ResultPage';
import QuestionsPage from './components/QuestionsPage';
import FeedbackPage from './components/FeedbackPage';
import GenerateQuestion from './components/GenerateQuestion';
import CorrectAnswer from './components/CorrectAnswer';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/generate-question" element={<GenerateQuestion />} />
        <Route path="/correct-answer" element={<CorrectAnswer />} />
      </Routes>
    </Router>
  );
};

export default App;
