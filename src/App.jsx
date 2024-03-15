import { useState } from 'react'

import './App.css'
import Header from './components/header/Header'
import Menu from './components/menu/Menu'
import { Routes, Route } from 'react-router-dom'
import FlappyBird from './components/games/flappybird/FlappyBird'
import Dashboard from './components/dashboard/Dashboard'

function App() {

  return (
    <>
      <Header />
      <Menu/>
      <Routes>
        <Route path='/'
          element={<Dashboard />}/>
          
        <Route path='/flappy' element={<FlappyBird/>}/>
      </Routes>
    </>
  )
}

export default App
