import React, { Component } from "react";
import Workouts from "./Workouts";
import { connect } from "react-redux";
import axios from "axios";
import { getUser } from "../redux/reducer";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workouts: [],
    };
  }
  componentDidMount() {
    // const updateStuff = new Promise((resolve, reject) => {
    //     this.getWorkouts()
    // }).then(() => {
    //     this.props.getUser();
    // })
    axios
      .get(`/api/workouts/${this.props.user.userId}`)
      .then((res) => {
        this.setState({ workouts: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.userId !== this.props.user.userId) {
      console.log(prevProps.user.userId);
      axios
        .get(`/api/workouts/${this.props.user.userId}`)
        .then((res) => {
          this.setState({ workouts: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  deleteWorkout = (ws_id) => {
    axios
      .delete(`/api/workouts/delete/${ws_id}`)
      .then((res) => {
        this.getWorkouts();
      })
      .catch((err) => console.log(err.response.request.response));
  };

  getWorkouts = () => {
    axios
      .get(`/api/workouts/${this.props.user.userId}`)
      .then((res) => {
        this.setState({ workouts: res.data });
      })
      .catch((err) => {
        console.log("It's just the componentDidMount");
      });
  };

  render() {
    const { workouts } = this.state;
    const mappedWorkouts = workouts.map((workout, ws_id) => {
      return (
        <Workouts
          key={workout.ws_id}
          workout={workout}
          deleteWorkout={this.deleteWorkout}
        />
      );
    });

    return (
      <div>
        Home Component
        {mappedWorkouts}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
