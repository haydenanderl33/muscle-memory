import {connect} from 'react-redux'
import {goals} from '../redux/goalsReducer'
const Goals = (props) => {


    return(
        <div>
          {props.metGoals ? (
            <div>metGoals is true</div>
          ) : (
            <div>MetGoals is now false</div>
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