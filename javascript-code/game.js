import { GameState } from "./game-state.js";

let score = {
X: 1,
O: -1,
Tie: 0
}

function fillCell(move) {
    let symbol;
    if (GameState.xTurn) {
        symbol = "X";
    }
    else {
        symbol = "O";
    }
    
    GameState.board[move.row][move.col] = `${symbol}`;
    GameState.xTurn = !GameState.xTurn;

    return symbol;
}

function aiMove() {
    // make sure board isnt full
    let hasSpace = false;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (GameState.board[i][j] == "") {
                hasSpace = true;
            }
        }
    }
    if (!hasSpace) {
        return null;
    }

    let chanceForMistake;
    if (GameState.difficulty === "Easy") {
        chanceForMistake = 0.4;
    }
    else if (GameState.difficulty === "Medium") {
        chanceForMistake = 0.1;
    }
    else if (GameState.difficulty === "Hard") {
        chanceForMistake = 0.05;
    }

    let easyMove = Math.random();
    let move;
    if (easyMove < chanceForMistake) {
        let availableSpots = [];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (GameState.board[i][j] == "") {
                    availableSpots.push({i, j});
                }
            }
        }

        let moveIndex = randomInt(0, availableSpots.length);
        move = {row: availableSpots[moveIndex].i, col: availableSpots[moveIndex].j}
    }
    else {
        //check for imediate win
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (GameState.board[i][j] == "") {
                        GameState.board[i][j] = "O";
                        
                        if (checkWin() === "O") {
                            GameState.board[i][j] = "";
                            move = {row: i, col: j};
                            
                            return move;
                        }
                        GameState.board[i][j] = "";
                    }
                }
            }

        //run minimax
        let bestScore = Infinity;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (GameState.board[i][j] == "") {
                    GameState.board[i][j] = "O";
                    let score = minimax(true);
                    GameState.board[i][j] = "";

                    if (score < bestScore) {
                        bestScore = score;
                        move = {row: i, col: j};
                    }
                }
            }
        }
    }

    return move;
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
                if (GameState.board[i][j] == "") {
                    GameState.board[i][j] = "X";

                    let score = minimax(false);
                    bestScore = Math.max(bestScore, score);

                    GameState.board[i][j] = "";
                }
            }
        }
    }

    else {
        bestScore = Infinity;

        // going through all possible board moves
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (GameState.board[i][j] == "") {
                    GameState.board[i][j] = "O";

                    let score = minimax(true);
                    bestScore = Math.min(bestScore, score);

                    GameState.board[i][j] = "";
                }
            }
        }
    }

    return bestScore;
}

function checkWin() {
    // horizontal
    for (let i = 0; i < 3; i++) {
        if (equals3(GameState.board[i][0], GameState.board[i][1], GameState.board[i][2])) {
            return GameState.board[i][0];
        }
    }

    //vertical
    for (let i = 0; i < 3; i++) {
        if (equals3(GameState.board[0][i], GameState.board[1][i], GameState.board[2][i])) {
            return GameState.board[0][i];
        }
    }

    //cross
    if (equals3(GameState.board[0][0], GameState.board[1][1], GameState.board[2][2])) {
        return GameState.board[0][0];
    }
    if (equals3(GameState.board[0][2], GameState.board[1][1], GameState.board[2][0])) {
        return GameState.board[0][2];
    }

    //check for tie
    let emptyCells = false;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (GameState.board[i][j] == "") {
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

export {fillCell, aiMove, checkWin};