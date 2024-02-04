import { useState } from "react";
import useMediaQuery from "../../useMediaQuery";
import GameBoard from "./GameBoard";
import GameBoardMobile from "./GameBoardMobile";
import monkey from "./img/vector-monkey.png";
import platypus from "./img/vector-platypus.png";
import { generateBlankGameboard } from "./lib/gameStrategy";
import { GameStatus } from "./lib/types";
import Player from "./models/player";

const P1 = new Player("Perry", platypus, "rgb(49, 224, 255)", "P1", 0);
const P2 = new Player("Mino", monkey, "rgb(255, 164, 60)", "P2", 0);

const Game = function () {
  const [gameboard, setGameboard] = useState(generateBlankGameboard());
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    P1: P1,
    P2: P2,
    isP1CurrentPlayer: true
  });
  const reMatch = function () {
    gameStatus.P1.resetPiece();
    gameStatus.P2.resetPiece();
    const blankGameboard = generateBlankGameboard();
    setGameboard(blankGameboard);
    setGameStatus({
      ...gameStatus,
      isP1CurrentPlayer: gameStatus.isP1CurrentPlayer ? false : true,
      selectedPnP: undefined,
      winner: undefined
    });
  };
  const isMobile = useMediaQuery("(max-width: 670px)");

  return (
    <>
      {isMobile ? (
        <GameBoardMobile
          gameboard={gameboard}
          gameStatus={gameStatus}
          onChangeGameStatus={setGameStatus}
          onChangeGameboard={setGameboard}
          onReMatch={reMatch}
        />
      ) : (
        <GameBoard
          gameboard={gameboard}
          gameStatus={gameStatus}
          onChangeGameStatus={setGameStatus}
          onChangeGameboard={setGameboard}
          onReMatch={reMatch}
        />
      )}
    </>
  );
};

export default Game;
