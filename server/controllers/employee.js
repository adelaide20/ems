const pool = require('../config/db.config.js');


// add new employee
exports.newEmployee = async(request, response) => {
    // 1. variable holding the data enter 
    const employee = {
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        gender: request.body.gender,
        contactno: request.body.contactno
    }

    // fields validation
    if ((employee.first_name || employee.last_name || employee.email || employee.gender || employee.contactno) === '') {
        response.status(400).send({
            status: 'Failed',
            message: 'All fields must be provided.'
        })
    }

    try {

        // check if employee exists
        const checkEmployee = await pool.query(
            `SELECT * FROM employees WHERE email = $1`, [employee.email]
        );

        // respose if the employee exists
        if (checkEmployee.rows.length > 0) {
            response.status(401).send({
                status: 'Failed',
                message: 'Employee already exists'
            });
        } else {
            // add an employee
            pool.query(`INSERT INTO employees (first_name, last_name, email, gender, contactno) 
                VALUES ($1, $2, $3, $4, $5) RETURNING *`, [employee.first_name, employee.last_name, employee.email, employee.gender, employee.contactno],
                (error, results) => {
                    if (error) {
                        throw error
                    }
                    response.status(201).send('Employee added successfully')
                })
        }

    } catch (error) {
        response.status(400).json({
            message: "Failed to add an employee",
            error: error
        });
    }

}



// get all employees
exports.allEmployees = (request, response) => {

    try {
        pool.query(`SELECT * FROM employees 
        ORDER BY first_name ASC;`, (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        });
    } catch (error) {
        response.status(400).json({
            message: "Failed to get all employees",
            error: error
        });
    }

}