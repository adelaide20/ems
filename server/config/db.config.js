const Pool = require('pg').Pool

const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'ems',
    password: 'password123',
    port: 5432,
})

// connect to this database
// postgres://admin:SgAFmlnnVtIp6AeglxUevzertTWBOtTw@dpg-cl5tuvt6fh7c73cto5e0-a.oregon-postgres.render.com/ems_6oyk

// testing the connection

pool.connect((err, ) => {
    if (err) {
        return console.error('Error acquiring client', err.stack)
    } else {
        console.log("connected to the database");
    }
})
module.exports = pool;