import  { useState, useContext, useEffect } from 'react';
import {AppContext} from '../../../App.jsx'
import axios from 'axios';
const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT = { "🐬": 10, "🐠": 7, "🐟": 9, "🦐": 30 };
const SYMBOL_VALUES = { "🐬": 100, "🐠": 10, "🐟": 8, "🦐": 4 };

function SlotMachine() {
    const [score, setScore] = useState();
    const [lines, setLines] = useState(1);
    const [bet, setBet] = useState(0);
    const [reels, setReels] = useState([]);
    const { loggedInUser } = useContext(AppContext);

    const getScore = async (userId) =>{
        const currentScoreResponse = await axios.get(`http://localhost:4000/leaderboard/${userId}`, {
          headers: {
            
            Authorization: `Bearer ${loggedInUser.token}`,
          },
          
        });
        setScore(currentScoreResponse.data.data.score)
        console.log("currentscore: " + currentScoreResponse.data.data.score)
        

    }
     // Starting score instead of deposit
    const updateScore = async (userId, newScore) => {

      try {
        const response = await axios.put(`http://localhost:4000/leaderboard/${userId}`, {
          score: newScore, 
        }, {
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${loggedInUser.token}`,
          },
        });
    
        console.log('Update successful:', response.data);
        
        
      } catch (error) {
        console.error('Error updating score:', error);
       
       
      }
    };
    useEffect(() => {
        getScore(loggedInUser.id)
    },[])
    
    const spin = () => {
        const symbols = [];
        Object.entries(SYMBOLS_COUNT).forEach(([symbol, count]) => {
            symbols.push(...Array(count).fill(symbol));
        });

        const newReels = [];
        for (let i = 0; i < COLS; i++) {
            const reelSymbols = [...symbols];
            newReels.push([]);
            for (let j = 0; j < ROWS; j++) {
                const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                newReels[i].push(reelSymbols[randomIndex]);
                reelSymbols.splice(randomIndex, 1);
            }
        }

        const rows = transpose(newReels);
        setReels(newReels);

        const winnings = getWinnings(rows, bet, lines);
        setScore((prevScore) => prevScore - (bet * lines) + winnings);
        updateScore(loggedInUser.id, score - (bet * lines) + winnings)
    };

    const transpose = (reels) => {
        return reels[0].map((_, colIndex) => reels.map(row => row[colIndex]));
    };

    const getWinnings = (rows, bet, lines) => {
        let winnings = 0;
        rows.slice(0, lines).forEach(row => {
            if (new Set(row).size === 1) { // All symbols in the row are the same
                winnings += bet * SYMBOL_VALUES[row[0]];
            }
        });
        return winnings;
    };

    return (
        <div className="slot-machine">
            <h2>Slot Machine Game</h2>
            <div className="score">Score: ${score}</div>
            <div className="lines">
                <button onClick={() => setLines(1)}>1 Line</button>
                <button onClick={() => setLines(2)}>2 Lines</button>
                <button onClick={() => setLines(3)}>3 Lines</button>
            </div>
            <div className="bet">
                Bet: <input type="number" value={bet} onChange={(e) => setBet(Number(e.target.value))} />
            </div>
            <button onClick={spin}>Spin</button>
            {reels.length > 0 && (
                <div className="reels">
                    {transpose(reels).map((row, rowIndex) => (
                        <div key={rowIndex}>
                            {row.join(' | ')}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SlotMachine;
