import { useEffect, useState } from "react";
import useMediaQuery from "../../useMediaQuery";
import GameBoard from "./GameBoard";
import GameBoardMobile from "./GameBoardMobile";
import monkey from "./img/vector-monkey.png";
import platypus from "./img/vector-platypus.png";
import { generateBlankGameboard } from "./lib/gameStrategy";
import { GameStatus, SavedGameStatus } from "./lib/types";
import Player from "./models/player";

const getInitialGameStatus = () => {
  const savedGameStatus = JSON.parse(
    localStorage.getItem("gameStatus") ??
      JSON.stringify({
        P1: { name: "Perry", record: 0 },
        P2: { name: "Mino", record: 0 }
      })
  ) as SavedGameStatus;

  const initialGameStatus = {
    P1: new Player(
      savedGameStatus.P1.name,
      platypus,
      "rgb(49, 224, 255)",
      "P1",
      savedGameStatus.P1.record
    ),
    P2: new Player(
      savedGameStatus.P2.name,
      monkey,
      "rgb(255, 164, 60)",
      "P2",
      savedGameStatus.P2.record
    ),
    isP1CurrentPlayer: true
  } as GameStatus;

  return initialGameStatus;
};

const saveGameStatus = (status: GameStatus) => {
  // Create required parameters object
  const newGameStatus = {
    P1: { name: status.P1.name, record: status.P1.record.win },
    P2: { name: status.P2.name, record: status.P2.record.win }
  };
  // Save to local storage
  localStorage.setItem("gameStatus", JSON.stringify(newGameStatus));
};

const Game = function () {
  const [loading, setLoading] = useState(true);
  const [gameboard, setGameboard] = useState(generateBlankGameboard());
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    getInitialGameStatus()
  );
  const isMobile = useMediaQuery("(max-width: 670px)");
  useEffect(() => {
    if (gameStatus) {
      setLoading(false);
      saveGameStatus(gameStatus);
    }
  }, [gameStatus]);

  const reMatch = function () {
    gameStatus?.P1.resetPiece();
    gameStatus?.P2.resetPiece();
    const blankGameboard = generateBlankGameboard();
    setGameboard(blankGameboard);
    setGameStatus({
      ...gameStatus,
      isP1CurrentPlayer: gameStatus.isP1CurrentPlayer ? false : true,
      selectedPnP: undefined,
      winner: undefined
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
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
  }
};

export default Game;
