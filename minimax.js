function minimax(board, checkWin, scoreMap, isMaximizer) {
    const result = checkWin();
    if (result !== null) {
        return scoreMap[result];
    }

    let bestScore;
    if (isMaximizer) {
        bestScore = -Infinity;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == "") {
                    board[i][j] = "X";

                    const evaluation = minimax(board, checkWin, scoreMap, false);
                    bestScore = Math.max(bestScore, evaluation);

                    board[i][j] = "";
                }
            }
        }
    }
    else {
        bestScore = Infinity;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == "") {
                    board[i][j] = "O";

                    const evaluation = minimax(board, checkWin, scoreMap, true);
                    bestScore = Math.min(bestScore, evaluation);

                    board[i][j] = "";
                }
            }
        }
    }

    return bestScore;
}
