import { useContext, createContext } from "react";

export const GameContext = createContext();

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error("useGame must be used inside a GameProvider");
  }
  return ctx;
}
