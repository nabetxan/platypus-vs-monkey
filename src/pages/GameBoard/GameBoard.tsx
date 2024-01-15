import { useState } from "react";
import monkey from "./img/vector-monkey.png";
import platypus from "./img/vector-platypus.png";
import "./GameBoard.css";
import Board from "./components/Board";
import Confetti from "./components/Confetti";
import Menu from "./components/Menu";
import PlayerField from "./components/PlayerField";
import ScoreBoard from "./components/ScoreBoard";
import { generateBlankGameboard } from "./lib/gameStrategy";
import { GameStatus } from "./lib/types";
import Player from "./models/player";

const P1 = new Player("Perry", platypus, "rgb(49, 224, 255)", "P1", 0);
const P2 = new Player("Mino", monkey, "rgb(255, 164, 60)", "P2", 0);

const GameBoard = function () {
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

  return (
    <div id="game-content">
      <PlayerField
        player={gameStatus.P1}
        opponent={gameStatus.P2}
        gameStatus={gameStatus}
        onChange={(gameStatus) => setGameStatus(gameStatus)}
      />

      <div id="center-content">
        <Confetti show={gameStatus.winner ? true : false}>
          <ScoreBoard
            currentPlayer={
              gameStatus.isP1CurrentPlayer ? gameStatus.P1 : gameStatus.P2
            }
            winner={gameStatus.winner}
            onReMatch={reMatch}
          />
        </Confetti>
        <Board
          gameboard={gameboard}
          gameStatus={gameStatus}
          onChange={(gameboard, gameStatus) => {
            setGameboard(gameboard);
            setGameStatus(gameStatus);
          }}
        />
        <Menu
          gameboard={gameboard}
          gameStatus={gameStatus}
          onRematch={reMatch}
          onChange={setGameStatus}
        />
      </div>

      <PlayerField
        player={gameStatus.P2}
        opponent={gameStatus.P1}
        gameStatus={gameStatus}
        onChange={setGameStatus}
      />
    </div>
  );
};

export default GameBoard;
