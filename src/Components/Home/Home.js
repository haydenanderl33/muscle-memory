import { useState, useEffect } from "react";
import "./Home.css";
import Workouts from "../Workouts/Workouts";
import { connect } from "react-redux";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { getUser } from "../../redux/reducer";

function Home({ user }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getWorkouts = async () =>
      await axios
        .get(`/api/workouts/${user.userId}`)
        .then((res) => {
          setWorkouts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    getWorkouts();
  }, [user.userId]);

  const deleteWorkout = async (ws_id) => {
    await axios.delete(`/api/workouts/delete/${ws_id}`);
    window.location.reload();
  };
  const mappedWorkouts = workouts.map((workout, ws_id) => (
    <Workouts key={ws_id} workout={workout} deleteWorkout={deleteWorkout} />
  ));

  const loadingSkeleton = (
    <div className="skeletonContainer">
      <Skeleton
        count={3}
        style={{ height: "100px", width: "300px", marginTop: "15px" }}
      />
    </div>
  );

  console.log("mappedWorkouts", mappedWorkouts);

  return (
    <>
      {mappedWorkouts.length === 0 ? (
        <div className="wwR">Workout Records will show here</div>
      ) : null}
      <>{loading ? loadingSkeleton : null}</>
      <>{mappedWorkouts}</>
    </>
  );
}
const mapDispatchToProps = {
  getUser,
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
