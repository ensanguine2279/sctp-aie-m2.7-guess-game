import { useReducer } from "react";

import { gameReducer, getInitialState } from "./reducers/gameReducer";

import GameStatus from "./components/GameStatus";
import GuessInput from "./components/GuessInput";
import GuessList from "./components/GuessList";

import styles from "./App.module.css";

function App() {
  const [state, dispatch] = useReducer(gameReducer, undefined, getInitialState);
  const lastGuess = state.guesses[state.guesses.length - 1];

  const guessHandler = (guess) => {
    dispatch({ type: "GUESS_MADE", payload: guess });
  };

  const resetHandler = () => {
    dispatch({ type: "GAME_START" });
  };

  return (
    <div className={styles.game}>
      <h1>Guess the Number</h1>
      <p>I am thinking of a number between 1 and 20.</p>
      <p>Score: {state.score}</p>

      <GameStatus
        secretNumber={state.secretNumber}
        lastGuess={lastGuess}
        status={state.status}
      />
      <GuessInput
        onGuess={guessHandler}
        disabled={state.status !== "playing"}
      />
      {state.status !== "playing" && (
        <button
          type="button"
          className={styles.resetButton}
          onClick={resetHandler}
        >
          New Game
        </button>
      )}
      <GuessList guesses={state.guesses} secretNumber={state.secretNumber} />
    </div>
  );
}

export default App;
