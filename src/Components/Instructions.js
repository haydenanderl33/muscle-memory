import React, { Component } from "react";
import axios from "axios";

class Instructions extends Component {
  constructor() {
    super();

    this.state = {
      instructions: [],
    };
  }
  componentDidMount() {
    this.getInstructions();
  }

  getInstructions = async () => {
    try {
      const instructions = await axios.get("/api/instructions");
      this.setState({ instructions: instructions.data });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { instructions } = this.state;
    const mappedInstructions = instructions.map((instruction) => {
      return <div>
          <h2>{instruction.workout_name}</h2>
          <h2>{instruction.instructions}</h2>
      </div>;
      
      
    });
return <div>instructions should be here {mappedInstructions} </div>;
  }
}

export default Instructions;
