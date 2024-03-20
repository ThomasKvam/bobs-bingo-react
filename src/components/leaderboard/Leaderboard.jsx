import { useContext } from "react";
import { AppContext } from "../../App";
import './leaderboard.css'
import { useNavigate } from "react-router";


function Leaderboard() {

  const { leaderboardData, loggedInUser } = useContext(AppContext);
  const navigate = useNavigate()
  console.log(leaderboardData);
  const sortedLeaderboardData = [...leaderboardData].sort((a, b) => b.score - a.score);
 
  function goBack(){
    navigate('/')
  }

  return (
    <div>
      {loggedInUser ? (
        <div className="leaderboard-container">
        <h2>Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData && sortedLeaderboardData.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.user.username}</td>
                <td>{entry.score}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
        <div className="leaderboard-container"> 
          <p>Error loading leaderboard...</p>
          <button onClick={goBack}>Go back</button>
        </div>
        </>
      )}
    </div>
  );
}

export default Leaderboard;
