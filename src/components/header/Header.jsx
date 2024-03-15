import './header.css'
function Header(){
    return(
        <div className="header"> 
            <div className='logo'>
                <img src="src\assets\chip.png"/>
                <h1>Bob's Bingo</h1>
            </div>
            <div className='profile'>
                <h1>Profile</h1>
            </div>
        </div>
    )
}
export default Header