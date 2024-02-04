import { checkWin, isCellEmpty, isWinnerCell } from "../lib/gameStrategy";
import { GameStatus, Gameboard, Piece } from "../lib/types";
import Cell from "../models/cell";

const Board: React.FC<{
  gameboard: Gameboard;
  gameStatus: GameStatus;
  onChange: (gameboard: Gameboard, gameStatus: GameStatus) => void;
}> = function ({ gameboard, gameStatus, onChange }) {
  const currentPlayer = gameStatus.isP1CurrentPlayer
    ? gameStatus.P1
    : gameStatus.P2;
  const PnP = gameStatus.selectedPnP ?? {
    index: undefined,
    isSelectedFromBoard: false
  };

  const handleCellClick = function (cell: Cell, r: number, c: number) {
    // if the game is already finished --> noop
    if (gameStatus.winner) return;

    // when nothing is selected for selectedPieceAndPlayer
    // clicked an empty cell? --> noop
    // clicked an cell with opponent char on top? --> noop
    // clicked an cell with your character on top? --> select
    if (PnP.index === undefined) {
      if (isCellEmpty(cell) || cell.pieces[0].player !== currentPlayer) {
        return;
      } else {
        const pieceInfo = cell.pieces[0];
        const newGameStatus = {
          ...gameStatus,
          selectedPnP: {
            index: pieceInfo.index,
            pieceSize: pieceInfo.size,
            isSelectedFromBoard: true,
            positionOnBoard: [r, c],
            pieceInfo: pieceInfo
          }
        };
        onChange(gameboard, newGameStatus);
        return;
      }
    }

    // clicked non-empty cell and and the existing piece is equal or bigger? --> noop
    if (
      !isCellEmpty(cell) &&
      (PnP.pieceSize === "small" ||
        (PnP.pieceSize === "medium" && cell.pieces[0].size !== "small") ||
        (PnP.pieceSize === "large" &&
          cell.pieces[0].size !== "small" &&
          cell.pieces[0].size !== "medium"))
    )
      return;

    // in other cases (if it's smaller or the cell is empty)? --> play the piece
    const updatedGameboard = [...gameboard];
    // piece selected from the board? -->
    if (PnP.isSelectedFromBoard) {
      // check if that move will make opponent win
      PnP.positionOnBoard &&
        updatedGameboard[PnP.positionOnBoard[0]][
          PnP.positionOnBoard[1]
        ].pieces.shift();
      const winnerPos = checkWin(updatedGameboard);
      if (!winnerPos) {
        // remove the piece from the original cell
        PnP.pieceInfo && updatedGameboard[r][c].pieces.unshift(PnP.pieceInfo);
      }
    } else {
      // piece selected from hand pieces?
      const targetIndex = currentPlayer.piece.findIndex(
        (piece: Piece) => piece.index === PnP.index
      );
      updatedGameboard[r][c].pieces.unshift(currentPlayer.piece[targetIndex]);
      const updatePlayerPiece = [...currentPlayer.piece];
      updatePlayerPiece.splice(targetIndex, 1);
      currentPlayer.piece = updatePlayerPiece;
    }
    //then, play the piece
    const updatedGameStatus = {
      ...gameStatus,
      selectedPnP: {
        ...gameStatus.selectedPnP,
        index: undefined,
        pieceSize: undefined,
        isSelectedFromBoard: undefined,
        positionOnBoard: undefined
      },
      isP1CurrentPlayer: gameStatus.isP1CurrentPlayer ? false : true
    };
    onChange(updatedGameboard, updatedGameStatus);

    const winnerPos = checkWin(updatedGameboard);

    if (winnerPos) {
      const newGameStatus = {
        ...gameStatus,
        winner: winnerPos.winner
      };
      winnerPos.winner.record.win = winnerPos.winner.record.win + 1;
      onChange(updatedGameboard, newGameStatus);
    }
  };

  const getClassName = function (cell: Cell, r: number, c: number) {
    let classname = "cell";

    if (!gameStatus.winner && PnP?.positionOnBoard) {
      if (PnP.positionOnBoard[0] === r && PnP.positionOnBoard[1] === c) {
        classname = classname + " selected-cell";
      }
    }
    classname = isWinnerCell(r, c, gameboard, gameStatus)
      ? classname + " win"
      : classname;
    if (cell.pieces[0]) {
      classname = classname + " " + cell.pieces[0].size;
    }
    return classname;
  };

  return (
    <div id="gameboard">
      {gameboard.map((row, r) => {
        return (
          <div className="row" key={r}>
            {row.map((cell, c) => {
              return (
                <div
                  className={getClassName(cell, r, c)}
                  onClick={() => handleCellClick(cell, r, c)}
                  key={`${r}-${c}`}
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
