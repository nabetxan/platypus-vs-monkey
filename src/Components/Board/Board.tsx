import Player from "../Player/Player";
import { SelectedPieceAndPlayer } from "../Player/PlayerField";
import { checkWin, isCellEmpty } from "../Utils/GameStrategy";
import Cell, { Gameboard } from "./Cell";

const Board: React.FC<{
  players: Player[];
  gameboard: Gameboard;
  selectedPnP: SelectedPieceAndPlayer;
  currentPlayer: Player;
  winner?: Player;
  onChange: (
    selectedPnP?: SelectedPieceAndPlayer,
    currentPlayer?: Player,
    updatedGameboard?: Gameboard
  ) => void;
}> = function ({
  players,
  gameboard,
  selectedPnP,
  currentPlayer,
  winner,
  onChange
}) {
  // check if the cell is a winnerCell

  const isWinnerCell = function (r: number, c: number) {
    if (!winner) return false;
    const winnerObj = checkWin(gameboard);
    if (!winnerObj) return false;
    const winnerPos = winnerObj.winnerPos;
    if (
      (winnerPos[0][0] === r && winnerPos[0][1] === c) ||
      (winnerPos[1][0] === r && winnerPos[1][1] === c) ||
      (winnerPos[2][0] === r && winnerPos[2][1] === c)
    )
      return true;
  };

  const handleCellClick = function (cell: Cell, r: number, c: number) {
    // if the game is already finished --> noop
    if (winner) return;

    // when nothing is selected for selectedPieceAndPlayer
    // you clicked an empty cell? --> noop
    // you clicked an cell with opponent char on top? --> noop

    if (!selectedPnP.index) {
      if (isCellEmpty(cell) || cell.pieces[0]?.player !== currentPlayer) {
        return;
      } else if (cell.pieces[0]?.player === currentPlayer) {
        // you clicked an cell with your character on top? --> select
        const swapPieceIndex = cell.pieces[0].index;
        const swapPieceSize = cell.pieces[0].size;
        const pieceInfo = cell.pieces[0];
        onChange(
          {
            index: swapPieceIndex,
            currentPlayer: currentPlayer,
            pieceSize: swapPieceSize,
            isSelectedFromBoard: true,
            positionOnBoard: [r, c],
            pieceInfo: pieceInfo
          },
          currentPlayer,
          gameboard
        );
        return;
      }
    }

    // when a piece is already selected from hand pieces
    if (!selectedPnP.isSelectedFromBoard) {
      // when the cell is not empty and and the piece is equal or bigger --> noop
      if (!isCellEmpty(cell)) {
        if (selectedPnP.pieceSize === "small") return;
        if (
          selectedPnP.pieceSize === "medium" &&
          cell.pieces[0].size !== "small"
        ) {
          return;
        }
        if (
          selectedPnP.pieceSize === "large" &&
          cell.pieces[0].size !== "small" &&
          cell.pieces[0].size !== "medium"
        ) {
          return;
        }
      }
      // in other cases (if it's smaller or the cell is empty), play the piece

      const updatedGameboard = [...gameboard];
      const updatedCurrentPlayer =
        currentPlayer === players[0] ? players[1] : players[0];

      const pieceIndex = currentPlayer.piece.findIndex(
        (piece) => piece.index === selectedPnP.index
      );
      updatedGameboard[r][c].pieces.unshift(currentPlayer.piece[pieceIndex]);
      const updatePlayerPiece = [...currentPlayer.piece];
      updatePlayerPiece.splice(pieceIndex, 1);
      currentPlayer.piece = updatePlayerPiece;
      // TODO: あってる？？
      //元々setPlayer2Piece(updatePlayer2Piece);のように管理していた
      onChange({}, updatedCurrentPlayer, updatedGameboard);

      const winnerPos = checkWin(updatedGameboard);

      if (winnerPos) {
        // setWinnerCells(winnerPos);
        // setwinner(winnerPos.winner.name);
        // if (winnerPos.winner === P1) {
        //   const newScore = scoreKeep[0] + 1;
        //   setScoreKeep([newScore, scoreKeep[1]]);
        //   addConfetti(document.getElementById("score-board"));
        // } else {
        //   const newScore = scoreKeep[1] + 1;
        //   setScoreKeep([scoreKeep[0], newScore]);
        //   addConfetti(document.getElementById("score-board"));
        // }
        // setwinner(currentPlayer.name);
      }
    } else if (selectedPnP.isSelectedFromBoard) {
      // when a piece is already selected from the board
      // when the cell is not empty and and the piece is equal or bigger --> noop

      if (!isCellEmpty(cell)) {
        if (selectedPnP.pieceSize === "small") {
          return;
        }

        if (
          selectedPnP.pieceSize === "medium" &&
          cell.pieces[0].size !== "small"
        ) {
          return;
        }
        if (
          selectedPnP.pieceSize === "large" &&
          cell.pieces[0].size !== "small" &&
          cell.pieces[0].size !== "medium"
        ) {
          return;
        }
      }
      // in other cases (if it's smaller or the cell is empty),
      // first remove the piece from the original cell

      const updatedGameboard = [...gameboard];
      updatedGameboard[selectedPnP.positionOnBoard[0]][
        selectedPnP.positionOnBoard[1]
      ].pieces.shift();

      //then, play the piece
      const updatedCurrentPlayer = currentPlayer === P1 ? P2 : P1;

      updatedGameboard[r][c].pieces.unshift(selectedPnP.pieceInfo);

      setCurrentPlayer(updatedCurrentPlayer);
      setGameboard(updatedGameboard);
      setSelectedPieceAndPlayer([]);

      const winnerPos = checkWin(updatedGameboard);

      if (winnerPos) {
        setWinnerCells(winnerPos);
        setwinner(winnerPos[3].name);
        // setwinner(currentPlayer.name);
      }
    }
  };

  return (
    <div id="gameboard">
      {gameboard.map((row, r) => {
        return (
          <div className="row">
            {row.map((cell, c) => {
              let classname = "cell";
              // if a piece is selected from the board, highlight it
              if (selectedPnP.positionOnBoard) {
                if (
                  selectedPnP.positionOnBoard[0] === r &&
                  selectedPnP.positionOnBoard[1] === c
                ) {
                  classname = classname + " selected-cell";
                }
              }

              classname = isWinnerCell(r, c) ? classname + " win" : classname;

              if (cell.pieces[0]) {
                classname = classname + " " + cell.pieces[0].size;
              }
              return (
                <div
                  className={classname}
                  onClick={() => handleCellClick(cell, r, c)}
                >
                  {cell.pieces[0] && (
                    <img src={cell.pieces[0].character} alt="piece"></img>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
