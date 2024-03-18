import { useContext, useState } from "react"
import { AppContext } from "../../App"
import { Link } from "react-router-dom"
import './login.css'

const initialUser = {
    username: '',
    password: ''
}

function LogIn(){
    const { loggedInUser,setLoggedInUser } = useContext(AppContext)
    const [user, setUser] = useState(initialUser)
    
    function loggIn(event){
        event.preventDefault();
        setLoggedInUser(user)   
        console.log(loggedInUser)
    }

    function handleOnChange(event){
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }

    
    return(
        <div className="login-container">
            <h3>Sign in</h3>
           <form className="login-form" onSubmit={loggIn}>
            <div>
                <div><label htmlFor="username">Username: </label></div>
                <input type="text" 
                    id="username" 
                    name="username" 
                    onChange={handleOnChange}
                    value={user.username}/>
            </div>
            <div>
                <div><label htmlFor="password">Password: </label></div>
                <input type="password" 
                    id="password" 
                    name="password" 
                    onChange={handleOnChange}
                    value={user.password}/>
            </div>
            <div>
                <button type="submit">Log in</button>
            </div>
           </form>

           <p>Don't have a user?</p>
           <Link to={'/signup'}>Sign up</Link>
        </div>
    )
}

export default LogIn