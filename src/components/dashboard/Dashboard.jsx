import { Link } from "react-router-dom";
import "./dashboard.css";
import { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import axios from "axios";

function Dashboard() {

  const { loggedInUser, setLoggedInUser, leaderboardData, setLeaderboardData, users, setUsers } =
    useContext(AppContext);

  console.log("table: ", leaderboardData);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/leaderboard", {
          headers: {
            Authorization: `Bearer ${loggedInUser.token}`,
          },
        });

        const fetchUpdatedLeaderboardData = async () => {
          try {
            const response = await axios.get(
              "http://localhost:4000/leaderboard",
              {
                headers: {
                  Authorization: `Bearer ${loggedInUser.token}`,
                },
              }
            );
            setLeaderboardData(response.data.data);
          } catch (error) {
            console.error("Error fetching updated leaderboard data:", error);
          }
        };
        const leaderboardDataFromResponse = response.data.data;
        setLeaderboardData(leaderboardDataFromResponse);

        //check if user already exist in the database. NOTE; have to write .data becuase every attribute is inside the object data{...}
        const userData = response.data.data.find(
          (data) => data.user.id === loggedInUser.id
        );
        if (!userData) {
          await axios.post(
            `http://localhost:4000/leaderboard/${loggedInUser.id}`,
            {
              score: 0,
            },
            {
              headers: {
                Authorization: `Bearer ${loggedInUser.token}`,
              },
            }
          );
          // get the new data
          fetchUpdatedLeaderboardData();
        } else {
          // User exists in the leaderboard, set the leaderboard data
          setLeaderboardData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);
  
  
  useEffect(() => {
    fetch(`http://localhost:4000/users`)
    .then(response => response.json())
    .then((data) => setUsers(data))
  }, [])

  // Retrieve user from local storage on component mount
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (localUser) {
      setLoggedInUser(localUser);
    }
  }, []);

  // Update local storage when loggedInUser changes
  useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  useEffect(() => {
    console.log("Bruker ID:" + loggedInUser.id);
    console.log(users)
  });

  return (
    <div className="dashboard">
      <div className="dashboard-div">
        <Link to={"/slots"}>
        <div className="app-container">
          <img src="src\assets\slots-icon.png" />
          <p>Slots</p>
        </div>
        </Link>
      </div>

      <div className="dashboard-div">
        <Link to={"/snake"}>
          <div className="app-container">
            <img src="src\assets\snake-icon.png"></img>
            <p>Snake</p>
          </div>
        </Link>
      </div>

      <div className="dashboard-div">
        <Link to={"/dracodash"}>
          <div className="app-container">
            <img src="src\assets\dragon-game-icon.png" />
            <p>Draco Dash</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
