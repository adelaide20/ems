const express = require("express");
const router = express.Router();

const { newEmployee } = require('../controllers/employee')

// create employee
router.post('/new', newEmployee);


module.exports = router