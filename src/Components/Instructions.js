// import React, { Component } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import InstructionList from './InstructionsList'
import Header from "./Header/Header";

const Instructions = (props) => {
  const [instructions, setInstructions] = useState([


  ]);

  



 




  const mappedInstructions = instructions.map( (instructions , index) =>{
      return (
        <InstructionList key={index} instructionVideoUrls={instructions}/>
      ) 
  })

  return <div>
    <Header/>
<div>{mappedInstructions}</div>
  </div>;
};


export default Instructions;



















// class Instructions extends Component {
//   constructor() {
//     super();

//     this.state = {
//       instructions: [],
//       editInfo: "",
//       edit: false,
//     };
//   }
//   componentDidMount() {
//     this.getInstructions();
//   }

//   editInstructions = async (workout_id) => {
//     const { editInfo } = this.state;

//     try {
//       const edited = await axios.put(`/api/instructions/${workout_id}`,{instructions: editInfo});
//     } catch (err) {
//       console.log("Did not edit", err);
//     }
//   };

//   getInstructions = async () => {
//     try {
//       const instructions = await axios.get("/api/instructions");
//       this.setState({ instructions: instructions.data });
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   handleEdit = (event) => {
//     console.log(event.target.value);
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   };
//   handleEditing = () => {

//     this.setState({
//       // edit: !edit
//     });
//   };

//   render() {
//     const { instructions } = this.state;
//     const mappedInstructions = instructions.map((instruction) => {
//       return (
//         <div key={instruction.workout_id}>
//           <h2>{instruction.workout_name}</h2>
//           <h2>{instruction.instructions}</h2>
//           <input
//             name="editInfo"
//             value={this.state.editInfo}
//             onChange={this.handleEdit}
//           />

//           <button onClick={() => this.editInstructions(instruction.workout_id)}>
//             Edit
//           </button>
//           <button onClick={() => this.handleEditing()}>True/False btn</button>
//         </div>
//       );
//     });
//     return <div>instructions should be here {mappedInstructions}</div>;
//   }
// }

// export default Instructions;
