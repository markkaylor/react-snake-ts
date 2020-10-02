import React from "react";

const PlayerInput = (props: any) => {
  return (
    <div className="container-input">
      <div className="container-message">
        <p className="text-bold">Ready Player {props.users.length + 1}?</p>
        <p className="text-bold">Enter your name to start</p>
      </div>
      <input
        type="text"
        className="input-name"
        value={props.value}
        onChange={(e) => props.onInputChange(e.target.value)}
      />
      <button className="button-go" onClick={props.onBtnClick}>
        Go!
      </button>
      <p className="text-small text-italic">
        Use the arrow keys to control the snake
      </p>
    </div>
  );
};

export default PlayerInput;
