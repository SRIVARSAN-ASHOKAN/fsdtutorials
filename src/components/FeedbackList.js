import React from 'react';

// Get initials from full name for avatar
function getInitials(name) {
  return name
    .trim()
    .split(' ')
    .map((w) => w[0]?.toUpperCase())
    .slice(0, 2)
    .join('');
}

// FeedbackList receives feedbacks array from App (parent)
function FeedbackList({ feedbacks }) {
  return (
    <div className="list-card">
      <div className="list-card-header">
        <div>
          <div className="section-label" style={{ color: '#0f2044' }}>
            Responses Received
          </div>
          <div className="section-title">Feedback List</div>
        </div>
        <div className="count-badge">{feedbacks.length}</div>
      </div>

      <div className="list-card-body">
        {feedbacks.length === 0 ? (
          /* Empty state */
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <div className="empty-text">
              No feedback submitted yet.<br />
              Be the first to share your response!
            </div>
          </div>
        ) : (
          /* Render each feedback entry — newest first (already sorted in App) */
          feedbacks.map((fb) => (
            <div className="feedback-item" key={fb.id}>
              <div className="fi-header">
                <div className="fi-avatar">{getInitials(fb.name)}</div>
                <div>
                  <div className="fi-name">{fb.name}</div>
                  <div className="fi-time">{fb.timestamp}</div>
                </div>
              </div>

              <div className="fi-meta">
                <span className="fi-chip">✉ {fb.email}</span>
                <span className="fi-chip">📞 {fb.contact}</span>
              </div>

              <div className="fi-msg">{fb.message}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FeedbackList;
