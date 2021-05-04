import { useState } from 'react';
import Square from './Square';

let noWinner = true
export default function Board() {
    let [player, setPlayer] = useState('X')
    let [sqaures, setSquares] = useState(new Array(9).fill(''));
    let [gameStatus, setGameStatus] = useState('Click any square to begin');



    let clickHandler = (index) => {
        // console.log('clicked', index)
        if (noWinner) {
            let squrCopy = sqaures.slice()
            if (player === 'X') {
                if (squrCopy[index] === '') {
                    squrCopy[index] = 'X'
                    setPlayer(player = 'O')
                }
            }
            if (player === 'O') {
                if (squrCopy[index] === '') {
                    squrCopy[index] = 'O'
                    setPlayer(player = 'X')
                }
            }
            setSquares(squrCopy)

            switch (playerHasWon(squrCopy)) {
                case "X":
                    setGameStatus(gameStatus = "Player X has won");
                    noWinner = false
                    break;
                case "O":
                    setGameStatus(gameStatus = "Player O has won");
                    noWinner = false
                    break;
                default:
                    setGameStatus(gameStatus = "Game in Progress");
            }
        }
    }

    function playerHasWon(squares) {

        let board = [[], [], []]
        board[0] = [squares[0], squares[1], squares[2]]
        board[1] = [squares[3], squares[4], squares[5]]
        board[2] = [squares[6], squares[7], squares[8]]

        // console.log( board )
        //Check each row
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
                return board[i][0];
            }
        }

        //Check each column
        for (let j = 0; j < 3; j++) {
            if (board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[0][j] !== '') {
                return board[0][j];
            }
        }

        //Check the diagonals
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
            return board[0][0];
        }
        if (board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[2][0] !== '') {
            return board[2][0];
        }

        //Otherwise nobody has not won yet
        return '';

    }


    return (

        <div className='board'>
            <div className='Player'> Player: {player} </div>
            <div className='board-row'>
                <Square value={sqaures[0]} index={0} clickHandler={clickHandler} />
                <Square value={sqaures[1]} index={1} clickHandler={clickHandler} />
                <Square value={sqaures[2]} index={2} clickHandler={clickHandler} />
            </div>
            <div className='board-row'>
                <Square value={sqaures[3]} index={3} clickHandler={clickHandler} />
                <Square value={sqaures[4]} index={4} clickHandler={clickHandler} />
                <Square value={sqaures[5]} index={5} clickHandler={clickHandler} />
            </div>
            <div className='board-row'>
                <Square value={sqaures[6]} index={6} clickHandler={clickHandler} />
                <Square value={sqaures[7]} index={7} clickHandler={clickHandler} />
                <Square value={sqaures[8]} index={8} clickHandler={clickHandler} />
            </div>
            <div className='game-status'>{gameStatus}</div>

        </div>

    )
}