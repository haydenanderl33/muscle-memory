import { useState } from "react";
import { connect } from "react-redux";
import { setUser } from "../../redux/reducer";
import axios from "axios";
import "./AddForm.css";
import Header from "../Header/Header";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";

const AddForm = () => {
  const [exercise, setExcercise] = useState({
    workout_name: "",
    workout_set: "",
    workout_rep: "",
    workout_weight: "",
  });

  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setExcercise({
      ...exercise,
      [name]: value,
    });
  };

  const addWorkout = async (e) => {
    e.preventDefault();
    let token = sessionStorage.getItem("token");

    if (!token) {
      alert("Please Login In");
      return history.push("/");
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const workoutObj = {
      workout_name: exercise.workout_name,
      workout_set: exercise.workout_set,
      workout_rep: exercise.workout_rep,
      workout_weight: exercise.workout_weight,
    };
    if (
      workoutObj.workout_name === "" ||
      workoutObj.workout_set === "" ||
      workoutObj.workout_rep === "" ||
      workoutObj.workout_weight === ""
    ) {
      return toast.error("Please have a value in each field");
    }
    if (isNaN(workoutObj.workout_rep)) {
      return toast.error("Please have a number value in 'Sets' field ");
    }
    if (isNaN(workoutObj.workout_set)) {
      return toast.error("Please have a number value in 'Reps' field ");
    }
    if (isNaN(workoutObj.workout_weight)) {
      return toast.error("Please have a number value in 'Weight' field ");
    }

    try {
      await axios.post("/api/v1/workouts", workoutObj, config);
    } catch (err) {
      alert(err.response.request.response);
    }
    toast.success("Workout Created");

    setExcercise({
      workout_name: "",
      workout_set: "",
      workout_rep: "",
      workout_weight: "",
    });
  };

  const cancelbtn = () => {
    history.push("/home");
  };

  return (
    <div>
      <Header />
      <form className="addForm" onSubmit={(e) => addWorkout(e)}>
        <input
          name="workout_name"
          placeholder="Exercise"
          type="text"
          value={exercise.workout_name}
          onChange={handleInputChange}
        />
        <input
          name="workout_set"
          placeholder="Sets"
          value={exercise.workout_set}
          onChange={handleInputChange}
        />
        <input
          name="workout_rep"
          placeholder="Reps"
          value={exercise.workout_rep}
          onChange={handleInputChange}
        />
        <input
          name="workout_weight"
          placeholder="Weight"
          value={exercise.workout_weight}
          onChange={handleInputChange}
        />
        <div className="btns">
          <button id="addbtn" onClick={(e) => addWorkout(e)}>
            Add
          </button>
          <button id="cancelbtn" onClick={cancelbtn}>
            Cancel
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

const mapDispatchToProps = {
  setUser,
};

const mapStateToProps = (reduxState) => {
  const { user, isLoggedIn } = reduxState.userReducer;
  return {
    user,
    isLoggedIn,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
