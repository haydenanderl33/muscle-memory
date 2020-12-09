import React from "react";
import "./Workouts.css"


const Workouts = ({ workout, deleteWorkout }) => {


  return (
    <div className="workoutbox">
      <h4>{workout.workout_name}</h4>
      <div>Sets {workout.set}</div>
      <div>Reps {workout.rep}</div>
      <div>Weight {workout.weight}</div>
      <button className="deleletey" onClick={()=>deleteWorkout(workout.ws_id)}>Delete</button>
      
    </div>
  );
};

export default Workouts;
