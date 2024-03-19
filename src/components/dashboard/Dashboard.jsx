import { Link } from "react-router-dom";
import "./dashboard.css";
import { useContext, useEffect } from "react";
import { AppContext } from "../../App";
function Dashboard() {
  const { loggedInUser } = useContext(AppContext);

  useEffect(() => {
    console.log("bruker:" + loggedInUser.token);
  });

  return (
    <div className="dashboard">
      <div>Blackjack</div>
      <div>Slots</div>

      <Link to={"/flappy"}>Flappy Bird</Link>
    </div>
  );
}

export default Dashboard;
