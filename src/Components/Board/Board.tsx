const Board = function () {
  return (
    <div id="gameboard">
      {/* {gameboard.map((row, r) => {
        return (
          <div className="row">
            {row.map((cell, c) => {
              let classname = "cell";
              // if a piece is selected from the board, highlight it
              if (selectedPieceAndPlayer[4] !== undefined) {
                if (
                  selectedPieceAndPlayer[4][0] === r &&
                  selectedPieceAndPlayer[4][1] === c
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
                if (cell.pieces[0].size === "S") {
                  classname = classname + " small";
                }
                if (cell.pieces[0].size === "M") {
                  classname = classname + " medium";
                }
                if (cell.pieces[0].size === "L") {
                  classname = classname + " large";
                }
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
      })} */}
    </div>
  );
};

export default Board;
