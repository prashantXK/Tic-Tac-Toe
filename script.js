const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-Info");
const newGameBtn = document.querySelector(".btn");
let currentPlayer;
let gameGrid;
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//function to initialise the game

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    //intialize boxes with css properties again
    box.classList = `box box${index + 1}`;
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

//function to check gameover

function checkGameOver() {
  let winner = "";

  winningPositions.forEach((position) => {
    //all 3 values hsould be non empty or should be same
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      //check if winner is X
      if (gameGrid[position[0]] === "X") winner = "X";
      else winner = "O";

      //disable pointer events
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      boxes[position[0]].classList.add("win");

      boxes[position[1]].classList.add("win");

      boxes[position[2]].classList.add("win");
    }
  });

  if (winner !== "") {
    gameInfo.innerText = `Winner Player - ${winner}`;
    newGameBtn.classList.add("active");
    return;
  }

  //when there is no winner. Game Tied

  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") fillCount++;
  });

  //board is filled game tied
  if (fillCount === 9) {
    gameInfo.innerText = "Game Tied !";
    newGameBtn.classList.add("active");
  }
}

//function to handle user clicks

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer; //make changes in ui

    gameGrid[index] = currentPlayer; //inner logic grid
    boxes[index].style.pointerEvents = "none";
    //swap turn
    swapTurn();
    checkGameOver();
  }
}

//function to swapturn

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  //UI update
  gameInfo.innerText = `Current Player -  ${currentPlayer}`;
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", initGame);
