import { createContext, useState} from "react";

import './App.css'
import Header from './components/header/Header'
import Menu from './components/menu/Menu'
import { Routes, Route, useLocation } from 'react-router-dom'
import FlappyBird from './components/games/flappybird/FlappyBird'
import Dashboard from './components/dashboard/Dashboard'
import Leaderboard from './components/leaderboard/Leaderboard'
import LogIn from './components/login/index'
import SignUp from './components/login/signup'
import Snake from './components/games/snake/snake'
import Profile from "./components/profile/Profile";


const AppContext = createContext();

function App() {
  
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState([])
  const location = useLocation()

  return (
    <>
      {loggedInUser !== null && <> 
        {(location.pathname=== '/' || location.pathname==='/profile') && <Header />}
        <Menu/>
      </> }

      <AppContext.Provider value={{loggedInUser, setLoggedInUser, users, setUsers}}>

        <Routes>
          {!loggedInUser ? (
            <Route path="/" element={<LogIn />} />
          ) : (
            <Route path="/" element={<Dashboard />} />
          )}

          <Route path='/signup'
            element={<SignUp/>}/>

          <Route path='/dracodash' 
            element={<FlappyBird/>}/>

          <Route path='/snake'
            element={<Snake />} />

          <Route path='/leaderboard' 
            element={<Leaderboard/>}/>
          
          <Route path="/profile"
            element={<Profile />} />

        </Routes>
      </AppContext.Provider>
    </>
  );
}

export { App, AppContext };
