import { GameStatus, checkWin, isCellEmpty } from "../Utils/GameStrategy";
import Cell, { Gameboard } from "./Cell";

const Board: React.FC<{
  gameboard: Gameboard;
  gameStatus: GameStatus;
  onChange: (gameboard: Gameboard, gameStatus: GameStatus) => void;
}> = function ({ gameboard, gameStatus, onChange }) {
  const currentPlayer = gameStatus.isP1CurrentPlayer
    ? gameStatus.P1
    : gameStatus.P2;
  const PnP = gameStatus.selectedPnP;

  // check if the cell is a winnerCell
  const isWinnerCell = function (r: number, c: number) {
    if (!gameStatus.winner) return false;
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
    if (gameStatus.winner) return;

    // when nothing is selected for selectedPieceAndPlayer
    // you clicked an empty cell? --> noop
    // you clicked an cell with opponent char on top? --> noop
    if (!PnP?.index) {
      if (isCellEmpty(cell) || cell.pieces[0]?.player !== currentPlayer) {
        return;
      } else if (cell.pieces[0]?.player === currentPlayer) {
        // you clicked an cell with your character on top? --> select
        const swapPieceIndex = cell.pieces[0].index;
        const swapPieceSize = cell.pieces[0].size;
        const pieceInfo = cell.pieces[0];
        const newGameStatus = {
          ...gameStatus,
          selectedPnP: {
            index: swapPieceIndex,
            currentPlayer: currentPlayer,
            pieceSize: swapPieceSize,
            isSelectedFromBoard: true,
            positionOnBoard: [r, c],
            pieceInfo: pieceInfo
          }
        };
        onChange({ ...gameboard }, newGameStatus);
        return;
      }
    }

    // when a piece is already selected from hand pieces
    if (!PnP?.isSelectedFromBoard) {
      // when the cell is not empty and and the piece is equal or bigger --> noop
      if (!isCellEmpty(cell)) {
        if (PnP?.pieceSize === "small") return;
        if (PnP?.pieceSize === "medium" && cell.pieces[0].size !== "small") {
          return;
        }
        if (
          PnP?.pieceSize === "large" &&
          cell.pieces[0].size !== "small" &&
          cell.pieces[0].size !== "medium"
        ) {
          return;
        }
      }
      // in other cases (if it's smaller or the cell is empty), play the piece

      const updatedGameboard = [...gameboard];

      const pieceIndex = currentPlayer.piece.findIndex(
        (piece) => piece.index === PnP?.index
      );
      updatedGameboard[r][c].pieces.unshift(currentPlayer.piece[pieceIndex]);
      const updatePlayerPiece = [...currentPlayer.piece];
      updatePlayerPiece.splice(pieceIndex, 1);
      currentPlayer.piece = updatePlayerPiece;
      // TODO: あってる？？
      //元々setPlayer2Piece(updatePlayer2Piece);のように管理していた
      const newGameStatus = {
        ...gameStatus,
        isP1CurrentPlayer: gameStatus.isP1CurrentPlayer ? false : true
      };
      onChange(updatedGameboard, newGameStatus);

      const winnerPos = checkWin(updatedGameboard);

      if (winnerPos) {
        const newGameStatus = {
          ...gameStatus,
          winner: winnerPos.winner
        };
        onChange({ ...gameboard }, newGameStatus);

        // if (winnerPos.winner === P1) {
        //   const newScore = scoreKeep[0] + 1;
        //   setScoreKeep([newScore, scoreKeep[1]]);
        //   addConfetti(document.getElementById("score-board"));
        // } else {
        //   const newScore = scoreKeep[1] + 1;
        //   setScoreKeep([scoreKeep[0], newScore]);
        //   addConfetti(document.getElementById("score-board"));
        // }
      }
    } else if (PnP.isSelectedFromBoard) {
      // when a piece is already selected from the board
      // when the cell is not empty and and the piece is equal or bigger --> noop

      if (
        !isCellEmpty(cell) &&
        (PnP.pieceSize === "small" ||
          (PnP.pieceSize === "medium" && cell.pieces[0].size !== "small") ||
          (PnP.pieceSize === "large" &&
            cell.pieces[0].size !== "small" &&
            cell.pieces[0].size !== "medium"))
      )
        return;

      // in other cases (if it's smaller or the cell is empty),
      // first remove the piece from the original cell

      const updatedGameboard = [...gameboard];

      PnP.positionOnBoard &&
        updatedGameboard[PnP.positionOnBoard[0]][
          PnP.positionOnBoard[1]
        ].pieces.shift();

      //then, play the piece

      PnP.pieceInfo && updatedGameboard[r][c].pieces.unshift(PnP.pieceInfo);

      const newGameStatus = {
        ...gameStatus,
        isP1CurrentPlayer: gameStatus.isP1CurrentPlayer ? false : true,
        selectedPnP: {}
      };
      onChange(updatedGameboard, newGameStatus);

      const winnerPos = checkWin(updatedGameboard);

      if (winnerPos) {
        const newGameStatus = {
          ...gameStatus,
          winner: winnerPos.winner
        };
        onChange(updatedGameboard, newGameStatus);
      }
    }
  };

  return (
    <div id="gameboard">
      {gameboard.map((row, r) => {
        return (
          <div className="row" key={r}>
            {row.map((cell, c) => {
              let classname = "cell";
              // if a piece is selected from the board, highlight it
              if (PnP?.positionOnBoard) {
                if (
                  PnP.positionOnBoard[0] === r &&
                  PnP.positionOnBoard[1] === c
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
