import {connect} from 'react-redux'
import {goals} from '../redux/goalsReducer'
const Goals = (props) => {

const trueFalse = () => {
  props.goals()
  alert("Good Job meeting your Goals!")
}





  return(
        <div>
          {props.metGoals ? (
            <div>
              <div>MetGoals is true</div>
              <button onClick={() => trueFalse()}>Click Me!</button>
            </div>
          ) : (
            <div>
            <div>MetGoals is now false</div>
            <button onClick={() => trueFalse()}>Click Me!</button>
          </div>
          )}
        </div>
    )
}

const mapDispatchToProps = {
    goals
  };
  
  const mapStateToProps = (reduxState) => {
    const { metGoals} = reduxState.goalReducer;
    return {
      metGoals
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)(Goals)
// export default Goals