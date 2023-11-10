const express = require("express");
const router = express.Router();

const { newEmployee, allEmployees } = require('../controllers/employee')
const { addDetails, allDetails, oneEmployee, updateDetails, deleteEmployee } = require('../controllers/employment')

// ########## Employee Routes ########## //

// create employee
router.post('/new', newEmployee);

// list all employees
router.get('/emps', allEmployees);


// ########## Employment Details Routes ########## //

// add employment details
router.post('/employ', addDetails);

// list employees with their employment details
router.get('/list', allDetails);

// list employees with their employment details
router.get('/one/:emp_id', oneEmployee);


// update employee details
router.put('/update/:emp_id', updateDetails);


// delete employee 
router.get('/remove/:emp_id', deleteEmployee);

module.exports = router