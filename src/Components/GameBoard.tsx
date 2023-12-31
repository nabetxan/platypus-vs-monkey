import { useState } from "react";
import monkey from "../img/vector-monkey.png";
import platypus from "../img/vector-platypus.png";
import Board from "./Board/Board";
import Cell from "./Board/Cell";
import Menu from "./Menu/Menu";
import Player from "./Player/Player";
import PlayerField from "./Player/PlayerField";
import ScoreBoard from "./ScoreBoard/ScoreBoard";

const P1 = new Player("Perry", platypus, "rgb(49, 224, 255)", "P1");
const P2 = new Player("Mino", monkey, "rgb(255, 164, 60)", "P2");

const GameBoard = function () {
  const [players, setPlayers] = useState([P1, P2]);
  const [gameboard, setGameboard] = useState([
    [new Cell(), new Cell(), new Cell()],
    [new Cell(), new Cell(), new Cell()],
    [new Cell(), new Cell(), new Cell()]
  ]);

  const [currentPlayer, setCurrentPlayer] = useState(P1);
  const [winnerPlayer, setWinnerPlayer] = useState();
  const [selectedPieceAndPlayer, setSelectedPieceAndPlayer] = useState({});
  const [winnerCells, setWinnerCells] = useState([]);
  const [scoreKeep, setScoreKeep] = useState([0, 0]);

  const reMatch = function () {
    setGameboard([
      [new Cell(), new Cell(), new Cell()],
      [new Cell(), new Cell(), new Cell()],
      [new Cell(), new Cell(), new Cell()]
    ]);
    setCurrentPlayer(P1);
    setWinnerPlayer(undefined);
    setSelectedPieceAndPlayer({});
    setWinnerCells([]);

    const parent = document.getElementById("score-board");
    const childToRemove = document.getElementById("confetti-container");
    if (parent && childToRemove) {
      parent.removeChild(childToRemove);
    }
  };

  return (
    <div id="game-content">
      <PlayerField
        player={P1}
        opponent={P2}
        currentPlayer={currentPlayer}
        selectedPieceAndPlayer={selectedPieceAndPlayer}
        onChange={(selectedPP) => setSelectedPieceAndPlayer(selectedPP)}
        winnerPlayer={winnerPlayer}
        scoreKeep={scoreKeep}
      />
      <div id="center-content">
        <ScoreBoard
          currentPlayer={currentPlayer}
          winnerPlayer={winnerPlayer}
          onReMatch={reMatch}
        />
        <Board
          players={players}
          gameboard={gameboard}
          selectedPieceAndPlayer={selectedPieceAndPlayer}
          currentPlayer={currentPlayer}
          winnerPlayer={winnerPlayer}
          winnerCells={winnerCells}
        />
        <Menu />
      </div>
      <PlayerField
        player={P2}
        opponent={P1}
        currentPlayer={currentPlayer}
        selectedPieceAndPlayer={selectedPieceAndPlayer}
        onChange={(selectedPP) => setSelectedPieceAndPlayer(selectedPP)}
        winnerPlayer={winnerPlayer}
        scoreKeep={scoreKeep}
      />
    </div>
  );
};

export default GameBoard;
