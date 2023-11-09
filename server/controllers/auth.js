const pool = require('../config/db.config');
const fs = require('fs');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const config = require("../config/auth.config")


// registering an admin 
exports.setAdmin = async(request, response) => {

    // file holding the admin details
    const admin = JSON.parse(fs.readFileSync("/Users/adelaide/Desktop/ems/server/db/auth.db.js", 'utf-8'))

    // checking if the file is not empty
    if (admin.length > 0) {
        // generating salt
        const salt = await bcrypt.genSalt()
            // hashing the password
        password = await bcrypt.hash(admin[0].password, salt)

        // insert the admin details into the table/db
        pool.query(`INSERT INTO users (name, email, password) 
            VALUES ($1, $2, $3) RETURNING *`, [admin[0].name, admin[0].email, password], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Admin added succesfuly`)
        })
    } else {
        response.status(400).send(`The file doesn't have data`)
    }
}



// admin login
exports.login = async(request, response) => {
    // 1. variable holding the data enter 
    const data = {
        email: request.body.email,
        password: request.body.password
    }

    // field validation
    if ((data.email || data.password) === '') {
        response.status(400).send({
            status: 'Failed',
            message: 'All fields must be provided.'
        })

    }

    // 2. check if the user exists
    const user = await pool.query(`SELECT * FROM users WHERE email = $1 `, [data.email]);

    // 3. if the user doesn't exist then send a response
    if (user.rows.length === 0) {
        response.status(401).send({
            status: 'Failed',
            message: 'Invalid email or password provided.'
        });
    } else {
        // 4. Comparing the passwords
        bcrypt.compare(data.password, user.rows[0].password, (err, result) => { //Comparing the passwords
            if (err) {
                response.status(500).json({
                    error: err,
                });
            } else if (result === true) { //Checking if credentials match
                // 4. generate a token
                const token = jwt.sign({
                    id: user.id
                }, config.secret, {
                    expiresIn: 14400 //4 hours
                });
                response.status(200).json({
                    message: "Signed in successfully!",
                    token: token,
                });
            } else {
                //Declaring the errors
                if (result != true)
                    response.status(400).json({
                        error: "incorect email or password",
                    });
            }
        })
    }
}