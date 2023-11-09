const express = require("express");
const router = express.Router();

const { newEmployee, allEmployees } = require('../controllers/employee')

// create employee
router.post('/new', newEmployee);

// list all employees
router.get('/list', allEmployees);


module.exports = router