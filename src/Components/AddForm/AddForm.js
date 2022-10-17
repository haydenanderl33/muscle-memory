import { useState } from "react";
import { connect } from "react-redux";
import { setUser } from "../../redux/reducer";
import axios from "axios";
import "./AddForm.css";
import Header from "../Header/Header";

const AddForm = ({ history, user, isLoggedIn }) => {
  const [exercise, setExcercise] = useState({
    workout_name: "",
    workout_set: "",
    workout_rep: "",
    workout_weight: "",
  });

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
      return alert("Please have a value in each field");
    }
    if (isNaN(workoutObj.workout_rep)) {
      return alert("Please have a number value in 'Sets' field ");
    }
    if (isNaN(workoutObj.workout_set)) {
      return alert("Please have a number value in 'Reps' field ");
    }
    if (isNaN(workoutObj.workout_weight)) {
      return alert("Please have a number value in 'Weight' field ");
    }

    console.log(workoutObj);
    try {
      const res = await axios.post("/api/v1/workouts", workoutObj, config);
    } catch (err) {
      alert(err.response.request.response);
    }

    alert("Workout Created");
    setExcercise({
      workout_name: "",
      workout_set: "",
      workout_rep: "",
      workout_weight: "",
    });
  };

  const cancel = () => {};

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
          <button id="cancelbtn" onClick={() => cancel()}>
            Cancel
          </button>
        </div>
      </form>
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

// import axios from "axios";
// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { setUser } from "../redux/reducer";

// class AddForm extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       mm_id: this.props.user.userId,
//       workout_name: "",
//       set: "",
//       rep: "",
//     };
//   }

//   addWorkout = () => {
//     const { workout_name, set, rep } = this.state;
//     axios
//       .post(`/api/workouts/add/${this.props.user.userId}`, {
//         workout_name,
//         set,
//         rep,
//       })
//       .then(res => this.props.history.push("/home"))
//       .catch((err) => console.log(err));
//   };

//   handleInputs = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   };

//   render() {
//     return (
//       <div className="addForm">
//         <input
//           name="workout_name"
//           placeholder="Exercise"
//           value={this.state.workout_name}
//           onChange={this.handleInputs}
//         />
//         <input
//           name="set"
//           placeholder="Sets"
//           value={this.state.set}
//           onChange={this.handleInputs}
//         />
//         <input
//           name="rep"
//           placeholder="Reps"
//           value={this.state.rep}
//           onChange={this.handleInputs}
//         />
//         <div className="addBtns">
//           <button onClick={() => this.addWorkout()}>Add</button>
//           <button>Cancel</button>
//         </div>
//       </div>
//     );
//   }
// }
// const mapDispatchToProps = {
//   getUser,
// };

// const mapStateToProps = (reduxState) => {
//   const { user, isLoggedIn } = reduxState;
//   return {
//     user,
//     isLoggedIn,
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
