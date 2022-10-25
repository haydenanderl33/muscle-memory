import { connect } from "react-redux";
import { goals, resetgoals } from "../redux/goalsReducer";
import Stripe from "./Stripe";
import "./Goals.css";
import Header from "./Header/Header";
import toast, { Toaster } from "react-hot-toast";

const Goals = (props) => {
  const metyourGoals = () => {
    props.goals();
    // toast.success("Good Job meeting your Goals!");
  };
  const reset = () => {
    props.resetgoals();
  };

  return (
    <>
      <div>
        <Header />
        {props.metGoals ? (
          <div>
            <h2>Good Job!</h2>
            <button className="goalsMet" onClick={() => reset()}>
              Click Me!
            </button>
            <Stripe />
          </div>
        ) : (
          <div>
            <h2>Have you met your goals today?</h2>
            <button className="metgoals" onClick={() => metyourGoals()}>
              Click Me!
            </button>
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
};

const mapDispatchToProps = {
  goals,
  resetgoals,
};

const mapStateToProps = (reduxState) => {
  const { metGoals } = reduxState.goalReducer;
  return {
    metGoals,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Goals);
