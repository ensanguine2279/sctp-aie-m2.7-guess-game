import { useState } from "react";
import { useGame } from "../contexts/GameContextInstance";

import styles from "./GuessInput.module.css";

function GuessInput() {
  const { status, makeGuess, giveUpGame } = useGame();
  const [inputValue, setInputValue] = useState("");

  const isDisabled = status !== "playing";

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const guess = parseInt(inputValue, 10);
    if (isNaN(guess)) return;

    makeGuess(guess);
    setInputValue("");
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <label htmlFor="guess-input">Enter a number between 1 and 20</label>
      <div className={styles.controls}>
        <input
          id="guess-input"
          className={styles.input}
          type="text"
          inputMode="numeric"
          value={inputValue}
          onChange={inputChangeHandler}
          disabled={isDisabled}
        />
        <button className={styles.button} type="submit" disabled={isDisabled}>
          Guess
        </button>

        <button
          className={styles.button}
          onClick={giveUpGame}
          disabled={isDisabled}
        >
          Give Up
        </button>
      </div>
    </form>
  );
}

export default GuessInput;
