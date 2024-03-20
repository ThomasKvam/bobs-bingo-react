import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../App";

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState(null);

  const context = useContext(AppContext);

  console.log(leaderboardData);
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        // Replace with your actual bearer token
        const response = await axios.get("http://localhost:4000/leaderboard", {
          headers: {
            Authorization: `Bearer ${context.loggedInUser.token}`,
          },
        });
        // Extract leaderboard data from the response
        const leaderboardDataFromResponse = response.data.data;
        setLeaderboardData(leaderboardDataFromResponse);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {leaderboardData &&
        leaderboardData.map((entry, index) => (
          <div key={index}>
            <h3>User Information</h3>
            <div>Username: {entry.user.username}</div>
            <div>First Name: {entry.user.firstName}</div>

            <div>
              <h3>Score</h3>
              <div>Score: {entry.score}</div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Leaderboard;
