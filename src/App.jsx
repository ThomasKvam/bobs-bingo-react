import { createContext, useState, useEffect } from "react";
import axios from "axios";


import './App.css'
import Header from './components/header/Header'
import Menu from './components/menu/Menu'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import FlappyBird from './components/games/flappybird/FlappyBird'
import Dashboard from './components/dashboard/Dashboard'
import LogIn from './components/login/index'
import SignUp from './components/login/signup'
import Snake from './components/games/snake/snake'


const AppContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const location = useLocation()

    // Retrieve user from local storage on component mount
    useEffect(() => {
      const localUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (localUser) {
        setLoggedInUser(localUser);
      }
    }, []);
  
    // Update local storage when loggedInUser changes
    useEffect(() => {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    }, [loggedInUser]);



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

        </Routes>
      </AppContext.Provider>
    </>
  );
}

export { App, AppContext };
