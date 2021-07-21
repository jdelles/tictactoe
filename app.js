/**
 * Builds the game board and provides functionality to set the player token
 * on the board. 
 */
const gameboard = (() => {
    let board = new Array(9);  
    let turn = 0; 

    const getPosition = (index) => board[index]; 

    const setPosition = (index, token) => {
        const button = document.querySelector(`.board[data-id="${index}"]`); 
        button.textContent = token; 
        board[index] = token; 
        console.log(board[index]); 
        incrementTurn(); 
    }

    const newGame = () => {
        const buttons = document.querySelectorAll('.board'); 
        buttons.forEach(button => {
            button.textContent = ""; 
        });
        turn = 0; 
    }

    const incrementTurn = () => turn++; 

    const getTurn = () => turn; 

    return {setPosition, getPosition, incrementTurn, getTurn, newGame}; 
})(); 



/**
 * Sets up the two players
 * Currently uses JavaScript prompt() would like to eventually use a form
 */
const Players = (() => {

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
            return Players.player1; 
        } else {
            return Players.player2; 
        }

    }
    const isWinner = () => {
        //  0 1 2
        //  3 4 5
        //  6 7 8
        if ((gameboard.getPosition(0) === gameboard.getPosition(1) && gameboard.getPosition(0) === gameboard.getPosition(2) && gameboard.getPosition(0) != undefined) ||
            (gameboard.getPosition(0) === gameboard.getPosition(3) && gameboard.getPosition(0) === gameboard.getPosition(6) && gameboard.getPosition(0) != undefined) ||
            (gameboard.getPosition(0) === gameboard.getPosition(4) && gameboard.getPosition(0) === gameboard.getPosition(8) && gameboard.getPosition(4) != undefined) ||
            (gameboard.getPosition(1) === gameboard.getPosition(4) && gameboard.getPosition(1) === gameboard.getPosition(7) && gameboard.getPosition(4) != undefined) ||
            (gameboard.getPosition(2) === gameboard.getPosition(4) && gameboard.getPosition(2) === gameboard.getPosition(6) && gameboard.getPosition(4) != undefined) ||
            (gameboard.getPosition(3) === gameboard.getPosition(4) && gameboard.getPosition(3) === gameboard.getPosition(5) && gameboard.getPosition(4) != undefined) ||
            (gameboard.getPosition(2) === gameboard.getPosition(5) && gameboard.getPosition(2) === gameboard.getPosition(8) && gameboard.getPosition(8) != undefined) ||
            (gameboard.getPosition(6) === gameboard.getPosition(7) && gameboard.getPosition(6) === gameboard.getPosition(8) && gameboard.getPosition(8) != undefined)) {
                return true; 
            } else {
                return false; 
            }
    }

    const isTie = (turn) => {
        if (!isWinner && turn >= 8) {
            return true; 
        } else {
            return false; 
        }
    }

    const addListeners = () => {
        const boardButtons = Array.from(document.querySelectorAll(".board"));
        let id = 0; 
        boardButtons.forEach(button => {
            button.setAttribute("data-id", id);
            button.addEventListener('click', () => {
                if (button.textContent === "X" || button.textContent === "O") {
                    alert("This space is already taken. Choose another."); 
                } else {
                    const playToken = gameController.getCurrentPlayer(gameboard.getTurn()).token; 
                    gameboard.setPosition(button.getAttribute("data-id"), playToken);  
                    if (gameController.isWinner()) {
                        console.log(playToken + " wins!"); 
                    } else if (isTie(gameboard.getTurn())) {
                        console.log("It's a tie!"); 
                    }
                }
            }); 
            id++; 
        });
    }
    addListeners(); 
    return {getCurrentPlayer, isWinner}
})(); 




/**
 * Essentials /////////////////
 * 
 * DONE - Draw a board
 * DONE - Build functionality for user to interact with board
 * DONE - Store the X or O 
 * DONE - Check for win conditions / tie
 * Report back win conditions if met and end game
 * Report back tie if game ends with no win condition
 * Reset game
 * 
 * Additional //////////////////
 * Switch from Prompt to form - Store users name and use it in win reporting and keep track of games won
 * Build "AI" to play game randomly
 * Build smarter AI with min-max algorithm to never lose
 * Add score to keep track of how many games each player has won
 */