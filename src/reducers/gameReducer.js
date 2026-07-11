const getRandomNumber = () => {
  return Math.floor(Math.random() * 20) + 1;
};

export function getInitialState() {
  return {
    secretNumber: getRandomNumber(),
    guesses: [],
    score: 20,
    status: "playing", // "playing" | "won" | "lost"
  };
}

const handleGuess = (state, guess) => {
  const isCorrect = guess === state.secretNumber;
  const newScore = isCorrect ? state.score : Math.max(0, state.score - 1);
  const newStatus = isCorrect ? "won" : newScore === 0 ? "lost" : "playing";

  return {
    ...state,
    score: newScore,
    status: newStatus,
    guesses: [...state.guesses, guess],
  };
};

export function gameReducer(state, action) {
  switch (action.type) {
    case "GAME_RESET":
      return getInitialState();

    case "GUESS_MADE":
      return handleGuess(state, action.payload);

    default:
      return state;
  }
}
