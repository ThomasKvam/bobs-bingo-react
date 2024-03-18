import { createContext, useState} from 'react'

import './App.css'
import Header from './components/header/Header'
import Menu from './components/menu/Menu'
import { Routes, Route } from 'react-router-dom'
import FlappyBird from './components/games/flappybird/FlappyBird'
import Dashboard from './components/dashboard/Dashboard'
import LogIn from './components/login/index'
import SignUp from './components/login/signup'


const AppContext = createContext()

function App() {

  const [loggedInUser, setLoggedInUser] = useState(null)

  // console.log(loggedInUser)

  // const getUser = () => {
  //   fetch(`https://localhost:4000/users
  //   `)
  //     .then((response) => response.json())
  //     .then((data) => setLoggedInUser(data));
  // };

  // useEffect(() => {
  //   getUser();
  // })

  return (
    <>
      <Header />
      <Menu/>

      <AppContext.Provider value={{loggedInUser, setLoggedInUser}}>

        <Routes>

          {!loggedInUser ? (
            <Route path='/'
            element={<LogIn />}/>
          ) : (
            <Route path='/'
              element={<Dashboard />} />
          )}
          <Route path='/signup'
            element={<SignUp/>} />

          <Route path='/dracodash' 
            element={<FlappyBird/>}/>

        </Routes>
      </AppContext.Provider>
    </>
  )
}

export { App, AppContext }
