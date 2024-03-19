import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../App";
import { Link, json } from "react-router-dom";
import "./login.css";
import axios from "axios";

const initialUser = {
  username: "",
  password: "",
};

function LogIn() {
  const { setLoggedInUser } = useContext(AppContext);
  const [user, setUser] = useState(initialUser);

  const username = user.username;
  const password = user.password;

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("loggedInUser"))
    if(localUser !== null){
      setLoggedInUser(localUser)
    }
  },[setLoggedInUser])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:4000/auth/signin", {
      username,
      password,
    });
    setLoggedInUser(response.data)
  };

  function handleOnChange(event) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  return (
    <div className="login-container">
      <h3>Sign in</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="username">Username: </label>
          </div>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleOnChange}
            value={user.username}
          />
        </div>
        <div>
          <div>
            <label htmlFor="password">Password: </label>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleOnChange}
            value={user.password}
          />
        </div>
        <div>
          <button type="submit">Log in</button>
        </div>
      </form>

      <p>Don't have a user?</p>
      <Link to={"/signup"}>Sign up</Link>
    </div>
  );
}

export default LogIn;
