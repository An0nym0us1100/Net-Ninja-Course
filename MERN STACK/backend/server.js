require('dotenv').config()

// require express package that was just installed before this step check (onenote)
const express = require('express')
// require mongoose (mongoDB Object Data Modeling tool, mongoDB wrapper)
const mongoose = require('mongoose')
// require to look at workouts.js routes
const workoutRoutes = require('./routes/workouts')


// express app
// creates express app by invoking "express ()" function
const app = express()

// middleware - code between request and send 

// capture data stored in req
app.use(express.json())

// runs for every request that comes in must pass next()
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// old routes (before creating routes folder)
// actions from listening to req and providing response (res) via json
// "/" is local host or root

// app.get('/', (req, res) => {
//     res.json({msg: 'Welcome to the app'})
// })

// only adds workoutRoutes if in /api/workouts/ (specifying the root of routes)
app.use('/api/workouts',workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    // fire function if complete
    .then (() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to DB & listening on port', process.env.PORT)
        })
    })

    // catch error and log in console
    .catch((error) => {
        console.log(error)
    })





