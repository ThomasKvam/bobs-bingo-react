import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../App";

function Leaderboard() {

  const { leaderboardData } = useContext(AppContext);

  console.log(leaderboardData);
 

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
