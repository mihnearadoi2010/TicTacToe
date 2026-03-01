import { GameState } from "./game-state.js";

const xLabel = document.querySelector('.x-turn');
const oLabel = document.querySelector('.o-turn');

const gameOverScreen = document.querySelector('.game-over');
const endMessage = document.querySelector('.end-message');

const settingsScreen = document.querySelector('.settings');
const settingsButton = document.querySelector('#setting-wheel');

const difficultyMenu = document.querySelector('.difficulty-menu');
const difficultyButton = document.querySelector('.difficulty-settings');
const difficulties = document.querySelectorAll('.difficulty');
const difficultyDisplay = document.querySelector('.difficulty-display');

const multiplayerMenu = document.querySelector('.multiplayer-menu');
const multiplayerButton = document.querySelector('.multiplayer-settings');
const playerNumberButtons = document.querySelectorAll('.players');
const multiplayerDisplay = document.querySelector('.multiplayer-display');

const backArrows = document.querySelectorAll('.back');

let isSettingOpen = false;

//adding event listeners
settingsButton.addEventListener("click", openSettings);
multiplayerButton.addEventListener("click", openMultiplayerSettings);
difficultyButton.addEventListener("click", openDifficultySettings);

playerNumberButtons.forEach(button => {
    button.addEventListener("click", (e) => setPlayerNumber(e));
});

difficulties.forEach(difficultyLevel => {
    difficultyLevel.addEventListener("click", (e) => setDifficulty(e));
});

backArrows.forEach(arrow => {
    arrow.addEventListener("click", returnToMainSettings);
});

//settings
function openSettings() {
    difficultyMenu.style.display = "none";
    multiplayerMenu.style.display = "none";
    
    if (isSettingOpen) {
        settingsScreen.style.display = "none";

        if (GameState.gameOver) {
            gameOverScreen.style.display = "flex";
        }
    }
    else {
        settingsScreen.style.display = "flex";
        difficultyButton.style.display = "flex";
        multiplayerButton.style.display = "flex";

        if (GameState.gameOver) {
            gameOverScreen.style.display = "none";
        }
    }

    isSettingOpen = !isSettingOpen
}

function openDifficultySettings() {
    if (GameState.gameType !== "Singleplayer") {
        window.alert("This feature is only avalable for choosing the bot's difficulty in singleplayer");
        return;
    }

    difficultyButton.style.display = "none";
    multiplayerButton.style.display = "none";

    difficultyMenu.style.display = "flex";
}

function openMultiplayerSettings() {
    difficultyButton.style.display = "none";
    multiplayerButton.style.display = "none";

    multiplayerMenu.style.display = "flex";
}

function returnToMainSettings() {
    difficultyMenu.style.display = "none";
    multiplayerMenu.style.display = "none";

    settingsScreen.style.display = "flex";
    difficultyButton.style.display = "flex";
    multiplayerButton.style.display = "flex";
}

function setPlayerNumber(e) {
    let playerNumber = e.currentTarget;
    GameState.gameType = playerNumber.dataset.players;

    localStorage.setItem("gameType", GameState.gameType);

    multiplayerDisplay.innerHTML = `Players: ${GameState.gameType}`;

    if (GameState.gameType === "Multiplayer") {
        difficultyDisplay.style.display = "none";
    }
    else {
        difficultyDisplay.style.display = "flex";
    }
}

function setDifficulty(e) {
    let level = e.currentTarget;
    GameState.difficulty = level.dataset.difficulty;

    localStorage.setItem("difficulty", GameState.difficulty);

    difficultyDisplay.innerHTML = `Difficulty: ${GameState.difficulty}`;
}

//ingame UI
function displayPlacement(move, symbol) {
    const cell = document.querySelector(`.cell[data-row="${move.row}"][data-col="${move.col}"]`);
    
    cell.textContent = `${symbol}`;
    cell.classList.add(`${symbol}`);

    if (symbol === "X") {
        settingsButton.style.display = "none";

        oLabel.style.backgroundColor = "rgb(212, 162, 11)";
        xLabel.style.backgroundColor = "transparent";
    }
    else {
        xLabel.style.backgroundColor = "rgb(27, 121, 198)";
        oLabel.style.backgroundColor = "transparent";
    }
}

function displayGameOver(result) {
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

    settingsButton.style.display = "block";
    gameOverScreen.style.display = "flex";
}

function resetUI() {
    multiplayerDisplay.innerHTML = `Players: ${GameState.gameType}`;
    difficultyDisplay.innerHTML = `Difficulty: ${GameState.difficulty}`;
    if (GameState.gameType == "Singleplayer") {
        difficultyDisplay.style.display = "flex";
    }

    gameOverScreen.style.display = "none";
    settingsScreen.style.display = "none";
    isSettingOpen = false;

    xLabel.removeAttribute("style");
    oLabel.removeAttribute("style");
}

export {displayPlacement, displayGameOver, resetUI};