class GameState {
    static gameType = localStorage.getItem("gameType") || "Singleplayer";
    static difficulty = localStorage.getItem("difficulty") || "Medium";

    static gameOver = false;
    static xTurn = true;

    static board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    static reset() {
        this.gameOver = false;
        this.xTurn = true;

        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
    }
}

export {GameState};