import { Link } from 'react-router-dom'
import './dashboard.css'
function Dashboard(){
    return (
        <div className="dashboard">
            
            <div>Blackjack</div>
            <div>Slots</div>
            
            <Link to={'/flappy'}>Flappy Bird</Link>
        </div>
    )
}

export default Dashboard