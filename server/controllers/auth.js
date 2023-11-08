const pool = require('../config/db.config');
const fs = require('fs')
const bcrypt = require("bcrypt");


// registering an admin 
exports.setAdmin = async(request, response) => {
  
    const admin = JSON.parse(fs.readFileSync('/Users/rorisang/Desktop/ems/server/db/auth.db.js', 'utf-8'))


//    checking if the file is not empty
if(admin.length>0){
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
}
else{
    response.status(400).send(`The file doesn't have data`)
}

   
}