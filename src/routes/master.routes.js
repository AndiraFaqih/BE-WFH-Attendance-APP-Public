const express = require('express');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const controller = require('../controllers/master.controller');

const router = express.Router();

// Define routes for Master
router.get('/', verifyToken, isAdmin, controller.getAttendance);
router.post('/addemployee', verifyToken, isAdmin, controller.addEmployee);
router.get('/employeelist', verifyToken, isAdmin, controller.getEmployees);
router.get('/employee/:id', verifyToken, isAdmin, controller.getEmployeeById);
router.put('/:id', verifyToken, isAdmin, controller.updateEmployee);
router.delete('/:id', verifyToken, isAdmin, controller.deleteEmployee);

module.exports = router;