import React, {Component} from 'react'
import Workouts from "./Workouts"

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

export default Home