import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Tooltip } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { Gameboard } from "../Board/Cell";
import Player from "../Player/Player";
import { GameStatus, isCellEmpty } from "../Utils/GameStrategy";

const Menu: React.FC<{
  gameboard: Gameboard;
  gameStatus: GameStatus;
  onRematch: () => void;
  onChange: (gameStatus: GameStatus) => void;
}> = function ({ gameboard, gameStatus, onRematch, onChange }) {
  const [openHowTo, setOpenHowTo] = useState(false);
  const [openEditPlayerName, setOpenEditPlayerName] = useState(false);

  const handleClickHowTo = () => {
    setOpenHowTo(!openHowTo);
  };

  const handleClickEditPlayerName = () => {
    setOpenEditPlayerName(!openEditPlayerName);
  };

  const handlePlayerNameChange = (name: string, p: Player) => {
    const newGameStatus = { ...gameStatus };
    if (gameStatus.P1 === p) {
      newGameStatus.P1.name = name;
    } else {
      newGameStatus.P2.name = name;
    }
    onChange(newGameStatus);
  };

  const deleteMatchRecord = function () {
    //TODO: ask if you can really reset the record
    onRematch();
    gameStatus.P1.record.win = 0;
    gameStatus.P2.record.win = 0;
  };

  const canChangePlayerTurn = function () {
    const updatedGameboard = [...gameboard];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!isCellEmpty(updatedGameboard[i][j])) {
          //TODO: ask if you can really reset the game
        }
      }
    }
    return true;
  };

  const changePlayerTurn = function () {
    if (!canChangePlayerTurn()) return;
    return onRematch();
  };

  return (
    <div>
      <div id="option-menu">
        <div>
          <Tooltip title="How to Play" placement="top">
            <IconButton onClick={handleClickHowTo}>
              <HelpOutlineOutlinedIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </div>

        <div>
          <Tooltip title="Change Player Name" placement="top">
            <IconButton onClick={handleClickEditPlayerName}>
              <ModeEditOutlineOutlinedIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <Dialog open={openEditPlayerName} onClose={handleClickEditPlayerName}>
            <DialogTitle>Edit Player Name</DialogTitle>
            <DialogContent>
              <DialogContentText>Please input player's name.</DialogContentText>
              {[gameStatus.P1, gameStatus.P2].map((p) => {
                return (
                  <div className="player-name-edit" key={p.name}>
                    <img id="icon" src={p.char} alt="player-icon"></img>
                    <input
                      type="text"
                      id="player-name"
                      autoFocus
                      required
                      minLength={1}
                      defaultValue={p.name ?? "name"}
                      onChange={(e) => {
                        handlePlayerNameChange(e.target.value, p);
                      }}
                      className="border rounded p-2"
                    ></input>
                  </div>
                );
              })}
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <Tooltip title="Change Player Turn" placement="top">
            <IconButton onClick={changePlayerTurn}>
              <ChangeCircleOutlinedIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </div>

        <div>
          <Tooltip title="Delete Match Record" placement="top">
            <IconButton onClick={deleteMatchRecord}>
              <DeleteOutlineOutlinedIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {openHowTo && (
        <div id="how-to-play-dialog" className="fadeInUp">
          <div id="how-to-play-dialog-title" className="text-3xl mb-3">
            ⭐️How to Play⭐️
          </div>
          <div id="how-to-play-dialog-description">
            <ol type="1">
              <li>1. The game starts with an empty 3x3 grid.</li>
              <li>
                2. Player has 6 Platypuses or 6 Monkeys. There are 2 small
                pieces, 2 medium pieces, and 2 large pieces for each player.
              </li>
              <li>
                3. Player place one of their pieces to the gameboard cell in
                turn.
              </li>
              <li>
                4. Just like the Tic Tac Toe, the game ends when one player
                lines up three cells in a row with their character, either
                horizontally, vertically or diagonally.
              </li>
              <li>
                5. The big difference from Tic Tac Toe is that the player can
                either put their piece from their hand OR move the piece which
                is already on the gameboard.
              </li>
              <li>
                6. Even if there is already another piece on the cell,
                regardless of whether it belongs to you or your opponent, if the
                piece is smaller, you can place your piece over it.
              </li>
              <li>
                7. Player cannot move the piece if it's underneath of another
                bigger piece.
              </li>
            </ol>
          </div>

          <DialogActions>
            <IconButton onClick={handleClickHowTo}>Close</IconButton>
          </DialogActions>
        </div>
      )}
    </div>
  );
};

export default Menu;
