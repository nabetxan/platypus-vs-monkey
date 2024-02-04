import Player from "../models/player";

const ScoreBoard: React.FC<{
  currentPlayer: Player;
  winner?: Player;
  onReMatch: () => void;
}> = function ({ currentPlayer, winner, onReMatch }) {
  return (
    <div id="score-board">
      {winner && (
        <div id="winner-message-container">
          <div
            id="winner-message"
            className={winner.name.length > 6 ? "breakline" : ""}
          >
            <span
              className={winner.name.length > 6 ? "name-short pl-1" : "pl-1"}
            >
              {winner.name}
            </span>
            <span className="text-nowrap">wins!</span>
            <button id="reMatch-btn" onClick={onReMatch}>
              Re-match?
            </button>
          </div>
          <div id="score-board-player-image" className="scale-50">
            <img
              src={winner.char}
              alt="player-character"
              className="animate-bounce"
            ></img>
          </div>
        </div>
      )}

      {!winner && (
        <div id="on-play-message-container">
          <div id="on-play-message">
            <span className="text-nowrap">It's</span>
            <span
              className={
                currentPlayer.name.length > 6 ? "name-short pl-1" : "pl-1"
              }
            >
              {currentPlayer.name}
            </span>
            <span className="text-nowrap">'s turn</span>
          </div>
          <div id="score-board-player-image">
            <img src={currentPlayer.char} alt="player-character"></img>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
