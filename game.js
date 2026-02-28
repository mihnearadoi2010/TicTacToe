let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

let score = {
X: 1,
O: -1,
Tie: 0
}

let gameOver = false;
let xTurn = true;

let difficulty = localStorage.getItem("difficulty") || "Medium";
let gameType = localStorage.getItem("gameType") || "Singleplayer";

function fillCellMultiplayer(row, col) {
    if (xTurn) {
        board[row][col] = "X";
    }
    else {
        board[row][col] = "O";
    }

    triggerGameOver();
    xTurn = !xTurn;
}