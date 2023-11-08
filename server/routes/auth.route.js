const express = require("express");
const router = express.Router();

const { setAdmin } = require('../controllers/auth')

// create admin
router.post('/set', setAdmin);

module.exports = router