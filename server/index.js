const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const attendanceRoutes = require('./routes/attendance');

const app = express();

// ── Middleware ──
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// ── Routes ──
app.use('/api/attendance', attendanceRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Attendance API running' });
});

// ── MongoDB Connection + Start Server ──
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not defined in .env file');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });