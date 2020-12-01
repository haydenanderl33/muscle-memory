import React from "react";

const Workouts = ({ workout, deleteWorkout }) => {


  return (
    <div>
      <div>Exercise {workout.workout_name}</div>
      <div>Sets {workout.set}</div>
      <div>Reps {workout.rep}</div>
      <button onClick={()=>deleteWorkout(workout.ws_id)}>Deletey{workout.ws_id}</button>
      
    </div>
  );
};

export default Workouts;
