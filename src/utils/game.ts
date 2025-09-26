export type Mark = "" | "xMark" | "oMark";

export const WINNING_COMBOS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//helper: check winner
export const checkWinner = (b: Mark[]) => {
  for (const [a, bIdx, c] of WINNING_COMBOS) {
    if (b[a] !== "" && b[a] === b[bIdx] && b[a] === b[c]) {
      return b[a];
    }
  }
  return null;
};

export const isBoardFull = (b: Mark[]) => b.every((cell) => cell !== "");

export const getRandomEmptyIndex = (b: Mark[]) => {
  const empties = b.map((v, i) => (v === "" ? i : -1)).filter((i) => i !== -1);
  if (empties.length === 0) return -1;
  return empties[Math.floor(Math.random() * empties.length)];
};

