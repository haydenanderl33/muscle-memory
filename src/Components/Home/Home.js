import { useState, useEffect } from "react";
import "./Home.css";
import Workouts from "../Workouts/Workouts";
import { connect } from "react-redux";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { setUser } from "../../redux/reducer";
import { withRouter } from "react-router-dom";
import Header from "../Header/Header";

function Home({ user }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getWorkouts = async () => {
    setLoading(true);
    let token = sessionStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const res = await axios.get("/api/v1/workouts", config);

      setWorkouts(res.data.workouts);
    } catch (error) {
      alert(error.response.request.response);
    }
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  const deleteWorkout = async (workout_id) => {

    let token = sessionStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const res = await axios.delete(`/api/v1/workouts/${workout_id}`, config);
      getWorkouts()
    } catch (error) {
      alert(error.response.request.response);
    }
    // await
  };
  const mappedWorkouts = workouts.map((workout, _id) => (
    <Workouts key={_id} workout={workout} deleteWorkout={deleteWorkout} />
  ));

  const loadingSkeleton = (
    <div className="skeletonContainer">
      <Skeleton
        count={3}
        style={{ height: "100px", width: "300px", marginTop: "15px" }}
      />
    </div>
  );

  return (
    <>
      <Header />
      {workouts.length === 0 ? (
        <>Workouts will display here</>
      ) : (
        <>{mappedWorkouts}</>
      )}
    </>
  );
}
const mapDispatchToProps = {
  setUser,
};

const mapStateToProps = (reduxState) => {
  const { user, isLoggedIn } = reduxState.userReducer;
  const { metGoals } = reduxState.goalReducer;
  return {
    user,
    isLoggedIn,
    metGoals,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
