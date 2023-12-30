import { useState } from "react";
import monkey from "../img/vector-monkey.png";
import platypus from "../img/vector-platypus.png";
import Board from "./Board/Board";
import Cell from "./Board/Cell";
import Menu from "./Menu/Menu";
import Player from "./Player/Player";
import PlayerField from "./Player/PlayerField";
import ScoreBoard from "./ScoreBoard/ScoreBoard";

const P1 = new Player("Perry", platypus, "rgb(49, 224, 255)");
const P2 = new Player("Mino", monkey, "rgb(255, 164, 60)");
const GameBoard = function () {
  // const [playerName, setPlayerName] = useState(["Perry", "Mino"]);
  const [gameboard, setGameboard] = useState([
    [new Cell(), new Cell(), new Cell()],
    [new Cell(), new Cell(), new Cell()],
    [new Cell(), new Cell(), new Cell()]
  ]);

  const [currentPlayer, setCurrentPlayer] = useState(P1);
  const [winnerPlayer, setWinnerPlayer] = useState();
  const [player1Piece, setPlayer1Piece] = useState(P1.piece);
  const [player2Piece, setPlayer2Piece] = useState(P2.piece);
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
    setPlayer1Piece(P1.piece);
    setPlayer2Piece(P2.piece);
    setSelectedPieceAndPlayer([]);
    setWinnerCells([]);

    const parent = document.getElementById("score-board");
    const childToRemove = document.getElementById("confetti-container");
    if (parent && childToRemove) {
      parent.removeChild(childToRemove);
    }
  };

  console.log(
    P1,
    P2,
    gameboard,
    currentPlayer,
    winnerPlayer,
    player1Piece,
    player2Piece,
    selectedPieceAndPlayer
  );
  return (
    <div id="game-content">
      <PlayerField
        P={P1}
        scoreKeep={scoreKeep}
        playerPiece={player1Piece}
        opponentPiece={player2Piece}
        currentPlayer={currentPlayer}
        selectedPieceAndPlayer={selectedPieceAndPlayer}
        onChange={(selectedPP) => setSelectedPieceAndPlayer(selectedPP)}
        winnerPlayer={winnerPlayer}
      />
      <div id="center-content">
        <ScoreBoard
          currentPlayer={currentPlayer}
          winnerPlayer={winnerPlayer}
          onReMatch={reMatch}
        />
        <Board
          gameboard={gameboard}
          selectedPieceAndPlayer={selectedPieceAndPlayer}
          winnerPlayer={winnerPlayer}
          winnerCells={winnerCells}
        />
        <Menu />
      </div>
      <PlayerField
        P={P2}
        scoreKeep={scoreKeep}
        playerPiece={player2Piece}
        opponentPiece={player1Piece}
        currentPlayer={currentPlayer}
        selectedPieceAndPlayer={selectedPieceAndPlayer}
        onChange={(selectedPP) => setSelectedPieceAndPlayer(selectedPP)}
        winnerPlayer={winnerPlayer}
      />
    </div>
  );
};

export default GameBoard;
