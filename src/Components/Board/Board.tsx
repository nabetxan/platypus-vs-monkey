import Player from "../Player/Player";
import { SelectedPieceAndPlayer } from "../Player/PlayerField";
import { handleCellClick } from "../Utils/GameStrategy";
import Cell from "./Cell";

const Board: React.FC<{
  players: Player[];
  gameboard: Cell[][];
  selectedPieceAndPlayer: SelectedPieceAndPlayer;
  currentPlayer: Player;
  winnerPlayer?: Player;
  winnerCells?: Cell[];
}> = function ({
  players,
  gameboard,
  selectedPieceAndPlayer,
  currentPlayer,
  winnerPlayer,
  winnerCells
}) {
  return (
    <div id="gameboard">
      {gameboard.map((row, r) => {
        return (
          <div className="row">
            {row.map((cell, c) => {
              let classname = "cell";
              // if a piece is selected from the board, highlight it
              if (selectedPieceAndPlayer.positionOnBoard) {
                if (
                  selectedPieceAndPlayer.positionOnBoard[0] === r &&
                  selectedPieceAndPlayer.positionOnBoard[1] === c
                ) {
                  classname = classname + " selected-cell";
                }
              }

              if (
                winnerPlayer &&
                ((winnerCells[0][0] === r && winnerCells[0][1] === c) ||
                  (winnerCells[1][0] === r && winnerCells[1][1] === c) ||
                  (winnerCells[2][0] === r && winnerCells[2][1] === c))
              ) {
                classname = classname + " win";
              }

              if (cell.pieces[0]) {
                classname = classname + " " + cell.pieces[0].size;
              }
              return (
                <div
                  className={classname}
                  onClick={() =>
                    handleCellClick(
                      players[0],
                      players[1],
                      gameboard,
                      selectedPieceAndPlayer,
                      currentPlayer,
                      cell,
                      r,
                      c,
                      onSelectPP((selectPP) => onChangeselectPP(selectPP)),
                      onPlayPiece(
                        setCurrentPlayer(updatedCurrentPlayer),
                        setGameboard(updatedGameboard),
                        setSelectedPieceAndPlayer({})
                      ),
                      winnerPlayer
                    )
                  }
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
