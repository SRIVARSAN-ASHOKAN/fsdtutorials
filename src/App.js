import React, { useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

function App() {
  // State to store all feedback entries
  const [feedbacks, setFeedbacks] = useState([]);

  // Called by FeedbackForm on submit — adds new entry to state
  const handleFeedbackSubmit = (newFeedback) => {
    setFeedbacks((prev) => [newFeedback, ...prev]);
  };

  return (
    <div>
      {/* ── Header ── */}
      <header className="app-header">
        <div className="college-logo">KEC</div>
        <div className="header-text">
          <div className="college-name">Kongu Engineering College, Erode — 638060</div>
          <div className="header-title">Student Feedback Application</div>
          <div className="header-sub">
            24CSC42 Full Stack Development &nbsp;|&nbsp; Tutorial 1
          </div>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <main className="main-content">
        {/* Left: Form */}
        <FeedbackForm onSubmit={handleFeedbackSubmit} />

        {/* Right: List */}
        <FeedbackList feedbacks={feedbacks} />
      </main>
    </div>
  );
}

export default App;
