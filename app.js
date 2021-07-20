/**
 * Builds the game board 
 */
const gameboard = (() => {
    const board = [];  
    for (let i = 0; i < 9; i++) {
        board.push(""); 
    } 
    return {board}; 
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
    let turn = 0; 
    const getCurrentPlayer = () => {
        if (turn % 2 === 0) {
            return setupPlayers.player1; 
        } else {
            return setupPlayers.player2; 
        }
    }
    const isWinner = () => {

    }
    return {turn, getCurrentPlayer, isWinner}
})(); 



const boardButtons = Array.from(document.querySelectorAll(".board"));
let i = 0; 
boardButtons.forEach(button => {
    button.setAttribute("data-id", i);
    button.addEventListener('click', () => {
        if (button.textContent === "X" || button.textContent === "O") {
            alert("This space is already taken. Choose another."); 
        } else {
            const playToken = gameController.getCurrentPlayer().token; 
            button.textContent = playToken; 
            gameController.turn++; 
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