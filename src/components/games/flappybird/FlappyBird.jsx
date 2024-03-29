
import { useState, useEffect, useRef, useContext } from 'react';
import Bird from './Bird';
import Pipe from './Pipe';
import backgroundImage from '../../../assets/background.jpg'
import {AppContext} from '../../../App.jsx'
import axios from 'axios';

const Game = () => {
  const screenHeight = 410;
  const screenWidth = 800;
  const birdSize = 30;
  const pipeWidth = 60;
  const [birdPosition, setBirdPosition] = useState(screenHeight / 2);
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const gravity = 2;
  const jump = 50;
  const pipeSpeed = 5;
  const lastPipeTimeRef = useRef(Date.now()); // Use ref to track the last time a pipe was generated
  const { loggedInUser } = useContext(AppContext);

  const resetGame = () => {
    setBirdPosition(screenHeight / 2);
    setPipes([]);
    setScore(0);
    lastPipeTimeRef.current = Date.now();
  };

  const updateScore = async (userId, newScore) => {

    const currentScoreResponse = await axios.get(`http://localhost:4000/leaderboard/${userId}`, {
      headers: {
        
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    });
    console.log("score: "+ newScore)
    const currentScore = currentScoreResponse.data.data.score;
    console.log("current: "+ currentScore)

    
    const totalNewScore = currentScore + newScore;
    console.log("totalnew: " + totalNewScore)
  try {
    const response = await axios.put(`http://localhost:4000/leaderboard/${userId}`, {
      score: totalNewScore, 
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
    const handleKeyDown = (event) => {
      if (event.keyCode === 32) { // Space bar
        setBirdPosition((prevPosition) => Math.max(prevPosition - jump, 0)); // Make the bird move
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const gameLoop = setInterval(() => {
      setBirdPosition(prevPosition => Math.min(prevPosition + gravity, screenHeight - birdSize));

      // Move existing pipes and remove off-screen ones
      setPipes(prevPipes => prevPipes.map(pipe => ({ ...pipe, left: pipe.left - pipeSpeed })).filter(pipe => pipe.left + pipeWidth > 0));

      // Generate new pipes 
      const now = Date.now();
      if (now - lastPipeTimeRef.current > 3000) { //seconds between new pipes
        lastPipeTimeRef.current = now; 
      
        const pipeGap = 110; // gap between the top and bottom pipes
      
        // Calculate bottom pipe top position
        const bottomPipeTopPosition = Math.random() * (screenHeight - pipeGap) / 2 + screenHeight / 4;
      
        // Calculate top pipe height based on random factor
        const topHeight = Math.random() * (screenHeight / 2 - pipeGap) + 50; // Ensure the top pipe is of variable height but leaves room for the gap
        // Corrected top pipe top position calculation
        const topPipeTopPosition = bottomPipeTopPosition - pipeGap - topHeight; 
      
        setPipes(prevPipes => [
          ...prevPipes,
          // Corrected the top property for the top pipe
          { top: topPipeTopPosition, left: screenWidth, height: topHeight, type: 'top' },
          // Bottom pipe remains the same
          { top: bottomPipeTopPosition, left: screenWidth, height: screenHeight - bottomPipeTopPosition, type: 'bottom' }
        ]);
      }
      
      // Collision detection and scoring
      pipes.forEach(pipe => {
        if (!pipe.passed && pipe.left < 50) {
          setScore((prevScore) => prevScore + 1);
          pipe.passed = true;
        }
      
        // Determine if the current pipe is a top or bottom pipe based on its type
        let collisionDetected = false;
        if (pipe.type === 'top') {
          // For top pipes, check if the bird is hitting the pipe's bottom edge
          if (birdPosition < pipe.top + pipe.height && pipe.left < 80 && pipe.left + pipeWidth > 50) {
            collisionDetected = true;
          }
        } else {
          // For bottom pipes, check if the bird is above the bottom of the pipe
          if (birdPosition + 30 > pipe.top && pipe.left < 80 && pipe.left + pipeWidth > 50) {
            collisionDetected = true;
          }
        }
      
        if (collisionDetected) {
          alert('Game Over! Score: ' + score);
          updateScore(loggedInUser.id, score)
          resetGame()
          //window.location.reload(); // Restart the game
        }
      });
      
    }, 24); // Run game loop every 24 milliseconds

    return () => {
      clearInterval(gameLoop);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [birdPosition]); 

  return (
    <div className='flappy-container'>
      <div className='gamearea' style={{ position: 'relative', width: `100%`, 
        height: `${screenHeight}px`, overflow: 'hidden', backgroundImage:`url(${backgroundImage})`,
        border: `2px solid black`, borderRadius:`8px` }}>
      <Bird top={birdPosition} />
      {pipes.map((pipe, index) => (
        <Pipe key={index} top={pipe.top} left={pipe.left} height={pipe.height} />
      ))}
      <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'black' }}>
        Score: {score}
      </div>
    </div>
    </div>
  );
};

export default Game;
