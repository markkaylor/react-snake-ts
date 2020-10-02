import React from "react";
import "./styles/PlayerScore.css";

type PlayerScoreProps = {
  highScore: number;
  user: string;
  score: number;
};

const PlayerScore = ({ highScore, user, score }: PlayerScoreProps) => {
  return (
    <div className="container-score-board">
      <p className="text-bold align-center">Score to Beat: {highScore}</p>
      <div className="game-score-board">
        <span>
          Current Player: <span className="text-bold wrap-item">{user}</span>
        </span>
        <span>
          Score: <span className="text-bold">{score}</span>
        </span>
      </div>
    </div>
  );
};

export default PlayerScore;
