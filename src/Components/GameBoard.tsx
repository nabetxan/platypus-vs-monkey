import { useState } from "react";
import monkey from "../img/vector-monkey.png";
import platypus from "../img/vector-platypus.png";
import Board from "./Board/Board";
import Cell, { Gameboard } from "./Board/Cell";
import Menu from "./Menu/Menu";
import Player from "./Player/Player";
import PlayerField, { SelectedPieceAndPlayer } from "./Player/PlayerField";
import ScoreBoard from "./ScoreBoard/ScoreBoard";

const P1 = new Player("Perry", platypus, "rgb(49, 224, 255)", "P1");
const P2 = new Player("Mino", monkey, "rgb(255, 164, 60)", "P2");
const blankGameboard = [
  [new Cell(), new Cell(), new Cell()],
  [new Cell(), new Cell(), new Cell()],
  [new Cell(), new Cell(), new Cell()]
];
const GameBoard = function () {
  const [players] = useState([P1, P2]);
  const [currentPlayer, setCurrentPlayer] = useState(P1);
  const [gameboard, setGameboard] = useState(blankGameboard as Gameboard);
  const [selectedPnP, setSelectedPnP] = useState({} as SelectedPieceAndPlayer);
  const [winner, setWinner] = useState();
  // const [winnerCells, setWinnerCells] = useState([]);
  const [scoreKeep, setScoreKeep] = useState([0, 0]);

  const updateTurn = function (player: Player) {
    player === P1 ? setCurrentPlayer(P2) : setCurrentPlayer(P1);
  };

  const reMatch = function () {
    setGameboard(blankGameboard);
    setCurrentPlayer(P1);
    setWinner(undefined);
    setSelectedPnP({});
    // setWinnerCells([]);

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
        selectedPnP={selectedPnP}
        onChange={(selectedPP) => setSelectedPnP(selectedPP)}
        winner={winner}
        scoreKeep={scoreKeep}
      />
      <div id="center-content">
        <ScoreBoard
          currentPlayer={currentPlayer}
          winner={winner}
          onReMatch={reMatch}
        />
        <Board
          players={players}
          gameboard={gameboard}
          selectedPnP={selectedPnP}
          currentPlayer={currentPlayer}
          winner={winner}
          onChange={(selectedPnP, currentPlayer, updatedGameboard) => {
            selectedPnP && setSelectedPnP(selectedPnP),
              currentPlayer && setCurrentPlayer(currentPlayer),
              updatedGameboard && setGameboard(updatedGameboard);
          }}
        />
        <Menu />
      </div>
      <PlayerField
        player={P2}
        opponent={P1}
        currentPlayer={currentPlayer}
        selectedPnP={selectedPnP}
        onChange={(selectedPP) => setSelectedPnP(selectedPP)}
        winner={winner}
        scoreKeep={scoreKeep}
      />
    </div>
  );
};

export default GameBoard;
