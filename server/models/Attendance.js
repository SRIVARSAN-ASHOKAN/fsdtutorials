const mongoose = require('mongoose');

// Schema for a single attendance record
const attendanceSchema = new mongoose.Schema(
  {
    rollNo:  { type: String, required: true, unique: true, trim: true },
    name:    { type: String, required: true, trim: true },
    dept:    { type: String, required: true, trim: true },
    year:    { type: String, required: true },
    // status can be 'Present', 'Absent', or 'On Duty'
    status:  {
      type: String,
      enum: ['Present', 'Absent', 'On Duty'],
      default: 'Absent',
    },
    date:    { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attendance', attendanceSchema);
