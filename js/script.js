const Game = {
  gameboard: ["", "", "", "", "", "", "", "", ""],
  players: {
    player1: "",
    player2: "",
  },
  results: {
    player1: 0,
    tie: 0,
    player2: 0,
  },
  turns: 0,
};
const gameboard = document.getElementById("gameboard");
const submitPlayers = document.getElementById("playersForm");
const playersForm = document.getElementById("players");
const gameInfo = document.getElementById("gameInfo");
const gameStats = document.getElementById("gameStats");
const playerTurn = document.getElementById("playerTurn");
const restartGame = document.getElementById("restartGame");
restartGame.addEventListener("click", resetGame);

let finishedGame = false;
// gameStats,gameInfo,gameboard
submitPlayers.addEventListener("submit", (e) => {
  e.preventDefault();
  const player1 = document.getElementById("player1");
  const player2 = document.getElementById("player2");
  const playerXInfo = document.getElementById("playerXInfo");
  const playerOInfo = document.getElementById("playerOInfo");
  if (player1.value && player2.value) {
    playersForm.style.display = "none";
    playerXInfo.textContent = `X (${player1.value})`;
    playerOInfo.textContent = `O (${player2.value})`;

    gameInfo.style.display = "grid";
    gameboard.style.display = "grid";
    gameStats.style.display = "grid";
    renderGameboard();
  } else {
    player1.value === "" ? (player1.style.borderColor = "red") : "";
    player2.value === "" ? (player2.style.borderColor = "red") : "";
  }
});

function renderGameboard() {
  gameboard.innerHTML = "";
  Game.gameboard.forEach((square, index) => {
    let squareElement = document.createElement("div");
    squareElement.textContent = square;
    squareElement.classList.add("gameboard__tile");
    squareElement.id = `tile_${index}`;
    squareElement.addEventListener("click", playSymbol);

    square === "X"
      ? squareElement.classList.add("gameboard__x")
      : squareElement.classList.add("gameboard__o");

    gameboard.appendChild(squareElement);
  });
}

function playSymbol() {
  if (!this.textContent && !finishedGame) {
    const indexPlacement = this.id.substring(5, 6);
    let symbol;
    let turnSymbol;
    Game.turns % 2 == 0 ? (symbol = "X") : (symbol = "O");
    Game.turns % 2 == 0 ? (turnSymbol = "O") : (turnSymbol = "X");
    document.getElementById("playerTurn").textContent = turnSymbol;
    playerTurn.textContent = turnSymbol;
    const isSymbolX = turnSymbol === "X";

    playerTurn.classList.toggle("symbols--x", isSymbolX);
    playerTurn.classList.toggle("symbols--o", !isSymbolX);

    Game.gameboard[indexPlacement] = symbol;
    Game.turns++;
    if (
      Game.gameboard[0] == Game.gameboard[3] &&
      Game.gameboard[3] == Game.gameboard[6]
    ) {
    }
    if (checkWin(Game.gameboard)) {
      console.log("VINNARE");
      console.log(symbol);
      registerWin(symbol);
    }
    if (checkTie()) {
      finishedGame = true;
      Game.results.tie++;
      tiesValue.textContent = Game.results.tie;
    }
    renderGameboard();
    console.log(Game);
  }
}
function checkTie() {
  let tie = true;
  Game.gameboard.forEach((result) => {
    result == "" ? (tie = false) : "";
  });
  return tie;
}
function checkWin(gameboard) {
  const winConditions = [
    [0, 1, 2], // Horizontal lines
    [3, 4, 5], // Horizontal lines
    [6, 7, 8], // Horizontal lines
    [0, 3, 6], // Vertical lines
    [1, 4, 7], // Vertical lines
    [2, 5, 8], // Vertical lines
    [0, 4, 8], // Diagonal lines
    [2, 4, 6], // Diagonal lines
  ];

  for (const [index, condition] of winConditions.entries()) {
    const [a, b, c] = condition;
    if (
      gameboard[a] &&
      gameboard[a] === gameboard[b] &&
      gameboard[a] === gameboard[c]
    ) {
      console.log(winConditions[index]);
      return true; // We found a winning combination
    }
  }
  return false; // No winning combination found
}

function registerWin(symbol) {
  const playerXValue = document.getElementById("playerXValue");
  const playerOValue = document.getElementById("playerOValue");
  finishedGame = true;
  symbol === "X" ? Game.results.player1++ : Game.results.player2++;
  playerXValue.textContent = Game.results.player1;
  playerOValue.textContent = Game.results.player2;
}

checkValue(player1);
checkValue(player2);
function checkValue(player) {
  player.addEventListener("keyup", () => {
    player.value === ""
      ? (player.style.borderColor = "red")
      : (player.style.borderColor = "transparent");
  });
}

function resetGame() {
  const tiesValue = document.getElementById("tiesValue");
  if (finishedGame) {
    Game.gameboard = ["", "", "", "", "", "", "", "", ""];
    finishedGame = false;
    renderGameboard();
  } else {
    console.log("Du är inte klar än");
    restartGame.animate(
      [
        // keyframes
        { transform: "rotate(6deg)" },
        { transform: "rotate(-6deg)" },
        { transform: "rotate(3deg)" },
        { transform: "rotate(-3deg)" },
        { transform: "rotate(0deg)" },
      ],
      {
        // timing options
        duration: 200,
        iterations: 1,
      }
    );
  }
}

renderGameboard();
