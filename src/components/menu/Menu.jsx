import { Link } from 'react-router-dom'
import './menu.css'
function Menu(){
    return(
        <div className="menu">
           <div className='menu-item'><Link to={'/'}><h2>Games</h2> </Link></div>
            <div className='menu-item'><Link to={'/leaderboard'}><h2>Leaderboard</h2></Link></div>
        </div>
    )
}

export default Menu