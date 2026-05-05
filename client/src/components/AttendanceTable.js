import React from 'react';

function getInitials(name) {
  return name.trim().split(' ').map(w => w[0]?.toUpperCase()).slice(0, 2).join('');
}

function statusClass(status) {
  if (status === 'Present') return 'present';
  if (status === 'Absent')  return 'absent';
  return 'od';
}

// AttendanceTable: receives records + callback handlers from App
function AttendanceTable({ records, loading, error, onStatusChange, onDelete }) {
  if (loading) {
    return (
      <div className="loading-wrap">
        <div className="spinner"></div>
        Fetching attendance records from server...
      </div>
    );
  }

  if (error) {
    return <div className="error-wrap">⚠ {error}</div>;
  }

  if (records.length === 0) {
    return (
      <div className="table-card">
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <div className="empty-text">
            No attendance records found.<br />
            Click "Load Sample Data" to get started.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="table-card">
      {/* Table Header */}
      <div className="table-header-row">
        <span className="th">Roll No.</span>
        <span className="th">Student Name</span>
        <span className="th">Dept</span>
        <span className="th th-yr">Year</span>
        <span className="th">Status</span>
        <span className="th">Date</span>
        <span className="th">Action</span>
      </div>

      {/* Table Rows — rendered dynamically from records state */}
      {records.map((rec) => (
        <div className="att-row" key={rec._id}>
          <span className="cell-roll">{rec.rollNo}</span>

          <span className="cell-name">
            <span className="name-avatar">{getInitials(rec.name)}</span>
            {rec.name}
          </span>

          <span className="cell-dept">{rec.dept}</span>
          <span className="cell-yr">{rec.year}</span>

          {/* PUT: dropdown triggers status update */}
          <span>
            <select
              className={`status-select ${statusClass(rec.status)}`}
              value={rec.status}
              onChange={(e) => onStatusChange(rec._id, e.target.value)}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="On Duty">On Duty</option>
            </select>
          </span>

          <span className="cell-date">{rec.date}</span>

          {/* DELETE: button triggers record removal */}
          <span>
            <button
              className="del-btn"
              onClick={() => onDelete(rec._id, rec.name)}
              title="Delete record"
            >
              ✕
            </button>
          </span>
        </div>
      ))}
    </div>
  );
}

export default AttendanceTable;
