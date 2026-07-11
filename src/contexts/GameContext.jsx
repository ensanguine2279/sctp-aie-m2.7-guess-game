import { useReducer } from "react";

import { GameContext } from "./GameContextInstance";
import { gameReducer, getInitialState } from "../reducers/gameReducer";

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, null, getInitialState);
  const { secretNumber, guesses, score, status } = state;

  const makeGuess = (guess) => {
    dispatch({ type: "GUESS_MADE", payload: guess });
  };

  const resetGame = () => {
    dispatch({ type: "GAME_RESET" });
  };

  const giveUpGame = () => {
    dispatch({ type: "GIVE_UP" });
  };

  return (
    <GameContext.Provider
      value={{
        secretNumber,
        guesses,
        score,
        status,

        resetGame,
        makeGuess,
        giveUpGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
