const controller = require('../controllers/attendance.controller');
const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/multer.middleware');
const { verifyToken } = require('../middlewares/auth.middleware');

// Define routes for Attendance
router.get('/', verifyToken, controller.getAttendanceByEmployee);
router.post('/mark', verifyToken, upload.single('photo'), controller.markAttendance);

module.exports = router;