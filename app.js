/**
 * Builds the game board 
 */
const gameboard = (() => {
    const board = [9];  
    const boardButtons = Array.from(document.querySelectorAll(".board"));
    let i = 0; 
    boardButtons.forEach(button => {
        button.setAttribute("data-id", i);
        i++; 
    }); 
    return {board, boardButtons}; 
})(); 

/**
 * Controls the game play through each turn and checks for the winner
 */
const gameController = (() => {
    const play = (index) => {
        if (gameboard.board[index].isEmpty()) {
            const token = getCurrentPlayer(); 
            gameboard.board[index] = token; 
            gameboard.boardButtons[index].textContent = token; 
            turn++; 
            if (turn > 5) {
                isWinner(); 
            }
        } else {
            alert("This space is already taken. Choose another."); 
        }
    }
    const getCurrentPlayer = () => {
        if (gameboard.turn % 2 === 0) {
            return setupPlayers.player1.getToken(); 
        } else {
            return setupPlayers.player2.getToken(); 
        }
    }
    const isWinner = () => {

    }
    return {play}; 
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