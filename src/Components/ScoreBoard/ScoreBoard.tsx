import Player from "../Player/Player";

const ScoreBoard: React.FC<{
  currentPlayer: Player;
  winnerPlayer?: Player;
  onReMatch: () => void;
}> = function ({ currentPlayer, winnerPlayer, onReMatch }) {
  return (
    <div id="score-board">
      {(() => {
        if (winnerPlayer) {
          return (
            <div id="winner-message">
              {winnerPlayer.name} wins!
              <button id="reMatch-btn" onClick={onReMatch}>
                Re-match?
              </button>
            </div>
          );
        } else {
          return (
            <div id="on-play-message">
              <div>It's {currentPlayer.name}'s turn</div>
              <div id="score-board-player-image">
                <img src={currentPlayer.char} alt="player-character"></img>
              </div>
            </div>
          );
        }
      })()}
    </div>
  );
};

export default ScoreBoard;
