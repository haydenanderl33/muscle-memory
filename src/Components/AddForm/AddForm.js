import {useState} from 'react';
import {connect} from 'react-redux'
import {getUser} from '../../redux/reducer'
import axios from 'axios'
import "./AddForm.css";

const AddForm = (props) => {
  const [workout_name, setExcercise] = useState('');
  const [set, setSet] = useState('')
  const [rep, setRep] = useState('')

  const addWorkout = () => {
    axios
      .post(`/api/workouts/add/${props.user.userId}`, {workout_name, set, rep })
      .then(res => props.history.push("/home"))
      .catch((err) => console.log(err));
  };

  const cancel = () => {
    setExcercise('')
    setSet('')
    setRep('')
  }


    return (<div>
      {props.isLoggedIn ? ( 
      <div className="addForm">
        <input
          name="exercise"
          placeholder="Exercise"
          type="text"
          value={workout_name}
          onChange={event => setExcercise(event.target.value)}
        />
        <input
          name="set"
          placeholder="Sets"
          value={set}
          onChange={event => setSet(event.target.value)}
        />
        <input
          name="rep"
          placeholder="Reps"
          value={rep}
          onChange={event => setRep(event.target.value)}
        />
        <div className="btns">
          <button id="addbtn" onClick={() => addWorkout()}>Add</button>
          <button id="cancelbtn" onClick={() => cancel()}>Cancel</button>
        </div>
      </div>) :(
        <div>Not Logged In there Sonny</div>
      )}
      </div>
    );
  }

const mapDispatchToProps = {
  getUser,
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
// import { getUser } from "../redux/reducer";

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
