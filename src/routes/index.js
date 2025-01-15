
const authRoutes = require('./auth.routes');
const attendanceRoutes = require('./attendance.routes');
const adminRoutes = require('./master.routes');
const express = require('express');
const router = express.Router();

// Define routes
router.use('/api/auth', authRoutes);
router.use('/api/attendance', attendanceRoutes);
router.use('/api/admin', adminRoutes);

module.exports = router;
