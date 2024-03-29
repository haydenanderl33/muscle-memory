import React from "react";
import { Link } from "react-router-dom";
import "./Workouts.css";

const Workouts = ({ workout, deleteWorkout }) => {
  let timestamp = workout.updatedAt;
  let date = new Date(timestamp);

  return (
    <div className="workoutbox">
      <div className="date">
        <h4>{date.getMonth() + 1}/</h4>
        <h4>{date.getDate()}/</h4>
        <h4>{date.getFullYear()}</h4>
      </div>

      <h4>{workout.workout_name}</h4>
      <div>Sets {workout.workout_set}</div>
      <div>Reps {workout.workout_rep}</div>
      <div>Weight {workout.workout_weight}</div>
      <button className="deleletey" onClick={() => deleteWorkout(workout._id)}>
        Delete
      </button>
      <Link to={`/editWorkout/workoutId=${workout._id}`} className="deleletey">
        Edit
      </Link>
    </div>
  );
};

export default Workouts;
