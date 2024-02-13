const Game = {
  gameboard: ["", "", "", "", "", "", "", "", ""],
  players: {
    player1: "",
    player2: "",
  },
  turns: 0,
};
const gameboard = document.getElementById("gameboard");
const submitPlayers = document.getElementById("playersForm");

submitPlayers.addEventListener("submit", (e) => {
  e.preventDefault();
  const player1 = document.getElementById("player1");
  const player2 = document.getElementById("player2");
  if (player1.value && player2.value) {
    gameboard.style.display = "grid";
  } else {
    // Error
    console.log("Dåligt");
  }
});

function renderGameboard() {
  gameboard.textContent = "";
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
  if (!this.textContent) {
    const indexPlacement = this.id.substring(5, 6);
    let symbol;

    Game.turns % 2 == 0 ? (symbol = "X") : (symbol = "O");

    Game.gameboard[indexPlacement] = symbol;
    Game.turns++;
    if (
      Game.gameboard[0] == Game.gameboard[3] &&
      Game.gameboard[3] == Game.gameboard[6]
    ) {
    }
    if (checkWin(Game.gameboard)) {
      console.log("VINNARE");
    }
    renderGameboard();
  }
}

function checkWin(gameboard) {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Horizontal lines
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Vertical lines
    [0, 4, 8],
    [2, 4, 6], // Diagonal lines
  ];

  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (
      gameboard[a] &&
      gameboard[a] === gameboard[b] &&
      gameboard[a] === gameboard[c]
    ) {
      return true; // We found a winning combination
    }
  }
  return false; // No winning combination found
}
