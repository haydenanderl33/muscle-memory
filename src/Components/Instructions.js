import React, {Component} from 'react'
import axios from 'axios'

class Instructions extends Component{
    constructor(){
        super();

        this.state = {
            instructions: []
        }
        
    }
    componentDidMount(){
        this.getInstructions()
    }

    getInstructions = async () => {
        try {
        const instructions = await axios.get('/api/instructions')
        this.setState({instructions: instructions.data})
        console.log(instructions)
    }

     catch (err) {
        console.log(err)
    }
}


    render(){
        // const {instructions} = this.state
        // const mappedInstructions = instructions.map(instruction, workout_id => {
        // return <div>key={instruction.workout_id} {instruction}</div>
        // })
        return(
            <div>
                fix later
            </div>
        )
    }
}

export default Instructions