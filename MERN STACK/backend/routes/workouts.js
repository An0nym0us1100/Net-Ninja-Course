const express = require('express')

// import docs
const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
} = require('../controller/workoutController')

// create router
const router = express.Router()

// routes: adding request handlers to router

// GET all workouts
router.get('/', getWorkouts)

// GET a single workout
router.get('/:id', getWorkout)

// POST a new workout (Create new workout)
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// Update a workout
router.patch('/:id', (updateWorkout))

// export router
module.exports = router 