"use strict";

let gameTrack = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let presentPlayer = "X";
let numberOfMoves = 0;
let isGameFinished = false;
document.getElementById("winner").style.display = "none";

const winnerStyles = (a, b, c, d, e, f) => {
  document.getElementById(`cell-${a}${b}`).style.backgroundColor = "#2b8a3e";
  document.getElementById(`cell-${c}${d}`).style.backgroundColor = "#2b8a3e";
  document.getElementById(`cell-${e}${f}`).style.backgroundColor = "#2b8a3e";
  document.getElementById(`cell-${a}${b}`).style.color = "#fff";
  document.getElementById(`cell-${c}${d}`).style.color = "#fff";
  document.getElementById(`cell-${e}${f}`).style.color = "#fff";
  document.getElementById("winner").style.display = "block";
  document.getElementById("current-player").textContent =
    "Game over! Restart game";
};

const checkGameWinner = () => {
  for (let i = 0; i < 3; i++) {
    if (
      gameTrack[i][0] === presentPlayer &&
      gameTrack[i][1] === presentPlayer &&
      gameTrack[i][2] === presentPlayer
    ) {
      isGameFinished = true;
      winnerStyles(i, 0, i, 1, i, 2);
      return true;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      gameTrack[0][i] === presentPlayer &&
      gameTrack[1][i] === presentPlayer &&
      gameTrack[2][i] === presentPlayer
    ) {
      isGameFinished = true;
      winnerStyles(0, i, 1, i, 2, i);
      return true;
    }
  }

  if (
    gameTrack[0][0] === presentPlayer &&
    gameTrack[1][1] === presentPlayer &&
    gameTrack[2][2] === presentPlayer
  ) {
    isGameFinished = true;
    winnerStyles(0, 0, 1, 1, 2, 2);
    return true;
  }

  if (
    gameTrack[0][2] === presentPlayer &&
    gameTrack[1][1] === presentPlayer &&
    gameTrack[2][0] === presentPlayer
  ) {
    isGameFinished = true;
    winnerStyles(0, 2, 1, 1, 2, 0);
    return true;
  }
};

const checkGameTie = () => {
  if (numberOfMoves === 9) {
    return true;
  }
  return false;
};

const gameRestart = () => {
  gameTrack = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  presentPlayer = "X";
  document.getElementById("current-player").textContent =
    "It is the turn of Player 'X'";
  document.getElementById("winner").textContent = "";
  document.getElementById("winner").style.display = "none";
  numberOfMoves = 0;
  isGameFinished = false;

  let cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
    cells[i].style.backgroundColor = "";
    cells[i].style.color = "";
  }
};

const playerMove = (cell) => {
  if (isGameFinished) {
    document.getElementById("current-player").textContent =
      "Game over! Restart game";
    return;
  }

  let row = +cell.id.split("-")[1].split("")[0];
  let column = +cell.id.split("-")[1].split("")[1];

  if (gameTrack[row][column] === "") {
    gameTrack[row][column] = presentPlayer;
    cell.textContent = presentPlayer;
    numberOfMoves += 1;

    if (checkGameWinner()) {
      document.getElementById(
        "winner"
      ).textContent = `Player '${presentPlayer}' won the game🎉🎉`;
      isGameFinished = true;
    } else if (checkGameTie()) {
      document.getElementById("winner").style.display = "block";
      document.getElementById("winner").textContent = `It's a tie🙂`;
      isGameOver = true;
    } else {
      if (presentPlayer === "X") {
        presentPlayer = "O";
      } else {
        presentPlayer = "X";
      }
      document.getElementById(
        "current-player"
      ).textContent = `It is the turn of Player '${presentPlayer}'!`;
    }
  }
};
