import { useState } from "react"
import confetti from "canvas-confetti"
import { TURNS } from './constants.js'
import { checkWinner, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { Board } from './components/Board.jsx'
import { Player } from './components/Player.jsx'
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    if(boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  } 

  const updateBoard = (index) => {
    if(board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    });

    const newWinner = checkWinner(newBoard);
    if(newWinner) {
      confetti();
      setWinner(newWinner);
    } else if(checkEndGame(newBoard)) {
      setWinner(false);
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <Board results={board} updateBoard={updateBoard} />
      <Player turn={turn} /> 
      <WinnerModal winner={winner} resetGame={resetGame} /> 
    </main> 
  )
}

export default App
