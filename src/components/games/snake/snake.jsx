import { useState, useEffect, useCallback } from 'react';
import './snake.css';

const gridSize = 15;
const initialSnake = [[2, 0], [1, 0], [0, 0]];
const initialDirection = { x: 1, y: 0 }; // Moving right initially

function App() {
  const [snake, setSnake] = useState(initialSnake);
  const [direction, setDirection] = useState(initialDirection);
  const [food, setFood] = useState(getRandomFoodPosition);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  

  const changeDirection = useCallback((e) => {
    const { key } = e;
    const dir = direction;
    switch (key) {
        case 'ArrowUp': if (dir.y === 0) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (dir.y === 0) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (dir.x === 0) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (dir.x === 0) setDirection({ x: 1, y: 0 }); break;
        default: break;
      }
    }, [direction]);

    useEffect(() => {
        window.addEventListener('keydown', changeDirection);
        if (!isGameOver) {
        const moveInterval = setInterval(moveSnake, 200);
        return () => clearInterval(moveInterval);
        }
        return () => {
        window.removeEventListener('keydown', changeDirection);
        };
    }, [changeDirection, isGameOver, moveSnake]); 

  function moveSnake() {
    setSnake(prevSnake => {
        
      let newHead = [(prevSnake[0][0] + direction.y + gridSize) % gridSize, (prevSnake[0][1] + direction.x + gridSize) % gridSize];

      // Check for self-collision
      if (prevSnake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])) {
        setIsGameOver(true);
        return prevSnake; // Early return to keep the snake in its last valid state
      }

      const newSnake = [newHead, ...prevSnake];
      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        
        console.log(food[0] + newHead[0] + newHead[1] + food[1])
        
        setScore((prevScore) => prevScore + 1);
        setFood(getRandomFoodPosition());
        console.log(food[0] + newHead[0] + newHead[1] + food[1])
        return newSnake;
      }
      newSnake.pop();
      return newSnake;
    });
  }

  function getRandomFoodPosition() {
    let newPosition;
    do {
      newPosition = [Math.floor(Math.random() * gridSize), Math.floor(Math.random() * gridSize)];
    } while (snake.some(segment => segment[0] === newPosition[0] && segment[1] === newPosition[1]));
    return newPosition;
  }
  
  

  if (isGameOver) {
    return <div className="game-over">Game Over! Refresh to play again.</div>;
  }

  return (
    <div className="game-area">
      {Array.from({ length: gridSize }, (_, rowIndex) => (
        <div key={rowIndex} className="row">
          {Array.from({ length: gridSize }, (_, colIndex) => {
            const isSnake = snake.some(segment => segment[0] === rowIndex && segment[1] === colIndex);
            const isFood = food[0] === rowIndex && food[1] === colIndex;
            return <div key={colIndex} className={`cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`}></div>;
          })}
          <div style={{ position: 'absolute', top: '220px', left: '10px', color: 'black' }}>
        Score: {score}
      </div>
        </div>
      ))}
      
    </div>
  );
}

export default App;
