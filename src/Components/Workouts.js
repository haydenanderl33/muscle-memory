import React from "react";

const Workouts = ({ workout }) => {


  return (
    <div>
      <div>Exercise {workout.workout_name}</div>
      <div>Set {workout.set}</div>
      <div>Reps {workout.set}</div>
      
    </div>
  );
};

export default Workouts;
