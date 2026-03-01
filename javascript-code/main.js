import { fillCell, aiMove, checkWin } from "./game.js";
import { displayPlacement, displayGameOver, resetUI } from "./UI.js";
import { GameState } from "./game-state.js";

const cells = document.querySelectorAll('.cell');
const refreshButton = document.querySelector('.refresh-button');

refreshButton.addEventListener("click", start);
cells.forEach(cell => {
    cell.addEventListener("click", gameLoop);
})

window.onload = start;

function gameLoop(e) {
    let cell = e.currentTarget;
    if (cell.classList.contains("X") || cell.classList.contains("O")) {
        return;
    }
    if (GameState.gameType === "Singleplayer" && GameState.xTurn === false) {
        return;
    }

    const col = Number(cell.dataset.col);
    const row = Number(cell.dataset.row);

    let move = {row: row, col: col};

    let symbol = fillCell(move);
    displayPlacement(move, symbol);

    let result = checkWin();
    if (result !== null) {
        displayGameOver(result);
        GameState.gameOver = true;
    }

    if (GameState.gameType === "Singleplayer") {
        if (!GameState.gameOver) {
            setTimeout(() => {
                let move = aiMove();
                symbol = fillCell(move);
                displayPlacement(move, symbol);
                
                let result = checkWin();
                if (result !== null) {
                    displayGameOver(result);
                    GameState.gameOver = true;
                }
            }, Math.random() * 1000);
        }
    }
}

function start() {
    GameState.reset();
    resetUI();

    cells.forEach(cell => {
        cell.classList.remove("X", "O");
        cell.textContent = "";
    })
}