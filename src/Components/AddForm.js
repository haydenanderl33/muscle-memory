import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../redux/reducer";

class AddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mm_id: this.props.user.userId,
      workout_name: "",
      set: "",
      rep: "",
    };
  }

  addWorkout = () => {
    const { workout_name, set, rep } = this.state;
    axios
      .post(`/api/workouts/add/${this.props.user.userId}`, {
        workout_name,
        set,
        rep,
      })
      .then(res => this.props.history.push("/home"))
      .catch((err) => console.log(err));
  };

  handleInputs = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="addForm">
        <input
          name="workout_name"
          placeholder="Exercise"
          value={this.state.workout_name}
          onChange={this.handleInputs}
        />
        <input
          name="set"
          placeholder="Sets"
          value={this.state.set}
          onChange={this.handleInputs}
        />
        <input
          name="rep"
          placeholder="Reps"
          value={this.state.rep}
          onChange={this.handleInputs}
        />
        <div className="addBtns">
          <button onClick={() => this.addWorkout()}>Add</button>
          <button>Cancel</button>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = {
  getUser,
};

const mapStateToProps = (reduxState) => {
  const { user, isLoggedIn } = reduxState;
  return {
    user,
    isLoggedIn,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
