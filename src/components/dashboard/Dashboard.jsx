
import { Link } from "react-router-dom";
import "./dashboard.css";
import { useContext, useEffect } from "react";
import { AppContext } from "../../App";


function Dashboard() {
  const { loggedInUser, setLoggedInUser } = useContext(AppContext);

  useEffect(() => {
    console.log("bruker:" + loggedInUser.username);
  });

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



    return (
        <div className="dashboard">
            
            <div className='dashboard-div'>
                <div className='app-container'>
                    <img src='src\assets\blackjack.png'/>
                    <p>Blackjack</p>
                </div>
            </div>

            <div className='dashboard-div'>
                <Link to={'/snake'}>
                <div className='app-container'>
                    <img src='src\assets\snake-icon.png'></img>
                    <p>Snake</p>
                </div>
                </Link>

            </div>

            <div className='dashboard-div'>
                <Link to={'/dracodash'}>
                <div className='app-container'>
                    <img src='src\assets\dragon-game-icon.png'/>
                    <p>Draco Dash</p>
                </div>
                </Link>
            </div>
            
        </div>
    )

}

export default Dashboard;
