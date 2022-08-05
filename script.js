const tiles = Array.from(document.querySelectorAll(".tile"));
const displayPlayer = document.querySelector(".display-player");
const resetBtn = document.querySelector("#reset");
const show = document.querySelector(".show");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOn = true;

const playerXWon = "Player X Won";
const playerOWon = "Player O Won";
const tie = "there is a tie: play again";

const winningParameter = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [2, 4, 6],
  [0, 4, 8],
];

const handleResult = () => {
  let winningRound = false;
  for (i = 0; i <= 7; i++) {
    const win = winningParameter[i];
    const a = board[win[0]];
    const b = board[win[1]];
    const c = board[win[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      winningRound = true;
      break;
    }
    console.log(a, b, c);
  }

  if (winningRound) {
    winner(currentPlayer === "X" ? playerXWon : playerOWon);
    gameOn = false;
    return;
  }

  if (!board.includes("")) winner(tie);
};
handleResult();

const winner = (type) => {
  switch (type) {
    case playerOWon:
      show.innerText = "Player O has Won this round";
      break;
    case playerXWon:
      show.innerHTML = "Player X has Won this round";
      break;
    case tie:
      show.innerText = "Tie";
  }
  show.classList.remove("hide");
};

const validate = (tile) => {
  if (tile.innerText === "X" || tile.innerText === "O") {
    return false;
  }
  return true;
};

function updateBoard(index) {
  board[index] = currentPlayer;
}

const changePlayer = () => {
  displayPlayer.classList.remove(`Player${currentPlayer}`);
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  displayPlayer.innerText = currentPlayer;
  displayPlayer.classList.add(`Player${currentPlayer}`);
};

function userAction(tile, index) {
  if (validate(tile) && gameOn) {
    tile.innerHTML = currentPlayer;
    tile.classList.add(`Player${currentPlayer}`);
    updateBoard(index);
    handleResult();
    changePlayer();
  }
}

const resetBoard = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  gameOn = true;
  show.classList.add("hide");

  if (currentPlayer === "O") {
    changePlayer();
  }

  tiles.forEach((tile) => {
    tile.innerText = "";
    tile.classList.remove("playerX");
    tile.classList.remove("playerO");
  });
};
tiles.forEach((tile, index) => {
  tile.addEventListener("click", () => userAction(tile, index));

  resetBtn.addEventListener("click", resetBoard);
});
