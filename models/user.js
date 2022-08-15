const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
      }, 
    schema: {
        type: Array[String],
        required: false,
      }, 
})
const Workout = mongoose.model('Workout', workoutSchema);


exports.Workout = Workout