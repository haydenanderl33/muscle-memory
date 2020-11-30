import React, {Component} from 'react'
import Workouts from "./Workouts"
import {connect} from 'react-redux'

class Home extends Component{
    render(){
        return(
            <div>
                This is the Home
                <Workouts/>
            </div>
        )
    }
}
const mapStateToProps = (reduxState) => {
    const {user, isLoggedIn} = reduxState;
    return{
        user,
        isLoggedIn
    };
};

export default connect(mapStateToProps)(Home)