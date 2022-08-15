const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    reps: {
        type: Number,
        required: false,
      },
    weight: {
        type: Number,
      }
})
const Workout = mongoose.model('Workout', workoutSchema);


exports.Workout = Workout