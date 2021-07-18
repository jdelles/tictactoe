const gameboard = (() => {
    const board = [9];  
    const boardButtons = Array.from(document.querySelectorAll(".board"));
    let i = 0; 
    boardButtons.forEach(button => {
        button.setAttribute("data-id", i);
        // button.addEventListener("click", play()); 
        i++; 
    }); 

    let turn = 0; 
    const getBoard = () => board; 
    const getTurn = () => turn; 
    const play = (index) => {
        if (board[index].isEmpty()) {
            board[index] = getCurrentPlayer(); 
            turn++; 
            if (turn > 5) {
                isWinner(); 
            }
        } else {
            alert("This space is already taken. Choose another."); 
        }
    }
    const getCurrentPlayer = () => {
        if (turn % 2 === 0) {
            return intializeGame.player1.getToken(); 
        } else {
            return intializeGame.player2.getToken(); 
        }
    }
    return {getBoard, getTurn, play, boardButtons}; 
})(); 

const gameController = (() => {
    
})(); 

const Player = (name, token) => {
    let score = 0; 
    const getName = () => name; 
    const getToken = () => token; 
    const getScore = () => score; 
    const incrementScore = () => score++; 
    return {getName, getToken, getScore, incrementScore}; 
}

const intializeGame = (() => {
    const player1name = prompt("Enter player 1's name:"); 
    const player1 = Player(player1name, "X"); 
    const player2name = prompt("Enter player 2 name:"); 
    const player2 = Player(player2name, "O"); 

    return {player1, player2}; 
})(); 
