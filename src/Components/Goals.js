import {connect} from 'react-redux'
import {goals, resetgoals} from '../redux/goalsReducer'
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
              <div>Good Job!</div>
              <button onClick={() => reset()}>Click Me!</button>
            </div>
          ) : (
            <div>
            <div>Have you met your goals today?</div>
            <button onClick={() => metyourGoals()}>Click Me!</button>
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