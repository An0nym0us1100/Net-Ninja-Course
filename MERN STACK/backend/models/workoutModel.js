const mongoose = require('mongoose')

// function to create new schema
const Schema = mongoose.Schema

// define schema
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, {timestamps: true})

// define model 'Workout'
module.exports = mongoose.model('Workout', workoutSchema)
