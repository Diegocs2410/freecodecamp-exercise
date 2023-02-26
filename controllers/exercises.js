const Exercise = require('../models/exercises')
const User = require('../models/users')

const newExercise = async (req, res) => {
  const userId = req.params.userId;
  const description = req.body.description;
  const duration = parseInt(req.body.duration);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = req.body.date ? new Date(req.body.date) : new Date();
  try {
    // Create a new exercise instance
    const exercise = new Exercise({
      description,
      duration,
      date: date.toDateString(),
      userId
    });

    // Save the exercise to the database
    const savedExercise = await exercise.save();
    const newExercise = await Exercise.findById(savedExercise._id)
      .populate('userId')
      .exec();
    // Return a success response
    const exerciseObj = newExercise.toObject();
    exerciseObj.username = newExercise.userId.username;
    res.json({
      _id: exerciseObj.userId._id,
      username: exerciseObj.username,
      date: exerciseObj.date.toDateString(),
      duration: exerciseObj.duration,
      description: exerciseObj.description,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const getAllExcersicesByUser = async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    const exerciseQuery = { userId: user._id };
    if (req.query.from && req.query.to) {
      exerciseQuery.date = { $gte: new Date(req.query.from), $lte: new Date(req.query.to) };
    } else if (req.query.from) {
      exerciseQuery.date = { $gte: new Date(req.query.from) };
    } else if (req.query.to) {
      exerciseQuery.date = { $lte: new Date(req.query.to) };
    }
    let exercises = await Exercise.find(exerciseQuery).populate('userId');
    if (req.query.limit) {
      exercises = exercises.slice(0, parseInt(req.query.limit));
    }
    const log = exercises.map((exercise) => ({
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString()
    }));
    const response = {
      _id: user._id,
      username: user.username,
      count: log.length,
      log
    };
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
}
module.exports = {
  newExercise,
  getAllExcersicesByUser
}