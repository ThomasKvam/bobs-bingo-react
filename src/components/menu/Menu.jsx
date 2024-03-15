import { Link } from 'react-router-dom'
import './menu.css'
function Menu(){
    return(
        <div className="menu">
           <Link to={'/'}><h2>Games</h2> </Link>
            <h2>Leaderboard</h2>
        </div>
    )
}

export default Menu