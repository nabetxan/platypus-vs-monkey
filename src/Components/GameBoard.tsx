import { useState } from "react";
import monkey from "../img/vector-monkey.png";
import platypus from "../img/vector-platypus.png";
import Board from "./Board/Board";
import Cell, { Gameboard } from "./Board/Cell";
import Menu from "./Menu/Menu";
import Player from "./Player/Player";
import PlayerField from "./Player/PlayerField";
import Confetti from "./ScoreBoard/Confetti";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import { GameStatus } from "./Utils/GameStrategy";

const P1 = new Player("Perry", platypus, "rgb(49, 224, 255)", "P1");
const P2 = new Player("Mino", monkey, "rgb(255, 164, 60)", "P2");
const blankGameboard = [
  [new Cell(), new Cell(), new Cell()],
  [new Cell(), new Cell(), new Cell()],
  [new Cell(), new Cell(), new Cell()]
];
const GameBoard = function () {
  const [gameboard, setGameboard] = useState(blankGameboard as Gameboard);
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    P1: P1,
    P2: P2,
    isP1CurrentPlayer: true
  });
  const [scoreKeep, setScoreKeep] = useState([0, 0]);

  const reMatch = function () {
    setGameboard(blankGameboard);
    setGameStatus({
      P1: P1,
      P2: P2,
      isP1CurrentPlayer: true,
      selectedPnP: {},
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
        scoreKeep={scoreKeep}
      />

      <div id="center-content">
        <Confetti winner={gameStatus.winner}>
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
        <Menu />
      </div>

      <PlayerField
        player={gameStatus.P2}
        opponent={gameStatus.P1}
        gameStatus={gameStatus}
        onChange={(gameStatus) => setGameStatus(gameStatus)}
        scoreKeep={scoreKeep}
      />
    </div>
  );
};

export default GameBoard;
