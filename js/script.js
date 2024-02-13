const Game = {
  gameboard: ["", "", "X", "", "O", "", "", "", ""],
  players: {
    player1: "Andreas",
    player2: "Dylan",
  },
  turns: 0,
};
const gamebord = document.getElementById("gameboard");
Game.gameboard.forEach((brick) => {
  const brickElement = document.createElement("div");
  brickElement.innerText = brick;
  if (brick == "X") {
    brickElement.classList.add("gameboard__x");
  } else {
    brickElement.classList.add("gameboard__o");
  }
  brickElement.classList.add("gameboard__brick");
  gamebord.append(brickElement);
});
