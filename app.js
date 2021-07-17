const gameboard = (() => {
    const board = [9];  
    let turn = 0; 
    const getBoard = () => board; 
    const getTurn = () => turn; 
    const play = (index, player) => {
        if (board[index].isEmpty()) {
            board[index] = player; 
            turn++; 
            if (turn > 5) {
                isWinner(); 
            }
        } else {
            alert("This space is already taken. Choose another."); 
        }
    }
    return {getBoard, getTurn, play}; 
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
    const player1name = alert("Enter player 1's name:"); 
    const player1 = Player(player1name, "X"); 
    const player2name = alert("Enter player 2 name:"); 
    const player2 = Player(player2name, "X"); 
    return {player1, player2}; 
})(); 
