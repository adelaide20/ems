const pool = require('../config/db.config.js');


// add employment details for a certain employee
exports.addDetails = async(request, response) => {

    // 1. variable holding the data enter 
    const details = {
        employee: request.body.employee,
        position: request.body.position,
        start_date: request.body.start_date,
        salary: request.body.salary
    }

    // fields validation
    if ((details.employee || details.position || details.emp_status || details.start_date || details.salary) === '') {
        response.status(400).send({
            status: 'Failed',
            message: 'All fields must be provided.'
        })
    } else {
        try {

            // check if employee exists
            const checkEmployee = await pool.query(
                `SELECT * FROM employees WHERE emp_id = $1`, [details.employee]
            );

            // respose if the employee exists
            if (checkEmployee.rows.length <= 0) {
                response.status(401).send({
                    status: 'Failed',
                    message: 'Employee does not exist'
                });
            } else {

                // check if employee details has already been added 
                const checkdetails = await pool.query(
                    `SELECT * FROM employment WHERE employee = $1`, [details.employee]
                );

                // respose if the employee exists
                if (checkdetails.rows.length > 0) {
                    response.status(401).send({
                        status: 'Failed',
                        message: 'Employee details already added'
                    });
                } else {
                    // add employment details
                    pool.query(`INSERT INTO employment (employee, position, start_date, salary) 
                        VALUES ($1, $2, $3, $4) RETURNING *`, [details.employee, details.position, details.start_date, details.salary],
                        (error, results) => {
                            if (error) {
                                throw error
                            }
                            response.status(201).send('Employment details added successfully')
                        })
                }

            }
        } catch (error) {
            response.status(400).json({
                message: "Failed to add employment details",
                error: error
            });
        }
    }



}


// get all employees and their employment details
exports.allDetails = (request, response) => {
    try {
        pool.query(`SELECT e.emp_id, e.first_name, e.last_name, e.email, e.gender, e.contactno, p.position, p.emp_status, p.start_date, p.salary, p.end_date
            FROM employees as e, employment as p
            WHERE e.emp_id = p.employee
            AND p.visibility = 'true'
            ORDER BY e.first_name ASC;`, (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        });
    } catch (error) {
        response.status(400).json({
            message: "Failed to get all employees and their details",
            error: error
        });
    }
}


// get an employee and their details
exports.oneEmployee = (request, response) => {

    const emp_id = request.params.emp_id;

    try {
        pool.query(`SELECT e.emp_id, e.first_name, e.last_name, e.email, e.gender, e.contactno, p.position, p.emp_status, p.start_date, p.salary, p.end_date
            FROM employees as e, employment as p
            WHERE e.emp_id = p.employee
            AND p.visibility = 'true'
            AND e.emp_id = $1;`, [emp_id], (error, results) => {
            if (error) {
                throw error
            } else if (results.rows.length === 0) {
                response.status(400).send({
                    status: 'Failed',
                    message: `Employee not found with id: ${emp_id} `
                })
            }
            response.status(200).json(results.rows)
        });
    } catch (error) {
        response.status(400).json({
            message: "Failed to get all employees and their details",
            error: error
        });
    }

}


// update/edit employee and their details
exports.updateDetails = (request, response) => {

    const emp_id = request.params.emp_id;

    const details = {
        position: request.body.position,
        emp_status: request.body.emp_status,
        salary: request.body.salary,
        end_date: request.body.end_date
    }

    try {
        pool.query(`UPDATE employment
        SET position = $1, emp_status = $2, salary = $3, end_date = $4
        WHERE employee = ${emp_id}`, [details.position, details.emp_status, details.salary, details.end_date],
            (error, results) => {
                if (error) {
                    throw error;
                }
                response.status(200).json("Employee details modified");
            }
        );
    } catch (error) {
        response.status(400).json({
            message: "Failed to modify employee details",
            error: error
        });
    }
}


// delete an employee
exports.deleteEmployee = (request, response) => {
    const emp_id = request.params.emp_id;

    try {
        pool.query(`UPDATE employment
        SET visibility = 'false'
        WHERE employee = ${emp_id}`,
            (error, results) => {
                if (error) {
                    throw error;
                }
                response.status(200).json("Employee removed");
            }
        );
    } catch (error) {
        response.status(400).json({
            message: "Failed to remove employee",
            error: error
        });
    }
}