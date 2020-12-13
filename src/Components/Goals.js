import {connect} from 'react-redux'
import {goals, resetgoals} from '../redux/goalsReducer'
import Stripe from './Stripe'
import "./Goals.css";

const Goals = (props) => {

const metyourGoals = () => {
  props.goals()
  alert("Good Job meeting your Goals!")
}
const reset = () => {
  props.resetgoals()
}





  return(
        <div>
          {props.metGoals ? (
            <div>
              <h2>Good Job!</h2>
              <button className="goalsMet" onClick={() => reset()}>Click Me!</button>
              <Stripe/>
            </div>
          ) : (
            <div>
            <h2>Have you met your goals today?</h2>
            <button className="metgoals" onClick={() => metyourGoals()}>Click Me!</button>
          </div>
          )}
        </div>
    )
}

const mapDispatchToProps = {
    goals,
    resetgoals
  };
  
  const mapStateToProps = (reduxState) => {
    const { metGoals} = reduxState.goalReducer;
    return {
      metGoals
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)(Goals)
// export default Goals