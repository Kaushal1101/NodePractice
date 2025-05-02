const express = require('express')

// Loads environment variables from dotenv and configures them at the same time
// so we can start using them now
const dotenv = require('dotenv').config()

// Sets up port as 5000 (from .env) or 8000 if not available
const port = process.env.PORT || 8000

// Instantiates express (not a class technically, but a function)
// Basically an instance of the express app, which is an object that 
// - handles HTTP requests
// - manages routes, middleware, errors, etc.
// - powers the backend server
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/movies', require('./routes/movieRoutes'))

// Starts the server and listens for any requests
app.listen(port, () => console.log(`server started on port ${port}`))

