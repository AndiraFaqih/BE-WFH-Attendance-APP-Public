const express = require('express');
const controller = require('../controllers/auth.controller');
const router = express.Router();

// Define routes for Auth
router.post('/login', controller.login);

module.exports = router;