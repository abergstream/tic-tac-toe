// TODO
// Lägga in rätt färg på knappen i winBanner
// Styla winBanner
// Lägga till winBanner för TIED-GAME
// Se över resetknappen

// Sist av allt
// Se över responsivitet
// Se över js-koden

const gameboard = document.getElementById("gameboard");
const submitPlayers = document.getElementById("playersForm");
const playersForm = document.getElementById("players");
const gameInfo = document.getElementById("gameInfo");
const gameStats = document.getElementById("gameStats");
const playerTurn = document.getElementById("playerTurn");
const restartGame = document.getElementById("restartGame");
const tiesValue = document.getElementById("tiesValue");
const playerXValue = document.getElementById("playerXValue");
const playerOValue = document.getElementById("playerOValue");
const quitGame = document.getElementById("quitGame");
const nextRound = document.getElementById("document");
document.getElementById("quitGame").addEventListener("click", () => {
  winBanner.style.display = "none";
  gameInfo.style.display = "none";
  gameboard.style.display = "none";
  gameStats.style.display = "none";

  localStorage.removeItem("Game");
  winRow = "";
  finishedGame = false;
  Game = {
    gameboard: ["", "", "", "", "", "", "", "", ""],
    players: {
      playerX: "",
      playerO: "",
    },
    results: {
      playerX: 0,
      tie: 0,
      playerO: 0,
    },
    turns: 0,
  };

  playersForm.style.display = "grid";
});
document.getElementById("nextRound").addEventListener("click", () => {
  winBanner.style.display = "none";
  Game.gameboard = ["", "", "", "", "", "", "", "", ""];
  finishedGame = false;
  renderGameboard();
});

let winRow = "";
restartGame.addEventListener("click", resetGame);
let finishedGame = false;
let Game;
// localStorage.removeItem("Game");
const checkGame = localStorage.getItem("Game");

if (checkGame) {
  Game = JSON.parse(checkGame);
  Game.gameboard = ["", "", "", "", "", "", "", "", ""];
  gameInfo.style.display = "grid";
  gameboard.style.display = "grid";
  gameStats.style.display = "grid";
  printGameInfo();
} else {
  Game = {
    gameboard: ["", "", "", "", "", "", "", "", ""],
    players: {
      playerX: "",
      playerO: "",
    },
    results: {
      playerX: 0,
      tie: 0,
      playerO: 0,
    },
    turns: 0,
  };
  playersForm.style.display = "grid";
}

// gameStats,gameInfo,gameboard
submitPlayers.addEventListener("submit", (e) => {
  e.preventDefault();
  printGameInfo();
});

// Funktion som kollar skriver ut namn och resultat enligt ovan ^---
//  men kollar om det finns info i localstorage och isåfall tar den infon

function printGameInfo() {
  const playerX = document.getElementById("playerX");
  const playerO = document.getElementById("playerO");
  const playerXInfo = document.getElementById("playerXInfo");
  const playerOInfo = document.getElementById("playerOInfo");
  let playerXName;
  let playerOName;
  console.log("Första steget");
  if (checkGame) {
    console.log("Det finns spel");
    playerXName = Game.players.playerX;
    playerOName = Game.players.playerO;
    playerXValue.textContent = Game.results.playerX;
    tiesValue.textContent = Game.results.tie;
    playerOValue.textContent = Game.results.playerO;
  } else {
    console.log("INGET spel");
    playerXName = playerX.value;
    playerOName = playerO.value;
  }

  if (playerXName && playerOName) {
    console.log("NAMN FINNS");
    playersForm.style.display = "none";
    playerXInfo.textContent = `X (${playerXName})`;
    playerOInfo.textContent = `O (${playerOName})`;

    Game.players.playerX = playerXName;
    Game.players.playerO = playerOName;

    gameInfo.style.display = "grid";
    gameboard.style.display = "grid";
    gameStats.style.display = "grid";
    renderGameboard();
  } else {
    playerX.value === "" ? (playerX.style.borderColor = "red") : "";
    playerO.value === "" ? (playerO.style.borderColor = "red") : "";
  }
}

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
  // Checks if game is over
  if (finishedGame) {
    // Checks if there was a winner
    if (winRow) {
      console.log(winRow);
      // Change background for the winning row
      winRow.forEach((tileNumber) => {
        const tileDiv = document.getElementById(`tile_${tileNumber}`);
        let color;
        Game.turns % 2 == 0
          ? (color = "var(--o-color)")
          : (color = "var(--x-color)");
        tileDiv.style.backgroundColor = color;
        tileDiv.style.color = "#24353f";
      });
    }
  }
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
    if (checkWin()) {
      registerWin(symbol);
      const winBanner = document.getElementById("winBanner");
      const winnerSymbol = document.getElementById("winnerSymbol");
      winnerSymbol.textContent = symbol;
      winBanner.style.display = "flex";
    }
    if (checkTie()) {
      finishedGame = true;
      Game.results.tie++;
      tiesValue.textContent = Game.results.tie;
    }
    localStorage.setItem("Game", JSON.stringify(Game));
    renderGameboard();
  }
}
function checkTie() {
  let tie = true;
  Game.gameboard.forEach((result) => {
    result == "" ? (tie = false) : "";
  });
  return tie;
}
function checkWin() {
  const gameboard = Game.gameboard;
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
      winRow = winConditions[index];
      return true; // We found a winning combination
    }
  }
  winRow = "";
  return false; // No winning combination found
}

function registerWin(symbol) {
  finishedGame = true;
  symbol === "X" ? Game.results.playerX++ : Game.results.playerO++;
  playerXValue.textContent = Game.results.playerX;
  playerOValue.textContent = Game.results.playerO;
}

checkValue(playerX);
checkValue(playerO);
function checkValue(player) {
  player.addEventListener("keyup", () => {
    player.value === ""
      ? (player.style.borderColor = "red")
      : (player.style.borderColor = "transparent");
  });
}

function resetGame() {
  if (finishedGame) {
    Game.gameboard = ["", "", "", "", "", "", "", "", ""];
    finishedGame = false;
    renderGameboard();
  } else {
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
