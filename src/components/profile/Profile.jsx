import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../App"
import './profile.css'
import { useNavigate } from "react-router"

function Profile(){
    const {loggedInUser, users, leaderboardData} = useContext(AppContext)
    const [score, setScore] = useState(0)
    const [currentUser, setCurrentUser] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if(loggedInUser){
            setCurrentUser(users.data.find((user) => user.id === loggedInUser.id));
            const userScore = leaderboardData.find((data) => data.user.id === loggedInUser.id)
            setScore(userScore.score)
            console.log("score" + userScore.score)
        }else {
            setCurrentUser(null)
        }
    }, [score,users]);

    function goBack(){
        navigate('/')
    }

    return(
        <div className="profile-container">
            {currentUser ? (
                <div className="profile-details">
                <h1>{currentUser.username}</h1>
                <p>Total score: </p> <label>{score}</label>
                <h3>User Details: </h3>
                <div>
                    <p>First Name: <label>{currentUser.firstName}</label></p>
                    <p>Last Name: <label>{currentUser.lastName}</label></p>
                    <p>Email: <label>{currentUser.email}</label></p>
                </div>
            </div>
            ) : (
                <div>   
                    <p>Couldn't find user...</p>
                    <button onClick={goBack}>Go back</button>
                </div>
            )}
        </div>
        
    )
}

export default Profile