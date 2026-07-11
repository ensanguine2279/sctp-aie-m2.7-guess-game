import { useGame } from "../contexts/GameContextInstance";

import styles from "./GameStatus.module.css";

function GameStatus() {
  const { secretNumber, guesses, status } = useGame();
  const lastGuess = guesses[guesses.length - 1];

  let message = "Make your first guess!";
  if (status === "won") {
    message = `Correct! The number was ${secretNumber}.`;
  } else if (status === "lost") {
    message = `Game over! The number was ${secretNumber}.`;
  } else if (lastGuess !== undefined) {
    message = lastGuess > secretNumber ? "Too high!" : "Too low!";
  }

  return (
    <p className={status === "won" ? styles.won : styles.status}>{message}</p>
  );
}

export default GameStatus;
