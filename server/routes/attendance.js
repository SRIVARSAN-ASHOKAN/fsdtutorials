const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// ── GET /api/attendance ──────────────────────────────────────
// Fetch all attendance records
router.get('/', async (req, res) => {
  try {
    const records = await Attendance.find().sort({ rollNo: 1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// ── PUT /api/attendance/:id ──────────────────────────────────
// Update attendance status of a specific student
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Present', 'Absent', 'On Duty'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }
    const updated = await Attendance.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }   // return the updated document
    );
    if (!updated) return res.status(404).json({ message: 'Record not found.' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// ── DELETE /api/attendance/:id ───────────────────────────────
// Delete an incorrect attendance record
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Attendance.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Record not found.' });
    res.json({ message: 'Record deleted successfully.', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// ── POST /api/attendance/seed ────────────────────────────────
// Seed sample data (only for demo — call once)
router.post('/seed', async (req, res) => {
  try {
    await Attendance.deleteMany({});
    const today = new Date().toLocaleDateString('en-IN');
    const sample = [
      { rollNo: '22CSA001', name: 'Aakash Raja',     dept: 'CSE', year: 'III', status: 'Present', date: today },
      { rollNo: '22CSA002', name: 'Bharathi Devi',   dept: 'CSE', year: 'III', status: 'Absent',  date: today },
      { rollNo: '22CSA003', name: 'Chandru Selvam',  dept: 'CSE', year: 'III', status: 'Present', date: today },
      { rollNo: '22CSA004', name: 'Deepika Priya',   dept: 'CSE', year: 'III', status: 'On Duty', date: today },
      { rollNo: '22CSA005', name: 'Eswaran Kumar',   dept: 'CSE', year: 'III', status: 'Absent',  date: today },
      { rollNo: '22CSA006', name: 'Fathima Begum',   dept: 'CSE', year: 'III', status: 'Present', date: today },
      { rollNo: '22CSA007', name: 'Gowtham Raj',     dept: 'CSE', year: 'III', status: 'Present', date: today },
      { rollNo: '22CSA008', name: 'Harini Meena',    dept: 'CSE', year: 'III', status: 'Absent',  date: today },
    ];
    const inserted = await Attendance.insertMany(sample);
    res.status(201).json({ message: 'Seeded successfully.', count: inserted.length });
  } catch (err) {
    res.status(500).json({ message: 'Seed error: ' + err.message });
  }
});

module.exports = router;
