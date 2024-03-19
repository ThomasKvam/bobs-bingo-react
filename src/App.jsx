import { createContext, useState} from "react";
import axios from "axios";


import './App.css'
import Header from './components/header/Header'
import Menu from './components/menu/Menu'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import FlappyBird from './components/games/flappybird/FlappyBird'
import Dashboard from './components/dashboard/Dashboard'
import Leaderboard from './components/leaderboard/Leaderboard'
import LogIn from './components/login/index'
import SignUp from './components/login/signup'
import Snake from './components/games/snake/snake'


const AppContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState(null)
  const location = useLocation()

  return (
    <>

      {location.pathname=== '/' && <Header />}
      <Menu/>

      <AppContext.Provider value={{loggedInUser, setLoggedInUser}}>

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

          <Route path='/leaderboard' element={

          <Leaderboard/>}/>

        </Routes>
      </AppContext.Provider>
    </>
  );
}

export { App, AppContext };
