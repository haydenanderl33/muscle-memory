import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setUser } from "../redux/reducer";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import "./AddForm/AddForm.css";
import Header from "./Header/Header";
import toast, { Toaster } from "react-hot-toast";

const EditWorkout = ({ user, isLoggedIn }) => {
  const { workout_id } = useParams();
  const history = useHistory();

  const [exercise, setExcercise] = useState({
    workout_name: "",
    workout_set: "",
    workout_rep: "",
    workout_weight: "",
  });

  const [workoutDate, setWorkoutDate] = useState("");

  const getWorkout = async () => {
    let token = sessionStorage.getItem("token");

    if (!token) {
      alert("No user logged in, Please log in");
      return history.push("/");
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const res = await axios.get(`/api/v1/workouts/${workout_id}`, config);
      let workoutObj = {
        workout_name: res.data.workout.workout_name,
        workout_set: res.data.workout.workout_set,
        workout_rep: res.data.workout.workout_rep,
        workout_weight: res.data.workout.workout_weight,
      };
      let timestamp = res.data.workout.createdAt;
      let date = new Date(timestamp);
      setWorkoutDate(`${date.getMonth() +1}/${date.getDate()}/${date.getFullYear()}`)
      setExcercise(workoutObj);
    } catch (error) {
      alert(error.response.request.response);
    }
  };

  const updateWorkout = async (e) => {
    e.preventDefault();

    let token = sessionStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (
      exercise.workout_name === "" ||
      exercise.workout_set === "" ||
      exercise.workout_rep === "" ||
      exercise.workout_weight === ""
    ) {
      return toast.error("Please have a value in each field");
    }
    if (isNaN(exercise.workout_rep)) {
      return toast.error("Please have a number value in 'Sets' field ");
    }
    if (isNaN(exercise.workout_set)) {
      return toast.error("Please have a number value in 'Reps' field ");
    }
    if (isNaN(exercise.workout_weight)) {
      return toast.error("Please have a number value in 'Weight' field ");
    }
    try {
       await axios.patch(
        `/api/v1/workouts/${workout_id}`,
        exercise,
        config
      );
    } catch (error) {
      alert(error.response.request.response);
    }
    toast.success("Workout Updated");
    history.push("/home");
  };

  useEffect(() => {
    getWorkout();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setExcercise({
      ...exercise,
      [name]: value,
    });
  };

  const cancel = () => {
    history.push("/home");
  };

  return (
    <div>
      <Header />
      <form className="addForm" onSubmit={(e) => updateWorkout(e)}>
        <h2>Editing workout created on {workoutDate}</h2>
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
          <button id="addbtn" onClick={(e) => updateWorkout(e)}>
            Save
          </button>
          <button id="cancelbtn" onClick={() => cancel()}>
            Cancel
          </button>
        </div>
      </form>
      <Toaster/>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditWorkout);
