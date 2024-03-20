import { Link, useNavigate } from 'react-router-dom'
import './header.css'
function Header(){
    
    function handleOnClick(){
        localStorage.setItem("loggedInUser", null)
        window.location.reload()
    }

    return(
        <div className="header"> 
            <Link to={'/'}>
                <div className='logo'>
                    <img src="src\assets\chip.png"/>
                    <h1>Bob's Bingo</h1>
                </div>
            </Link>
            <div className='profile'>
                <Link to={`/profile`}><h1>Profile</h1> </Link>
                <button onClick={handleOnClick}>Log out</button>
            </div>
        </div>
    )
}
export default Header