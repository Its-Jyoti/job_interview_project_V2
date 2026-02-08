import React, { useState } from 'react';
import './FormPage.css';
import { useNavigate } from 'react-router-dom';

const FormPage = () => {
    const [domain, setDomain] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [interview_type, setInterviewType] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Ensure all fields are selected
        if (!domain || !difficulty || !interview_type) {
            alert('Please select all fields');
            setLoading(false);
            return;
        }

        // Construct payload to send to InterviewPage
        const payload = {
            domain,
            difficulty,
            interview_type,
        };

        // Navigate to the InterviewPage with the selected preferences
        navigate('/interview', { state: payload });
        setLoading(false); // Stop loading after navigation
    };

    return (
        <div className="form-container">
            <h2>Interview Preferences</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="preference-form">
                <div className="form-group">
                    <label>Domain:</label>
                    <select value={domain} onChange={(e) => setDomain(e.target.value)} required>
                        <option value="">Select Domain</option>
                        <option value="Data Structure">Data Structure</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Cloud Computing">Cloud Computing</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="Data Science">Data Science</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Difficulty:</label>
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required>
                        <option value="">Select Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                        <option value="expert">Expert</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Type:</label>
                    <select value={interview_type} onChange={(e) => setInterviewType(e.target.value)} required>
                        <option value="">Select Type</option>
                        <option value="HR">HR</option>
                        <option value="Technical">Technical</option>
                        <option value="Managerial">Managerial</option>
                        <option value="Behavioral">Behavioral Interview</option>
                    </select>
                </div>

                <button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? 'Generating...' : 'Generate Questions'}
                </button>
            </form>
        </div>
    );
};


export default FormPage;
