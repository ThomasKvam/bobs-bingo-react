import { createContext, useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import Header from "./components/header/Header";
import Menu from "./components/menu/Menu";
import { Routes, Route } from "react-router-dom";
import FlappyBird from "./components/games/flappybird/FlappyBird";
import Dashboard from "./components/dashboard/Dashboard";
import LogIn from "./components/login/index";
import SignUp from "./components/login/signup";

const AppContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [users, setUsers] = useState([]);

  console.log(users);

  // const getUsers = () => {
  //   fetch(`https://localhost:4000/users
  //   `)
  //     .then((response) => response.json())
  //     .then((data) => setUsers(data));
  // };

  // const getUsers = () => {
  //   axios
  //     .get(`http://localhost:4000/users`)
  //     .then((response) => {
  //       setUsers(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching users:", error);
  //     });
  // };

  // useEffect(() => {
  //   getUsers();
  // });

  return (
    <>
      <Header />
      <Menu />

      <AppContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <Routes>
          {!loggedInUser ? (
            <Route path="/" element={<LogIn />} />
          ) : (
            <Route path="/" element={<Dashboard />} />
          )}
          <Route path="/signup" element={<SignUp />} />

          <Route path="/flappy" element={<FlappyBird />} />
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export { App, AppContext };
