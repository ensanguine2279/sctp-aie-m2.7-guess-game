## Part 2: Activity (~2 hours)

### Starting Point

Use the `guess-game` starter project provided alongside this lesson. It already includes everything you built in [Coaching 2.4](https://github.com/ensanguine2279/sctp-aie-m2.4-guess-game), plus scoring:

- A secret number generated randomly between 1 and 20
- A score that starts at 20 and decreases by 1 with each wrong guess
- A status that transitions to "won" when the player guesses correctly, or "lost" when the score reaches 0
- A "New Game" button that only appears after the game has ended, not during an active game

All of this is currently managed with `useState` in `App.jsx`.

> **Game rules:** The game starts at 20 points. Each wrong guess subtracts 1 point. The game ends when the player guesses correctly (won) or the score reaches 0 (lost). The "New Game" button only appears after the game has ended. Resetting mid-game is not allowed.

---

### Part 2A: Refactor State Logic with useReducer

The starter uses four separate `useState` calls (`secretNumber`, `guesses`, `score`, `status`), each updated independently inside `guessHandler` and `resetHandler`. Your task is to replace these with a single `useReducer` so that all game state transitions are defined in one place.

The input field inside `GuessInput.jsx` can remain as its own `useState` — it is local UI state and does not belong in the reducer.

#### Task

Refactor `App.jsx` so that the game state (secret number, guesses, score, and status) is managed by a single reducer function. `guessHandler` and `resetHandler` should only dispatch actions; the transition logic should live entirely inside the reducer.

#### Hints

1. A reducer receives the current state and an action object, and returns the next state. Start by identifying the two actions this game needs: one for submitting a guess, and one for starting a new game.
2. Your guess action will need to carry the guessed value. Pass it as `action.payload`.
3. Move all the score and status logic that currently lives inside `guessHandler` into the reducer's case for the guess action.
4. `useReducer` returns `[state, dispatch]`. Replace calls to `setSecretNumber`, `setGuesses`, `setScore`, and `setStatus` with a single `dispatch({ type: "...", payload: ... })`.
5. Pass `state.secretNumber`, `state.guesses`, `state.score`, and `state.status` down to `GameStatus`, `GuessInput`, and `GuessList` in place of the separate variables.

---

### Part 2B: Share the Reducer with useContext

`GameStatus`, `GuessInput`, and `GuessList` currently receive `state` values and handler functions as props from `App`. In this part, you will move the reducer itself into a Context, so these components can read `state` and `dispatch` directly, without `App` passing anything down.

#### Task

1. Create `src/contexts/GameContext.jsx` that creates a context and a `GameProvider` component. The provider should call `useReducer` (moving it out of `App.jsx`) and expose `{ state, dispatch }` as the context value.
2. Wrap the game tree with `GameProvider`, either in `main.jsx` or inside `App.jsx`.
3. Update `GameStatus`, `GuessInput`, and `GuessList` to read `state` and `dispatch` via `useContext(GameContext)` instead of receiving them as props.
4. `App.jsx` should no longer call `useReducer` directly, and should no longer pass `state` or handler props to its children.

#### Hints

1. `createContext` needs a default value. You can pass `null`, since the component tree is always wrapped in the provider.
2. Each consuming component will need to import both `useContext` and the `GameContext` object, then call `const { state, dispatch } = useContext(GameContext);` at the top of the component.
3. `guessHandler` and `resetHandler` can now live inside `GuessInput` and `App` respectively, calling `dispatch` directly from the context, since there is no longer a prop to pass them through.
4. `GuessItem` does not need the context. It only needs the two props it already receives from `GuessList`; leave it as it is.

**Check:** The game should behave exactly as it did after Part 2A. Nothing about what the player sees or does should change; only where the state and dispatch function live has changed.

---
