const ScoreBoard = function () {
  return (
    <div id="score-board">
      {/* {(() => {
        if (winnerPlayer) {
          return (
            <div id="winner-message">
              {winnerPlayer} wins!{" "}
              <button id="reMatch-btn" onClick={reMatch}>
                Re-match?
              </button>
            </div>
          );
        } else {
          return (
            <div id="on-play-message">
              <div>It's {currentPlayer.name}'s turn</div>
              <div id="score-board-player-image">
                {currentPlayer.name === P1.name ? (
                  <img src={platypus} alt="platypus"></img>
                ) : (
                  <img src={monkey} alt="monkey"></img>
                )}
              </div>
            </div>
          );
        }
      })()} */}
    </div>
  );
};

export default ScoreBoard;
