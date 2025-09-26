import { useEffect, useRef, useState } from "react";
import { checkWinner } from "../utils/game";

type Mark = "" | "xMark" | "oMark";

interface GameProps {
  pickMark: "xMark" | "oMark";
  setScreen: React.Dispatch<React.SetStateAction<string>>;
}

const Game = ({ pickMark, setScreen }: GameProps) => {
  const aiMark: Mark = pickMark === "oMark" ? "xMark" : "oMark";
  const [board, setBoard] = useState<Mark[]>(Array(9).fill(""));
  const [turn, setTurn] = useState<Mark>("xMark");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<Mark | "tie" | null>(null);
  const [score, setScore] = useState({ xMark: 0, oMark: 0, ties: 0 });
  const [showRestart, setShowRestart] = useState<boolean>(false);

  const didInitialAiRef = useRef(false);
  const aiThinkingRef = useRef(false);
  const boardRef = useRef(board);

  const isBoardFull = (b: Mark[]) => b.every((cell) => cell !== "");

  const updateCell = (index: number, mark: Mark) => {
    setBoard((prev) => {
      if (prev[index] !== "" || gameOver) return prev;
      const next = [...prev];
      next[index] = mark;
      return next;
    });
  };

  const performAiMove = (currentBoard: Mark[]) => {
    const emptyIndexes = currentBoard
      .map((v, i) => (v === "" ? i : -1))
      .filter((i) => i !== -1);

    if (emptyIndexes.length === 0 || gameOver) return;

    // 1) winning move
    for (const idx of emptyIndexes) {
      const copy = [...board];
      copy[idx] = aiMark;
      if (checkWinner(copy) === aiMark) return finishAiMove(idx);
    }

    // 2) block opponent winning
    for (const idx of emptyIndexes) {
      const copy = [...board];
      copy[idx] = pickMark;
      if (checkWinner(copy) === pickMark) return finishAiMove(idx);
    }

    // 3) take center
    if (board[4] === "") return finishAiMove(4);

    // 4) take a corner
    const corners = [0, 2, 6, 8].filter((i) => board[i] === "");
    if (corners.length > 0)
      return finishAiMove(corners[Math.floor(Math.random() * corners.length)]);

    // 5) fallback random
    const rand = getRandomEmptyIndex(board);
    if (rand !== -1) finishAiMove(rand);
  };

  const finishAiMove = (idx: number) => {
    updateCell(idx, aiMark);
    // switch turn back to player (if game isn't over, effect will handle win/tie)
    setTurn(pickMark);
  };

  const getRandomEmptyIndex = (b: Mark[]) => {
    const empties = b
      .map((v, i) => (v === "" ? i : -1))
      .filter((i) => i !== -1);
    if (empties.length === 0) return -1;
    return empties[Math.floor(Math.random() * empties.length)];
  };

  const handleCellClick = (index: number) => {
    if (gameOver) return;
    if (turn !== pickMark) return;
    if (board[index] !== "") return;

    updateCell(index, pickMark);
    setTurn(aiMark);
  };

  const resetBoard = (startWithX = true) => {
    setBoard(Array(9).fill(""));
    setGameOver(false);
    setWinner(null);
    //standard: x start first
    setTurn(startWithX ? "xMark" : pickMark);

    //if AI should start (ai is x) then let initial effect handle it
    //but ensure it runs even after restarting
    didInitialAiRef.current = false;
  };

  const handleShowRestart = () => {
    setShowRestart(true);
  };

  const handleRestart = (e: React.MouseEvent<HTMLButtonElement>) => {
    //preserve scores, just reset board
    if (showRestart) {
      if (e.currentTarget.value === "yesReset") {
        resetBoard(true);
        setShowRestart(false);

        return;
      } else {
        setShowRestart(false);
        return;
      }
    }

    resetBoard(true);
  };

  useEffect(() => {
    boardRef.current = board;
  }, [board]);

  useEffect(() => {
    if (gameOver) return;
    const w = checkWinner(board);

    if (w) {
      setGameOver(true);
      setWinner(w);
      setScore((s) => ({ ...s, [w]: s[w] + 1 }));
      return;
    }
    if (isBoardFull(board)) {
      setGameOver(true);
      setWinner("tie");
      setScore((s) => ({ ...s, ties: s.ties + 1 }));
      return;
    }

    // if game not over and it's AI's turn, trigger AI move
    if (turn === aiMark && !aiThinkingRef.current) {
      //small delay to feel natural
      aiThinkingRef.current = true;
      const t = setTimeout(() => {
        performAiMove(boardRef.current);
        aiThinkingRef.current = false;
      }, 250);
      return () => {
        clearTimeout(t);
        aiThinkingRef.current = false;
      };
    }
  }, [turn, gameOver]);

  // initial effect: if AI is x and should go first, do it once only (guarded)
  useEffect(() => {
    if (didInitialAiRef.current) return;
    didInitialAiRef.current = true;

    // when player chose 'o', AI (x) must move first
    if (aiMark === "xMark" && turn === "xMark") {
      // pick center if available else random
      const center = 4;
      if (board[center] === "") {
        updateCell(center, aiMark);
        setTurn(pickMark);
      } else {
        const idx = getRandomEmptyIndex(board);
        if (idx !== -1) {
          updateCell(idx, aiMark);
          setTurn(pickMark);
        }
      }
    }
  }, []);

  return (
    <div className="grid grid-cols-3 justify-around gap-4 relative ">
      <img src="/assets/logo.svg" alt="logo" className="w-18 h-8 mb-16" />
      <div className="w-24 h-10 flex items-center justify-center gap-2 mb-16 bg-semi-dark-navy rounded-sm text-light-silver">
        {turn === "xMark" ? (
          <svg
            width="64"
            height="64"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className={`fill-light-silver w-4 h-4 `}
          >
            <path
              d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
              fillRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            width="64"
            height="64"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className={`fill-light-silver w-4 h-4 `}
          >
            <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" />
          </svg>
        )}

        <span className="uppercase">turn</span>
      </div>
      <button
        type="button"
        onClick={handleShowRestart}
        className="w-10 h-10 mb-16 rounded-sm flex items-center justify-center place-self-end bg-light-silver inset-shadow-[0_-4px_0_0_rgba(107,137,151,1)] hover:brightness-110 hover:cursor-pointer"
      >
        <img src="/assets/icon-restart.svg" alt="reset icon" />
      </button>

      {/* XO Area */}

      {board.map((cell, i) => (
        <button
          key={i}
          type="button"
          disabled={cell !== "" || gameOver || turn !== pickMark}
          onClick={() => handleCellClick(i)}
          className="w-24 h-24 bg-semi-dark-navy rounded-[0.625rem] flex flex-col items-center justify-center hover:[&>img]:block hover:cursor-pointer"
        >
          {cell === "" ? (
            turn === "xMark" ? (
              <img
                src="/assets/icon-x-outline.svg"
                alt="x mark"
                className={`hidden peer-[:hover]:block`}
              />
            ) : (
              <img
                src="/assets/icon-o-outline.svg"
                alt="o mark"
                className={`hidden peer[:hover]:block`}
              />
            )
          ) : (
            <div>
              <img
                src="/assets/icon-x.svg"
                alt="x mark"
                className={`${cell === "xMark" ? "block" : "hidden"}`}
              />
              <img
                src="/assets/icon-o.svg"
                alt="o mark"
                className={`${cell === "oMark" ? "block" : "hidden"}`}
              />
            </div>
          )}
        </button>
      ))}

      {/* Footer: score */}
      <div className="w-24 h-16 bg-light-blue rounded-[0.625rem] mt-4 flex flex-col items-center justify-center">
        <span>X {pickMark === "xMark" ? "(YOU)" : "(CPU)"}</span>
        <span className="text-preset-heading-sxs">{score.xMark}</span>
      </div>
      <div className="w-24 h-16 bg-light-silver rounded-[0.625rem] my-4 flex flex-col items-center justify-center">
        <span>TIES</span>
        <span className="text-preset-heading-sxs">{score.ties}</span>
      </div>
      <div className="w-24 h-16 bg-light-yellow rounded-[0.625rem] my-4 flex flex-col items-center justify-center">
        <span>O {pickMark === "oMark" ? "(YOU)" : "(CPU)"}</span>
        <span className="text-preset-heading-sxs">{score.oMark}</span>
      </div>

      {/* Restart modal */}
      {showRestart && (
        <div className="fixed  left-0 top-1/2 -translate-y-1/2 w-full bg-semi-dark-navy ">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex  items-center gap-2">
              <h1 className={`text-preset-heading-lm text-light-silver pt-6`}>
                RESTART GAME?
              </h1>
            </div>
            <div className="flex items-center justify-center gap-4 pb-8">
              <button
                type="button"
                onClick={handleRestart}
                className="h-10 p-3 text-preset-heading-sxs text-dark-navy rounded-[0.625rem] flex items-center justify-center place-self-end bg-light-silver inset-shadow-[0_-4px_0_0_rgba(107,137,151,1)] hover:brightness-110 hover:cursor-pointer"
              >
                NO, CANCEL
              </button>
              <button
                type="button"
                value={"yesReset"}
                onClick={handleRestart}
                className={`rounded-[0.625rem] h-10 px-4 text-preset-heading-sxs text-dark-navy bg-light-yellow inset-shadow-[0_-4px_0_0_rgba(204,139,19,1)] hover:brightness-110 hover:cursor-pointer`}
              >
                YES, RESTART
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game result */}
      {gameOver && (
        <div className="fixed  left-0 top-1/2 -translate-y-1/2 w-full bg-semi-dark-navy ">
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-light-silver pt-6">
              {winner === "tie"
                ? ""
                : winner === pickMark
                ? "YOU WON!"
                : "OH NO, YOU LOST..."}
            </span>
            <div className="flex  items-center gap-2">
              <img
                src="/assets/icon-x.svg"
                alt="x mark"
                className={`w-7 h-7 ${winner === "xMark" ? "block" : "hidden"}`}
              />
              <img
                src="/assets/icon-o.svg"
                alt="o mark"
                className={`w-7 h-7 ${winner === "oMark" ? "block" : "hidden"}`}
              />
              <h1
                className={`text-preset-heading-lm ${
                  winner === "tie"
                    ? "text-light-silver"
                    : winner === "xMark"
                    ? "text-light-blue"
                    : "text-light-yellow"
                }`}
              >
                {winner === "tie" ? "ROUND TIED" : "TAKES THE ROUND"}
              </h1>
            </div>
            <div className="flex items-center justify-center gap-4 pb-8">
              <button
                type="button"
                onClick={() => setScreen("menu")}
                className="h-10 p-3 text-preset-heading-sxs text-dark-navy rounded-[0.625rem] flex items-center justify-center place-self-end bg-light-silver inset-shadow-[0_-4px_0_0_rgba(107,137,151,1)] hover:brightness-110 hover:cursor-pointer"
              >
                QUIT
              </button>
              <button
                type="button"
                onClick={handleRestart}
                className={`rounded-[0.625rem] h-10 px-8 text-preset-heading-sxs text-dark-navy bg-light-yellow inset-shadow-[0_-4px_0_0_rgba(204,139,19,1)] hover:brightness-110 hover:cursor-pointer`}
              >
                NEXT ROUND
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Game;
