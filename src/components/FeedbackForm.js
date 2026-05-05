import React, { useState } from 'react';

// Initial empty form state
const EMPTY_FORM = {
  name: '',
  email: '',
  contact: '',
  message: '',
};

function FeedbackForm({ onSubmit }) {
  // Controlled form state
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle any input change — updates only the changed field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Validate all fields
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim())     newErrors.name    = 'Student name is required.';
    if (!form.email.trim())    newErrors.email   = 'Email ID is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email))
                               newErrors.email   = 'Enter a valid email address.';
    if (!form.contact.trim())  newErrors.contact = 'Contact number is required.';
    else if (!/^\d{10}$/.test(form.contact))
                               newErrors.contact = 'Enter a valid 10-digit number.';
    if (!form.message.trim())  newErrors.message = 'Feedback message cannot be empty.';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Build feedback object with timestamp and unique id
    const feedback = {
      id: Date.now(),
      ...form,
      timestamp: new Date().toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      }),
    };

    // Pass to parent (App.js manages state)
    onSubmit(feedback);

    // Clear form fields after submission
    setForm(EMPTY_FORM);
    setErrors({});

    // Show success message briefly
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="form-card">
      <div className="form-card-header">
        <div className="section-label">Submit Your Response</div>
        <div className="section-title">Share Your Feedback</div>
      </div>

      <div className="form-card-body">
        {submitted && (
          <div className="success-toast">
            <span>✓</span> Feedback submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Student Name */}
          <div className="field-group">
            <label className="field-label" htmlFor="name">
              Student Name <span>*</span>
            </label>
            <input
              className="field-input"
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Arjun Kumar"
              autoComplete="off"
            />
            {errors.name && <p style={errStyle}>{errors.name}</p>}
          </div>

          {/* Email ID */}
          <div className="field-group">
            <label className="field-label" htmlFor="email">
              Email ID <span>*</span>
            </label>
            <input
              className="field-input"
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. arjun@kce.ac.in"
            />
            {errors.email && <p style={errStyle}>{errors.email}</p>}
          </div>

          {/* Contact No */}
          <div className="field-group">
            <label className="field-label" htmlFor="contact">
              Contact No. <span>*</span>
            </label>
            <input
              className="field-input"
              type="tel"
              id="contact"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              maxLength={10}
            />
            {errors.contact && <p style={errStyle}>{errors.contact}</p>}
          </div>

          {/* Feedback Message */}
          <div className="field-group">
            <label className="field-label" htmlFor="message">
              Feedback Message <span>*</span>
            </label>
            <textarea
              className="field-textarea"
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Share your thoughts about the course, faculty, or facilities..."
              rows={4}
            />
            {errors.message && <p style={errStyle}>{errors.message}</p>}
          </div>

          <button className="submit-btn" type="submit">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

// Inline error style
const errStyle = {
  fontSize: '12px', color: '#c0392b',
  marginTop: '5px', fontWeight: 500,
};

export default FeedbackForm;
