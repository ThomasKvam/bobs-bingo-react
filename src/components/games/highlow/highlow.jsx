import { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AppContext } from "../../../App";
import './highlow.css'

function HigherLower() {
  const [deckId, setDeckId] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [nextCard, setNextCard] = useState(null);
  const [score, setScore] = useState(0);
  const [remaining, setRemaining] = useState();
  const [isGameOver, setIsGameOver] = useState(false)

  const { loggedInUser } = useContext(AppContext)

  const resetGame = useCallback(() => {
    setScore(0);
    setIsGameOver(false);
  }, []);

  console.log(score);

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
    initializeDeck();
  }, []);

  const initializeDeck = async () => {
    try {
      const response = await axios.get(
        "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      setDeckId(response.data.deck_id);
      setScore(0);
    } catch (error) {
      console.error("Error initializing deck:", error);
    }
  };

  const drawCard = async () => {
    try {
      const response = await axios.get(
        `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      const drawnCard = response.data.cards[0];
      setCurrentCard(nextCard);
      setNextCard(drawnCard);
      setRemaining(response.data.remaining)
      console.log("iasdkas",response.data.remaining)
      if (response.data.remaining === 0) {
        setIsGameOver(true)
      }
      
    } catch (error) {
      console.error("Error drawing card:", error);
    }
  };

  if(isGameOver){
    updateScore(loggedInUser.id, score)
  }

  //Have to convert some of the values to number becuase in the API it uses string on
  const convertRankToValue = (rank) => {
    switch (rank) {
      case "ACE":
        return 14;
      case "KING":
        return 13;
      case "QUEEN":
        return 12;
      case "JACK":
        return 11;
      case "0":
        return 10;
      default:
        return parseInt(rank);
    }
  };

  const handleHigherGuess = () => {
    if (nextCard && currentCard) {
      const currentRank = convertRankToValue(currentCard.value);
      const nextRank = convertRankToValue(nextCard.value);

      if (nextRank > currentRank) {
        const guessedScore = calculateScore(currentRank, nextRank);
        setScore(score + guessedScore);
        console.log("Correct guess! Next card is higher.");
      } else {
        const guessedScore = calculateScore(currentRank, nextRank);
        setScore(score + guessedScore);
        console.log("Incorrect guess! Next card is not higher.");
      }
    } else {
      console.log("Cards not yet drawn");
    }
    drawCard();
  };

  const handleLowerGuess = () => {
    if (nextCard && currentCard) {
      const currentRank = convertRankToValue(currentCard.value);
      const nextRank = convertRankToValue(nextCard.value);

      if (nextRank < currentRank) {
        const guessedScore = calculateScore(nextRank, currentRank);
        setScore(score + guessedScore);
        console.log("Correct guess! Next card is lower.");
      } else {
        const guessedScore = calculateScore(nextRank, currentRank);
        setScore(score + guessedScore);
        console.log("Incorrect guess! Next card is not lower.");
      }
    } else {
      console.log("Cards not yet drawn");
    }
    drawCard();
  };

  const calculateScore = (currentRank, nextRank) => {
    const rankDifference = Number(nextRank - currentRank);
    return Math.max(rankDifference);
  };

  return (
    <div className="highlow-container">
      <h1>Higher or Lower Card Game</h1>
      <p>Score: {score}</p>
      <button
        onClick={() => {
          initializeDeck();
          drawCard();
        }}
      >
        Start Game
      </button>
      {currentCard && nextCard && (
        <div className="card-container">
          <div className="card">
            Current Card: <img src={currentCard.image} alt="current card" />
          </div>
          <div className="card">
            Next Card:{" "}
            <img
              src="https://www.deckofcardsapi.com/static/img/back.png"
              alt="next card"
            />
          </div>
          <div>Remaining cards: {remaining}</div>
          <button onClick={handleHigherGuess}>Higher</button>
          <button onClick={handleLowerGuess}>Lower</button>
        </div>
      )}
    </div>
  );
}

export default HigherLower;
