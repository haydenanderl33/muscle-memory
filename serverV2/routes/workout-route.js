const express = require("express");
const router = express.Router();

const {
  getAllWorkouts,
  getOneWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

router.route('/').get(getAllWorkouts).post(createWorkout)
router.route('/:id').get(getOneWorkout).delete(deleteWorkout).patch(updateWorkout)


module.exports = router;
