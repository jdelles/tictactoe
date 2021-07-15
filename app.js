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

const Player = (name) => {
    let score = 0; 
    const getName = () => name; 
    const getScore = () => score; 
    const incrementScore = () => score++; 
    return {getName, getScore, incrementScore}; 
}
