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
        console.log(turn + " " + Players.getCurrentPlayer(turn).name); 
        gameController.isWinner()
        incrementTurn(); 
        console.log(turn + " " + Players.getCurrentPlayer(turn).name); 
    }

    const newGame = () => {
        for (let i = 0; i < 9; i++) {
            const button = document.querySelector(`.board[data-id="${i}"]`); 
            button.textContent = ""; 
            board[i] = undefined; 
        }
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
    console.log(player1.name); 

    const player2name = prompt("Enter player 2 name:"); 
    const player2 = Player(player2name, "O", 0); 
    console.log(player2.name); 

    const getCurrentPlayer = (turn) => {
        if (turn % 2 === 0) {
            return player1; 
        } else {
            return player2; 
        }

    }
    
    return {getCurrentPlayer}; 
})(); 

/**
 * Controls the game play through each turn and checks for the winner
 */
const gameController = (() => {

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
            displayWinner(); 
            return true; 
        } else {
            isTie(gameboard.getTurn() + 1); 
        }
    }

    const isTie = (turn) => {
        if (turn >= 9) {
            displayTie(); 
            return true; 
        } else {
            return false; 
        }
    }

    const displayWinner = () => {
        const results = document.getElementById('results-text'); 
        results.textContent = Players.getCurrentPlayer(gameboard.getTurn()).name + " wins!"; 
    }

    const displayTie = () =>  {
        const results = document.getElementById('results-text'); 
        results.textContent = "It's a tie!"; 
    }

    const addListeners = () => {
        const boardButtons = Array.from(document.querySelectorAll(".board"));
        let id = 0; 
        boardButtons.forEach(button => {
            button.setAttribute("data-id", id);
            button.addEventListener('click', () => {
                if (isWinner() || isTie(gameboard.getTurn())) {
                    alert("Game over!"); 
                } else if (button.textContent === "X" || button.textContent === "O") {
                        alert("This space is already taken. Choose another."); 
                } else {
                    const playToken = Players.getCurrentPlayer(gameboard.getTurn()).token; 
                    gameboard.setPosition(button.getAttribute("data-id"), playToken);  
                }
            }); 
            id++; 
        });
        const resetButton = document.getElementById('reset'); 
        resetButton.addEventListener('click', () => {
            const results = document.getElementById('results-text'); 
            results.textContent = ""; 
            gameboard.newGame(); 
        });
    }
    addListeners(); 
    return {isWinner, isTie}
})(); 