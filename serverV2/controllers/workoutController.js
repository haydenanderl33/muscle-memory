const Workout = require("../models/Workout");
const { StatusCodes } = require("http-status-codes");

const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({
    createdBy: req.user.userId,
  }).sort("createdAt");
 return res.status(StatusCodes.OK).json({ workouts, count: workouts.length });
};
const getOneWorkout = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  const workout = await Workout.findOne({
    _id: id,
    createdBy: userId,
  });

  if (!workout) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ err: `No workout with ${id} found` });
  }
  res.status(StatusCodes.OK).json({ workout });
  console.log(
    `Workout ${id}, name ${workout.workout_name}, set ${workout.workout_set}, rep ${workout.workout_rep}`
  );
};
const createWorkout = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const workout = await Workout.create(req.body);
  res.status(StatusCodes.CREATED).json({ workout });
  console.log("Workout Created");
};
const deleteWorkout = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  const workout = await Workout.findOneAndRemove({
    _id: id,
    createdBy: userId,
  });

  if (!workout) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ err: `No workout with ${id} found` });
  }
  res.status(StatusCodes.OK).json({ workout });
  console.log(`Workout ${id} deleted`);
};
const updateWorkout = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const newWorkout = req.body;

  const workout = await Workout.findByIdAndUpdate(
    {
      _id: id,
      createdBy: userId,
    },
    newWorkout,
    { new: true, runValidators: true }
  );

  console.log(workout);
  if (!workout) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ err: `No workout with ${id} found` });
  }
  res.status(StatusCodes.OK).json({ workout });
  console.log(`Workout ${id} updated`);
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
