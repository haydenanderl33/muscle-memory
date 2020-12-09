import { useState } from "react";
import ReactPlayer from "react-player";
import "./InstructionList.css";

const InstructionList = (props) => {
  const [input, setInput] = useState(props.instruction.instructions);
  const [edit, setEdit] = useState(false);
  return (
    <div className="instructionList">
      {edit ? (<div>
        <div className="reactplayer">
            <ReactPlayer url={props.instruction.url} />
          </div>
          <h2>Notes for {props.instruction.workout_name}</h2>
        <input
          value={input}
          type="text"
          onChange={(e) => setInput(e.target.value)}
        />
        </div>
      ) : (
        <div>
          <div className="reactplayer">
            <ReactPlayer url={props.instruction.url} />
          </div>
          <h2>Notes for {props.instruction.workout_name}</h2>
          <div>{props.instruction.instructions}</div>
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
              props.editInstructions(props.instruction.workout_id, input);
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
