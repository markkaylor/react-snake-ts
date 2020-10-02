import React, { MouseEvent, ChangeEvent } from "react";
import "./styles/PlayerInput.css";

type PlayerInputProps = {
  playerNumber: number;
  inputValue: string;
  onBtnClick: (event: MouseEvent<HTMLButtonElement>) => void;
  onInputChange: (value: string) => void;
};

const PlayerInput = (props: PlayerInputProps) => {
  return (
    <div className="container-input">
      <div className="container-message">
        <p className="text-bold">Ready Player {props.playerNumber}?</p>
        <p className="text-bold">Enter your name to start</p>
      </div>
      <input
        type="text"
        className="input-name"
        value={props.inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          props.onInputChange(e.target.value)
        }
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
