import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AttendanceTable from './components/AttendanceTable';
import Toast from './components/Toast';

const API = '/api/attendance';

function App() {
  const [records, setRecords]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [toast, setToast]       = useState(null);   // { msg, type }

  // ── Show a toast notification then auto-hide after 3s ──
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── GET: fetch all attendance records ──────────────────
  const fetchAttendance = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get(API);
      setRecords(data);
    } catch (err) {
      setError('Failed to fetch attendance. Is the server running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  // ── PUT: update a student's attendance status ──────────
  const handleStatusChange = async (id, newStatus) => {
    try {
      const { data } = await axios.put(`${API}/${id}`, { status: newStatus });
      // Update state instantly — no page refresh
      setRecords((prev) =>
        prev.map((r) => (r._id === id ? data : r))
      );
      showToast(`Status updated to "${newStatus}"`, 'success');
    } catch (err) {
      showToast('Failed to update status.', 'error');
    }
  };

  // ── DELETE: remove an incorrect attendance record ──────
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete attendance record for ${name}?`)) return;
    try {
      await axios.delete(`${API}/${id}`);
      // Remove from state instantly — no page refresh
      setRecords((prev) => prev.filter((r) => r._id !== id));
      showToast(`Record for "${name}" deleted.`, 'info');
    } catch (err) {
      showToast('Failed to delete record.', 'error');
    }
  };

  // ── Seed sample data (demo helper) ────────────────────
  const handleSeed = async () => {
    try {
      await axios.post(`${API}/seed`);
      showToast('Sample data seeded!', 'success');
      fetchAttendance();
    } catch {
      showToast('Seed failed.', 'error');
    }
  };

  // ── Derived stats ──────────────────────────────────────
  const stats = records.reduce(
    (acc, r) => {
      if (r.status === 'Present') acc.present++;
      else if (r.status === 'Absent') acc.absent++;
      else acc.od++;
      return acc;
    },
    { present: 0, absent: 0, od: 0 }
  );

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
  });

  return (
    <div>
      {/* ── Header ── */}
      <header className="app-header">
        <div className="college-logo">KEC</div>
        <div className="header-text">
          <div className="college-name">Kongu Engineering College, Erode — 638060</div>
          <div className="header-title">Student Attendance Portal</div>
          <div className="header-sub">24CSC42 Full Stack Development &nbsp;|&nbsp; Tutorial 2</div>
        </div>
        <div className="header-date">{today}</div>
      </header>

      {/* ── Stats Bar ── */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-dot total"></span>
          <span className="stat-label">Total:</span>
          <span className="stat-val">{records.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-dot present"></span>
          <span className="stat-label">Present:</span>
          <span className="stat-val">{stats.present}</span>
        </div>
        <div className="stat-item">
          <span className="stat-dot absent"></span>
          <span className="stat-label">Absent:</span>
          <span className="stat-val">{stats.absent}</span>
        </div>
        <div className="stat-item">
          <span className="stat-dot od"></span>
          <span className="stat-label">On Duty:</span>
          <span className="stat-val">{stats.od}</span>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="main-content">
        <div className="section-header">
          <div>
            <div className="section-title">Attendance Register</div>
            <div className="section-sub">
              Dept of CSE &mdash; 2025-26 Even Semester
            </div>
          </div>
          <button className="seed-btn" onClick={handleSeed}>
            ⊕ Load Sample Data
          </button>
        </div>

        <AttendanceTable
          records={records}
          loading={loading}
          error={error}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </main>

      {/* ── Toast Notification ── */}
      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  );
}

export default App;
