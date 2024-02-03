import "./GameBoard.css";
import Board from "./components/Board";
import Confetti from "./components/Confetti";
import Menu from "./components/Menu";
import PlayerField from "./components/PlayerField";
import ScoreBoard from "./components/ScoreBoard";
import { GameStatus, Gameboard } from "./lib/types";

const GameBoardMobile: React.FC<{
  gameboard: Gameboard;
  gameStatus: GameStatus;
  onChangeGameStatus: (gameStatus: GameStatus) => void;
  onChangeGameboard: (gameboard: Gameboard) => void;
  onReMatch: () => void;
}> = function ({
  gameboard,
  gameStatus,
  onChangeGameStatus,
  onChangeGameboard,
  onReMatch
}) {
  return (
    <div id="game-content">
      <PlayerField
        player={gameStatus.P1}
        opponent={gameStatus.P2}
        gameStatus={gameStatus}
        onChange={(gameStatus) => onChangeGameStatus(gameStatus)}
      />
      <div id="center-content">
        <Confetti show={gameStatus.winner ? true : false}>
          <ScoreBoard
            currentPlayer={
              gameStatus.isP1CurrentPlayer ? gameStatus.P1 : gameStatus.P2
            }
            winner={gameStatus.winner}
            onReMatch={onReMatch}
          />
        </Confetti>
        <Board
          gameboard={gameboard}
          gameStatus={gameStatus}
          onChange={(gameboard, gameStatus) => {
            onChangeGameboard(gameboard);
            onChangeGameStatus(gameStatus);
          }}
        />
        <Menu
          gameboard={gameboard}
          gameStatus={gameStatus}
          onReMatch={onReMatch}
          onChange={onChangeGameStatus}
        />
      </div>
      <PlayerField
        player={gameStatus.P2}
        opponent={gameStatus.P1}
        gameStatus={gameStatus}
        onChange={onChangeGameStatus}
      />
    </div>
  );
};

export default GameBoardMobile;
