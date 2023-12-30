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
// import TextField from "@mui/material/TextField";
import { useState } from "react";
import monkey from "../../img/vector-monkey.png";
import platypus from "../../img/vector-platypus.png";

const Menu = function () {
  const [openRule, setOpenRule] = useState(false);
  const [openEditPlayerName, setOpenEditPlayerName] = useState(false);

  const handleClickOpenRule = () => {
    setOpenRule(true);
  };

  const handleCloseRule = () => {
    setOpenRule(false);
  };

  const handleClickOpenEditPlayerName = () => {
    setOpenEditPlayerName(true);
  };

  const handleCloseEditPlayerName = () => {
    setOpenEditPlayerName(false);
  };

  // const handlePlayer1NameChange = (event) => {
  //   const newP1Name = event.target.value;
  //   setPlayerName([newP1Name, playerName[1]]);
  // };

  // const handlePlayer2NameChange = (event) => {
  //   const newP2Name = event.target.value;
  //   setPlayerName([playerName[0], newP2Name]);
  // };

  // const savePlayerName = () => {
  //   P1.name = playerName[0];
  //   P2.name = playerName[1];
  //   handleCloseEditPlayerName();
  // };

  // const deleteMatchRecord = function () {
  //   reMatch();
  //   setScoreKeep([0, 0]);
  // };

  // const canChangePlayerTurn = function () {
  //   const updatedGameboard = [...gameboard];
  //   for (let i = 0; i < 3; i++) {
  //     for (let j = 0; j < 3; j++) {
  //       if (isCellEmpty(updatedGameboard[i][j])) {
  //         //noop
  //       } else {
  //         if (!winnerPlayer) {
  //           return false;
  //         }
  //       }
  //     }
  //   }
  //   return true;
  // };

  // const changePlayerTurn = function () {
  //   if (!canChangePlayerTurn()) {
  //     return;
  //   }

  //   reMatch();
  //   if (currentPlayer === P1) {
  //     setCurrentPlayer(P2);
  //   } else {
  //     setCurrentPlayer(P1);
  //   }
  // };

  return (
    <div id="option-menu">
      <div>
        <Tooltip title="How to Play" placement="top">
          <IconButton onClick={handleClickOpenRule}>
            <HelpOutlineOutlinedIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <Dialog
          open={openRule}
          onClose={handleCloseRule}
          aria-labelledby="How to Play the Platypus vs Monkey Game"
          aria-describedby="It's a very fun game!"
        >
          <DialogTitle id="how-to-play-dialog-title">
            {"⭐️How to Play⭐️"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="how-to-play-dialog-description">
              1. The game starts with an empty 3x3 grid. <br />
              2. Player has 6 Platypuses or 6 Monkeys. There are 2 small pieces,
              2 medium pieces, and 2 large pieces for each player. <br />
              3. Player place one of their pieces to the gameboard cell in turn.{" "}
              <br />
              4. Just like the Tic Tac Toe, the game ends when one player lines
              up three cells in a row with their character, either horizontally,
              vertically or diagonally. <br />
              5. The big difference from Tic Tac Toe is that the player can
              either put their piece from their hand OR move the piece which is
              already on the gameboard. <br />
              6. Even if there is already another piece on the cell, regardless
              of whether it belongs to you or your opponent, if the piece is
              smaller, you can place your piece over it. <br />
              7. Player cannot move the piece if it's underneath of another
              bigger piece. <br />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <IconButton onClick={handleCloseRule}>Close</IconButton>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Tooltip title="Change Player Name" placement="top">
          <IconButton onClick={handleClickOpenEditPlayerName}>
            <ModeEditOutlineOutlinedIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <Dialog open={openEditPlayerName} onClose={handleCloseEditPlayerName}>
          <DialogTitle>Edit Player Name</DialogTitle>
          <DialogContent>
            <DialogContentText>Please input player's name.</DialogContentText>
            <div className="player1-name-edit">
              <img id="icon-platypus" src={platypus} alt="platypus"></img>
              {/* <TextField
                autoFocus
                margin="dense"
                id="p1-name"
                label="Player1 Name"
                defaultValue={P1.name}
                onChange={handlePlayer1NameChange}
                type="text"
                fullWidth
                variant="standard"
              /> */}
            </div>
            <div className="player2-name-edit">
              <img id="icon-monkey" src={monkey} alt="monkey"></img>
              {/* <TextField
                autoFocus
                margin="dense"
                id="p2-name"
                label="Player2 Name"
                defaultValue={P2.name}
                onChange={handlePlayer2NameChange}
                type="text"
                fullWidth
                variant="standard"
              /> */}
            </div>
          </DialogContent>
          {/* <DialogActions>
            <IconButton onClick={handleCloseEditPlayerName}>Cancel</IconButton>
            <IconButton onClick={savePlayerName}>Save</IconButton>
          </DialogActions> */}
        </Dialog>
      </div>
      <div>
        <Tooltip title="Change Player Turn" placement="top">
          {/* <IconButton
            onClick={changePlayerTurn}
            disabled={!canChangePlayerTurn()}
          > */}
          <ChangeCircleOutlinedIcon fontSize="large" />
          {/* </IconButton> */}
        </Tooltip>
      </div>

      <div>
        <Tooltip title="Delete Match Record" placement="top">
          {/* <IconButton onClick={deleteMatchRecord}> */}
          <DeleteOutlineOutlinedIcon fontSize="large" />
          {/* </IconButton> */}
        </Tooltip>
      </div>
    </div>
  );
};

export default Menu;
