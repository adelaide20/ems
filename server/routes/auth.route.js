const express = require("express");
const router = express.Router();

const { setAdmin, login } = require('../controllers/auth')

// create admin
router.post('/set', setAdmin);

// admin login
router.post('/login', login);

module.exports = router