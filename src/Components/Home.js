import React, {Component} from 'react'
import Workouts from "./Workouts"
import {connect} from 'react-redux'
import axios from 'axios'
import {getUser} from "../redux/reducer"

class Home extends Component{
    constructor(props){
        super(props);

        this.state = {
            workouts: []
        }
    }
    componentDidMount(){
        axios.post(`/api/workouts/${this.props.user.userId}`)
        .then(res =>{
            this.setState({workouts: res.data})
        })
        .catch(err => {
            console.log(err)
        })}
    
    

    componentDidUpdate(prevProps){
        // && this.props.user.userId
        if(prevProps.user.userId !== this.props.user.userId ){
        this.props.getUser()
        axios.post(`/api/workouts/${this.props.user.userId}`)
        .then(res => {
            this.setState({workouts: res.data})
        })
        .catch(err => {
            console.log(err)
        })}
    }


    render(){
        const {workouts} = this.state;
        const mappedWorkouts = workouts.map((workout , ws_id ) => {
        return <Workouts key={workout.ws_id} workout={workout} />})

        return(
            <div>Home
                {mappedWorkouts}
            </div>
        )
    }
}
const mapDispatchToProps = {
    getUser
};


const mapStateToProps = (reduxState) => {
    const {user, isLoggedIn} = reduxState;
    return{
        user,
        isLoggedIn
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Home)