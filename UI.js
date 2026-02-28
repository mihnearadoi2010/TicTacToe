const gameOverScreen = document.querySelector('.game-over');
const endMessage = document.querySelector('.end-message');
const refreshButton = document.querySelector('.refresh-button');

const settingsButton = document.querySelector('#setting-wheel');
const settingsScreen = document.querySelector('.settings');

const difficultyMenu = document.querySelector('.difficulty-menu');
const difficultyButton = document.querySelector('.difficulty-settings');
const difficulties = document.querySelectorAll('.difficulty');
const difficultyDisplay = document.querySelector('.difficulty-display');

const multiplayerButton = document.querySelector('.multiplayer-settings');
const multiplayerMenu = document.querySelector('.multiplayer-menu');
const playerNumberButtons = document.querySelectorAll('.players');
const multiplayerDisplay = document.querySelector('.multiplayer-display');


const backArrows = document.querySelectorAll('.back');

let difficulty = localStorage.getItem("difficulty") || "Medium";
let gameType = localStorage.getItem("gameType") || "Singleplayer";

let isSettingOpen = false;

refreshButton.addEventListener("click", restartGame);
settingsButton.addEventListener("click", openSettings);

multiplayerButton.addEventListener("click", openMultiplayerSettings);
difficultyButton.addEventListener("click", openDifficultySettings);

backArrows.forEach(arrow => {
    arrow.addEventListener("click", returnToMainSettings);
});

playerNumberButtons.forEach(button => {
    button.addEventListener("click", (e) => setPlayerNumber(e));
});

difficulties.forEach(difficultyLevel => {
    difficultyLevel.addEventListener("click", (e) => setDifficulty(e));
});

function restartGame() {
    window.location.reload();
}

function openSettings(gameOver) {
    difficultyMenu.style.display = "none";
    multiplayerMenu.style.display = "none";
    
    if (isSettingOpen) {
        settingsScreen.style.display = "none";

        if (gameOver) {
            gameOverScreen.style.display = "flex";
        }
    }
    else {
        settingsScreen.style.display = "flex";
        difficultyButton.style.display = "flex";
        multiplayerButton.style.display = "flex";

        if (gameOver) {
            gameOverScreen.style.display = "none";
        }
    }

    isSettingOpen = !isSettingOpen
}

function openDifficultySettings() {
    if (gameType !== "Singleplayer") {
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
    gameType = playerNumber.dataset.players;

    localStorage.setItem("gameType", gameType);

    multiplayerDisplay.innerHTML = `Players: ${gameType}`;

    setGameType();
}

function setDifficulty(e) {
    let level = e.currentTarget;
    difficulty = level.dataset.difficulty;

    localStorage.setItem("difficulty", difficulty);
    console.log(localStorage.getItem("difficulty"));

    difficultyDisplay.innerHTML = `Difficulty: ${difficulty}`;
}

function setGameType() {
    if (gameType === "Singleplayer") {
        cells.forEach(cell => {
            cell.removeEventListener("click", gameLoopBot);
            cell.removeEventListener("click", gameLoopMultiplayer);
        });

        cells.forEach(cell => {
            cell.addEventListener("click", gameLoopBot);
        });

        difficultyDisplay.style.display = "flex";
    }
    else {
        cells.forEach(cell => {
            cell.removeEventListener("click", gameLoopBot);
            cell.removeEventListener("click", gameLoopMultiplayer);
        });

        cells.forEach(cell => {
            cell.addEventListener("click", gameLoopMultiplayer);
        });

        difficultyDisplay.style.display = "none";
    }
}