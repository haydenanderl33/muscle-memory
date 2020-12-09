import { useState } from "react";
import ReactPlayer from 'react-player';

const InstructionList = (props) => {
  const [input, setInput] = useState(props.instruction.instructions);
  const [edit, setEdit] = useState(false);
  return (
    <div>
      {edit ? (
        <input
          value={input}
          type="text"
          onChange={(e) => setInput(e.target.value)}
        />
      ) : (
        <div>
          <h2>Notes for {props.instruction.workout_name}</h2>
          <div>{props.instruction.instructions}</div>
          <ReactPlayer url={props.instruction.url}/>
        </div>
      )}
      {edit ? (
        <div>
          <button
            onClick={() => {
              setInput(props.instruction.instructions);
              setEdit(!edit);
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              props.editInstructions(props.instruction.workout_id, input)
              setEdit(!edit);
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            setEdit(!edit);
          }}
        >
          Edit
        </button>
      )}
    </div>
  );
};
export default InstructionList;
