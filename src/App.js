import {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import Board from "./Board";
import './App.css';

function App() {
    const emoji = ["🦀", "🐙", "🍉", "🍇", "🦋", "🛳"]
    const [board, setBoard] = useState(Array(12).fill({})
        .map(el => ({
            id: uuidv4(),
            picture: null,
            isOpen: false,
        })))
    const [history, setHistory] = useState([]);
    const [isBlocked, setIsBlocked] = useState(false);
    const [results, setResults] = useState([])

    const fillBoard = () => {
        const boardCopy = board.map(el => {
            el.picture = null;
            el.isOpen = false;
            return el;
        });
        for (let i = 0; i < 2; i++) {
            for (const pic of emoji) {
                let randomInd;
                do {
                    randomInd = Math.floor(Math.random() * 12);
                } while (boardCopy[randomInd].picture)
                boardCopy[randomInd].picture = pic;
            }
        }
        setBoard(boardCopy);
    }

    const openCard = (id, image) => {
        setIsBlocked(true)
        setHistory([...history, image])

        const copyBoard = board.map(el =>
            el.id === id ? {...el, isOpen: true} : el
        )
        setBoard(copyBoard)
    }

    const checkCard = () => {
        const copyBoard = board.map(el =>
            el.picture === history[history.length - 1] || el.picture === history[history.length - 2]
                ? {...el, isOpen: false}
                : el
        )
        setBoard(copyBoard);
        setIsBlocked(false);
    }

    const restart = () => {
        fillBoard();
        setResults([...results, history.length/2])
        setHistory([]);
        setIsBlocked(false);
    }

    const finish = () => {
        const rest = board.filter(el => !el.isOpen)
        if (!rest.length) {
            return (
                <div>
                    <h2>{`Congrats you won in ${Math.floor(history.length / 2)} moves`}</h2>

                    <button onClick={restart}>Restart</button>
                </div>
            )
        }
    }

    useEffect(() => {
        fillBoard();
    }, []);

    useEffect(() => {
        if (!(history.length % 2)) {
            if (history[history.length - 1] !== history[history.length - 2]) {
                setTimeout(() => {
                    checkCard();
                }, 700);
            } else {
                setIsBlocked(false)
            }
        } else setIsBlocked(false)
    }, [history])

    console.log(history)
    return (
        <div className="App">
            <h1>Memory game</h1>
            <Board
                board={board}
                openCard={openCard}
                isBlocked={isBlocked}
            />
            {results.length && <p>Game results: {results.join(', ')}</p>}
            {finish()}
        </div>
    );
}

export default App;
