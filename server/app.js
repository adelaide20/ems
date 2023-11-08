const express = require('express')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 3000

// importing db configuration
require('./config/db.config')

// basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Employee Management System' })
})

// listening to the port
app.listen(port, () => {
    console.log(`App running on port http://localhost:${port}`)
})