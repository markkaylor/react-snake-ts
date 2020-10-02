import React, { useRef, useEffect, useState } from "react";
import useInterval from "./useInterval";

// Components
import PlayerScoreList from "./components/PlayerScoreList";
import PlayerScore from "./components/PlayerScore";
import PlayerInput from "./components/PlayerInput";

import "./App.css";

export interface User {
  name: string;
  score: number;
}

function App() {
  const SCALE = 10;
  const CANVAS_SIZE = 400;
  const MAX_SPEED = 20;
  const SNAKE_START: number[][] = [
    [5, 5],
    [4, 5],
  ];

  // TODO: replace any
  const canvasRef: any = useRef<HTMLCanvasElement | null>(null);

  const [snake, setSnake] = useState<number[][]>(SNAKE_START);
  const [apple, setApple] = useState<number[]>([20, 4]);
  const [direction, setDirection] = useState<number[]>([0, 0]);
  const [speed, setSpeed] = useState<number>(100);
  const [score, setScore] = useState<number>(0);
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const [inputVal, setInputVal] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [lastUser, setLastUser] = useState<User>({ name: "", score: 0 });

  const [highScore, setHighScore] = useState<number>(0);

  const handleControl = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        setDirection([-1, 0]);
        break;

      case "ArrowUp":
        setDirection([0, -1]);
        break;

      case "ArrowRight":
        setDirection([1, 0]);
        break;

      case "ArrowDown":
        setDirection([0, 1]);
        break;

      default:
        break;
    }
  };

  const isInBounds = (headX: number, headY: number) => {
    const futureX = headX * SCALE + direction[0] * SCALE;
    const futureY = headY * SCALE + direction[1] * SCALE;
    // Check snakes next move won't exceed boundary
    return (
      futureX < CANVAS_SIZE &&
      futureX >= 0 &&
      futureY < CANVAS_SIZE &&
      futureY >= 0
    );
  };

  const isAlive = (headX: number, headY: number) => {
    const snakeCopy = snake.slice(1);
    // Check if snake hit itself
    for (const el of snakeCopy) {
      if (headX === el[0] && headY === el[1]) return false;
    }

    return isInBounds(headX, headY);
  };

  const generateRandomCoordinate = () => {
    // Return a random number within the canvas
    return Math.floor((Math.random() * CANVAS_SIZE) / SCALE);
  };

  const updateApple = (snakeCopy: number[][]) => {
    // Get random coordinates
    let randomX = generateRandomCoordinate();
    let randomY = generateRandomCoordinate();
    // Check snake body for coordinates
    for (const el of snakeCopy) {
      // Update if necessary
      if (el[0] === randomX && el[1] === randomY) {
        randomX = generateRandomCoordinate();
        randomY = generateRandomCoordinate();
      }
    }
    // Update apple
    setApple([randomX, randomY]);
  };

  const growSnake = (snakeCopy: number[][]) => {
    // Make new tail from apple
    const newTail = [apple[0] - direction[0], apple[1] - direction[1]];
    // Push apple coordinates  to snake body
    snakeCopy.push(newTail);
    // Update snake
    setSnake(snakeCopy);
  };

  const updateSnake = () => {
    // Create a copy of the snake
    const copy = [...snake];
    const firstEl = copy[0];
    // Move the current head by direction state values
    const newHead = [firstEl[0] + direction[0], firstEl[1] + direction[1]];
    // Make it the new head by adding to front of the array
    copy.unshift(newHead);
    // remove the last element to keep the same size
    copy.pop();
    // Update the snake
    setSnake(copy);
  };

  const startGame = () => {
    if (inputVal) {
      setUser(inputVal);
      setInputVal("");
      setGameOver(false);
      setGameRunning(true);
      setDirection([1, 0]);
    }
  };

  const updateGame = (headX: number, headY: number) => {
    updateSnake();
    // Check if snake head position is equal to apple position
    if (headX === apple[0] && headY === apple[1]) {
      const snakeCopy: number[][] = [...snake];
      growSnake(snakeCopy);
      // Move apple
      updateApple(snakeCopy);
      // Increase speed
      if (speed > MAX_SPEED) {
        setSpeed(speed - SCALE);
      }
      // Increase score
      setScore(score + 10);
    }
  };

  const endGame = () => {
    setLastUser({ name: user, score: score });
    const usersCopy = [...users];
    usersCopy.push({ name: user, score: score });
    const userScore = Math.max.apply(
      Math,
      usersCopy.map((user) => user.score)
    );
    setHighScore(userScore);
    setUsers(usersCopy);
    setGameRunning(false);
    setGameOver(true);
    setSnake(SNAKE_START);
    setApple([20, 4]);
    setScore(0);
    setDirection([0, 0]);
    setSpeed(100);
    setInputVal("");
    setUser("");
  };

  const loopGame = () => {
    const headX: number = snake[0][0];
    const headY: number = snake[0][1];

    if (isAlive(headX, headY) && gameRunning) {
      updateGame(headX, headY);
    } else {
      endGame();
    }
  };

  useEffect(() => {
    // Setup Canvas
    const ctx = canvasRef.current.getContext("2d");
    ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);

    // Draw Snake
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.fillStyle = "rgb(62, 73, 89)";
    snake.forEach(([x, y]) => ctx.fillRect(x, y, 1, 1));

    // Draw Apple
    ctx.fillStyle = "rgb(50, 168, 82)";
    ctx.fillRect(apple[0], apple[1], 1, 1);

    // Listen for arrow key changes
    window.addEventListener("keydown", handleControl);

    return () => {
      window.removeEventListener("keydown", handleControl);
    };
  }, [apple, snake]);

  useInterval(() => {
    if (gameRunning) {
      loopGame();
    }
  }, speed);

  return (
    <div className="App">
      <div className="container-left">
        <div className="message-board card">
          {gameOver ? (
            <div>
              <h1 className="game-title">Game Over {lastUser.name}!</h1>
              <p className="text-bold">Score: {lastUser.score}</p>
            </div>
          ) : (
            <h1 className="game-title">Snake Game!</h1>
          )}

          {user ? (
            <PlayerScore highScore={highScore} score={score} user={user} />
          ) : (
            <PlayerInput
              playerNumber={users.length + 1}
              inputValue={inputVal}
              onInputChange={(val: string) => setInputVal(val)}
              onBtnClick={startGame}
            />
          )}
        </div>
        <canvas ref={canvasRef} height={CANVAS_SIZE} width={CANVAS_SIZE} />
      </div>
      <PlayerScoreList users={users} />
    </div>
  );
}

export default App;
