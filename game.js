// game loop variables
const cells = document.querySelectorAll('.box');
const xLabel = document.querySelector('.x-turn');
const oLabel = document.querySelector('.o-turn');

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

function gameLoopMultiplayer(e) {
    let cell = e.currentTarget;

    if (cell.classList.contains("X") || cell.classList.contains("O")) {
        return;
    }

    if (xTurn) {
        settingsButton.style.display = "none";
        cell.innerHTML = '<p class="clicked">X</p>';
        cell.classList.add("X");

        const col = Number(cell.dataset.col);
        const row = Number(cell.dataset.row);

        board[row][col] = "X";

        oLabel.style.backgroundColor = "rgb(212, 162, 11)";
        xLabel.style.backgroundColor = "transparent";
    }
    else {
        cell.innerHTML = '<p class="clicked">O</p>';
        cell.classList.add("O");

        const col = Number(cell.dataset.col);
        const row = Number(cell.dataset.row);

        board[row][col] = "O";

        xLabel.style.backgroundColor = "rgb(27, 121, 198)";
        oLabel.style.backgroundColor = "transparent";
    }

    triggerGameOver();
    xTurn = !xTurn;
}

function gameLoopBot(e) {
    let cell = e.currentTarget;

    if (cell.classList.contains("X") || cell.classList.contains("O")) {
        return;
    }

    if (xTurn) {
        settingsButton.style.display = "none";
        cell.innerHTML = '<p class="clicked">X</p>';
        cell.classList.add("X");

        const col = Number(cell.dataset.col);
        const row = Number(cell.dataset.row);

        board[row][col] = "X";

        oLabel.style.backgroundColor = "rgb(212, 162, 11)";
        xLabel.style.backgroundColor = "transparent";

        xTurn = false;
        triggerGameOver();

        if (checkWin() !== null) {
            setTimeout(aiMove ,Math.random() * 1000);
        }
    }

}

function aiMove() {
    // make sure board isnt full
    let hasSpace = false;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == "") {
                hasSpace = true;
            }
        }
    }
    if (!hasSpace) {
        return;
    }

    let chanceForMistake;
    if (difficulty === "Easy") {
        chanceForMistake = 0.4;
    }
    else if (difficulty === "Medium") {
        chanceForMistake = 0.1;
    }
    else if (difficulty === "Hard") {
        chanceForMistake = 0.05;
    }

    let easyMove = Math.random();
    let move;
    if (easyMove < chanceForMistake) {
        let avalableSpots = [];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == "") {
                    avalableSpots.push({i, j});
                }
            }
        }

        let moveIndex = randomInt(0, avalableSpots.length);
        move = {row: avalableSpots[moveIndex].i, col: avalableSpots[moveIndex].j}
    }
    else {
        let bestScore = Infinity;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == "") {
                    board[i][j] = "O";
                    let score = minimax(true);
                    board[i][j] = "";

                    if (score < bestScore) {
                        bestScore = score;
                        move = {row: i, col: j}; // create object shorthand
                    }
                }
            }
        }
    }

    

    board[move.row][move.col] = "O";

    const cell = document.querySelector(`.box[data-row="${move.row}"][data-col="${move.col}"]`)
    cell.innerHTML = '<p class="clicked">O</p>';
    cell.classList.add("O");

    xLabel.style.backgroundColor = "rgb(27, 121, 198)";
    oLabel.style.backgroundColor = "transparent";

    xTurn = true;
    triggerGameOver();
}

function minimax(isMaximizer) {
    let result = checkWin();
    if (result !== null) {
        return score[result];
    }

    let bestScore;
    if (isMaximizer) {
        bestScore = -Infinity;

        // going through all possible board moves
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == "") {
                    board[i][j] = "X";

                    let score = minimax(false);
                    bestScore = Math.max(bestScore, score);

                    board[i][j] = "";
                }
            }
        }
    }

    else {
        bestScore = Infinity;

        // going through all possible board moves
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == "") {
                    board[i][j] = "O";

                    let score = minimax(true);
                    bestScore = Math.min(bestScore, score);

                    board[i][j] = "";
                }
            }
        }
    }

    return bestScore;
}

function triggerGameOver() {
    let result = checkWin();
    if (result == null) {
        return;
    }

    if (result === "X") {
        endMessage.innerHTML = "X Wins!";
    }
    else if  (result === "O") {
        endMessage.innerHTML = "O Wins!";
    }
    else if (result === "Tie") {
        endMessage.innerHTML = "It's a tie!"
    }

    gameOver = true;
    settingsButton.style.display = "block";
    gameOverScreen.style.display = "flex";
}

function checkWin() {
    // horizontal
    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            return board[i][0];
        }
    }

    //vertical
    for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            return board[0][i];
        }
    }

    //cross
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        return board[0][0];
    }
    if (equals3(board[0][2], board[1][1], board[2][0])) {
        return board[0][2];
    }

    //check for tie
    let emptyCells = false;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == "") {
                emptyCells = true;
            }
        }
    }

    if (!emptyCells) {
        return "Tie";
    }

    return null;
}

function equals3(a, b, c) {
    if (a === b && b === c && a !== "") {
        return true;
    }

    return false;
}

function randomInt(min, max) {
    let numberIndex = Math.random() * (max - min) + min;
    let number = Math.floor(numberIndex);
    return number; 
}

export {gameLoopMultiplayer, gameLoopBot};