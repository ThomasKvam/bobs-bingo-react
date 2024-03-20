import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../App"
import './profile.css'

function Profile(){
    const {loggedInUser, users} = useContext(AppContext)
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        setCurrentUser(users.data.find((user) => user.id === loggedInUser.id));
    }, [users]);

    return(
        <div className="profile-container">
            <div className="profile-details">
            <h2>{currentUser.username}</h2>
            <h3>User Details: </h3>
            <div>
                <p>First Name: <label>{currentUser.firstName}</label></p>
                <p>Last Name: <label>{currentUser.lastName}</label></p>
                <p>Email: <label>{currentUser.email}</label></p>
            </div>
            </div>
        </div>
        
    )
}

export default Profile