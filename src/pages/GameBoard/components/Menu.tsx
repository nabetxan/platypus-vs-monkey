import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Button, Tooltip } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { isGameboardEmpty } from "../lib/gameStrategy";
import { GameStatus, Gameboard } from "../lib/types";
import Player from "../models/player";

const Menu: React.FC<{
  gameboard: Gameboard;
  gameStatus: GameStatus;
  onReMatch: () => void;
  onChange: (gameStatus: GameStatus) => void;
}> = function ({ gameboard, gameStatus, onReMatch, onChange }) {
  const [openHowTo, setOpenHowTo] = useState(false);
  const [openEditPlayerName, setOpenEditPlayerName] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleClickOpenAlertDialog = () => {
    if (!isGameboardEmpty(gameboard) && !gameStatus.winner) {
      setOpenAlertDialog(true);
    } else {
      onReMatch();
    }
  };

  const handleCloseAlertDialog = (answer: boolean) => {
    setOpenAlertDialog(false);
    if (answer) {
      onReMatch();
    }
    return;
  };

  const handleClickOpenDeleteDialog = () => {
    if (
      isGameboardEmpty(gameboard) &&
      gameStatus.P1.record.win === 0 &&
      gameStatus.P2.record.win === 0
    ) {
      deleteMatchRecord();
    } else {
      setOpenDeleteDialog(true);
    }
  };

  const handleCloseDeleteDialog = (answer: boolean) => {
    setOpenDeleteDialog(false);
    if (answer) {
      deleteMatchRecord();
    }
    return;
  };

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
    onReMatch();
    gameStatus.P1.record.win = 0;
    gameStatus.P2.record.win = 0;
  };

  return (
    <div className="w-full">
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
                  <div id="player-name-edit" key={p.name}>
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
            <IconButton onClick={handleClickOpenAlertDialog}>
              <ChangeCircleOutlinedIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <Dialog
            open={openAlertDialog}
            onClose={handleCloseAlertDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"⚠️Game will be Reset⚠️"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                If you proceed, current game will be reset.
                <br />
                Are you sure you want to proceed?
                <br />
                (Record will not be deleted)
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleCloseAlertDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleCloseAlertDialog(true)} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div>
          <Tooltip title="Delete Match Record" placement="top">
            <IconButton onClick={handleClickOpenDeleteDialog}>
              <DeleteOutlineOutlinedIcon fontSize="large" />
            </IconButton>
          </Tooltip>

          <Dialog
            open={openDeleteDialog}
            onClose={handleCloseDeleteDialog}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
          >
            <DialogTitle id="delete-dialog-title">
              {"🚨All Game Record will be Reset🚨"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="delete-dialog-description">
                If you proceed, your game record will be reset.
                <br />
                Are you sure you want to proceed????
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleCloseDeleteDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleCloseDeleteDialog(true)} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>

      {openHowTo && (
        <div id="how-to-play-dialog" className="fadeInUp">
          <div id="how-to-play-dialog-title">⭐️How to Play⭐️</div>
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
