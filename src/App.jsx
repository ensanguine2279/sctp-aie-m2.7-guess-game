import { useGame } from "./contexts/GameContextInstance";

import GameStatus from "./components/GameStatus";
import GuessInput from "./components/GuessInput";
import GuessList from "./components/GuessList";

import styles from "./App.module.css";

function App() {
  const { score, status, resetGame } = useGame();

  return (
    <div className={styles.game}>
      <h1>Guess the Number</h1>
      <p>I am thinking of a number between 1 and 20.</p>
      <p>Score: {score}</p>

      <GameStatus />
      <GuessInput />
      {status !== "playing" && (
        <button
          type="button"
          className={styles.resetButton}
          onClick={resetGame}
        >
          New Game
        </button>
      )}
      <GuessList />
    </div>
  );
}

export default App;
