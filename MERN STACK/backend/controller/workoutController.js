const Workout = require('../models/workoutModel')
// require mongoose to check object id
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    // find all workouts in Workout sorted in decending order (workoutModel mongoose export)
    const workouts = await Workout.find().sort({createdAt: -1})

    res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
    // grab id property from route parameter
    const { id } = req.params

    // check if mongoose id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        // must return and terminate here and not continue with code
        return res.status(404).json({error: 'Invalid ID'})
    }

    // check if workout is found
    const workout = await Workout.findById(id)
    if (!workout) {
        return res.status(404).json({error: 'No workout found'})
    }
    // if good then
    res.status(200).json(workout)
}

// create new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    // detect which fields are empty when post request
    // create array of empty fields if any once if statements complete
    let emptyFields =[]

    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    
    // add doc to db
    try {
        const workout = await Workout.create({title, load, reps})
        // status 200 is good and post workout
        res.status(200).json(workout)
    } catch (error) {
        // status 400 is error code, post error message
        res.status(400).json({error: error.message})
    }
}

//delete a workout
const deleteWorkout = async (req, res) => {

    const {id} = req.params

    // check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({error: 'Invalid ID'})
    }

    // find id and delete workout
    const workout = await Workout.findByIdAndDelete({_id: id})

    if (!workout) {
        res.status(400).json({error: 'No workout found'})
    }

    res.status(200).json(workout)
}
//update a workout
const updateWorkout = async (req, res) => {

    // get id of workout to update
    const {id} = req.params

    // check if ID is valid
    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({error: 'Invalid ID'})
    }

    // update ID to db
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    
    // check if workout is valid
    if (!workout) {
        res.status(400).json({error: 'No workout found'})
    }

    // post response
    res.status(200).json(workout)
}

// export
module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}