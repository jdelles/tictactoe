/**
 * Builds the game board 
 */
const gameboard = (() => {
    const board = [];  
    for (let i = 0; i < 9; i++) {
        board.push(" "); 
    } 
    let turn = 0; 
    return {board, turn}; 
})(); 

/**
 * Player objects created with factory design pattern
 * @param {*} name the player's name
 * @param {*} token the player's game token
 * @param {*} score the player's score
 * @returns name, token and score
 */
 const Player = (name, token, score) => {
    return {name, token, score}
}

/**
 * Sets up the two players
 * Currently uses JavaScript prompt() would like to eventually use a form
 */
const setupPlayers = (() => {
    const player1name = prompt("Enter player 1's name:"); 
    const player1 = Player(player1name, "X", 0); 
    const player2name = prompt("Enter player 2 name:"); 
    const player2 = Player(player2name, "O", 0); 
    return {player1, player2}; 
})(); 

/**
 * Controls the game play through each turn and checks for the winner
 */
const gameController = (() => {
    const getCurrentPlayer = (turn) => {
        if (turn % 2 === 0) {
            return setupPlayers.player1; 
        } else {
            return setupPlayers.player2; 
        }

    }
    const isWinner = () => {
        const board = Array.from(document.querySelectorAll(".board"));
        let boardButtons = []; 
        for (let i = 0; i < 9; i++) {
            boardButtons.push(board[i].textContent); 
        }
        if ((boardButtons[0] === boardButtons[1] && boardButtons[0] === boardButtons[2] && boardButtons[0] != " ") ||
            (boardButtons[0] === boardButtons[3] && boardButtons[0] === boardButtons[6] && boardButtons[0] != " ") ||
            (boardButtons[0] === boardButtons[4] && boardButtons[0] === boardButtons[8] && boardButtons[4] != " ") ||
            (boardButtons[1] === boardButtons[5] && boardButtons[1] === boardButtons[7] && boardButtons[4] != " ") ||
            (boardButtons[2] === boardButtons[4] && boardButtons[2] === boardButtons[6] && boardButtons[4] != " ") ||
            (boardButtons[3] === boardButtons[4] && boardButtons[3] === boardButtons[5] && boardButtons[4] != " ") ||
            (boardButtons[2] === boardButtons[5] && boardButtons[2] === boardButtons[8] && boardButtons[8] != " ") ||
            (boardButtons[6] === boardButtons[7] && boardButtons[6] === boardButtons[8] && boardButtons[8] != " ")) {
                return true; 
            } else {
                return false; 
            }
    }
    return {getCurrentPlayer, isWinner}
})(); 



const boardButtons = Array.from(document.querySelectorAll(".board"));
let i = 0; 
boardButtons.forEach(button => {
    button.setAttribute("data-id", i);
    button.addEventListener('click', () => {
        if (button.textContent === "X" || button.textContent === "O") {
            alert("This space is already taken. Choose another."); 
        } else {
            const playToken = gameController.getCurrentPlayer(gameboard.turn).token; 
            button.textContent = playToken; 
            gameboard.board[i] = playToken; 
            gameboard.turn++; 
            if (gameboard.turn >= 5 && gameController.isWinner()) {
                console.log(playToken + " wins!"); 
            }
        }
    }); 
    i++; 
});

/**
 * Essentials /////////////////
 * 
 * Draw a board
 * Build functionality for user to interact with board
 * Store the X or O 
 * Check for win conditions / tie
 * Report back win conditions if met and end game
 * Report back tie if game ends with no win condition
 * Reset game
 * 
 * Additional //////////////////
 * Store users name and use it in win reporting and keep track of games won
 * Build "AI" to play game randomly
 * Build smarter AI with min-max algorithm to never lose
 */