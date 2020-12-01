import React from "react";

const Workouts = ({ workout }) => {


  return (
    <div>
      <div>Exercise {workout.workout_name}</div>
      <div>Sets {workout.set}</div>
      <div>Reps {workout.rep}</div>
      
    </div>
  );
};

export default Workouts;
