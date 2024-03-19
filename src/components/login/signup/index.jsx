import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function getInitialUser() {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");

  return {
    username: username || "",
    password: password || "",
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
    role: "user",
  };
}

function SignUp() {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");
  const navigate = useNavigate()

  const [newUser, setNewUser] = useState(getInitialUser);

  console.log(newUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
    localStorage.setItem(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:4000/auth/signup", {
      username,
      firstName,
      lastName,
      email,
      role: ["user"],
      password,
    });
    console.log(response);
    navigate(`/`)
  };

  return (
    <div className="login-container">
      <h3>Register User</h3>
      <form type="submit" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
        </div>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
        />

        <div>
          <label htmlFor="password">Password: </label>
        </div>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
        />

        <div>
          <label htmlFor="firstName">First Name: </label>
        </div>
        <input
          type="text"
          id="firstName"
          name="firstName"
          onChange={handleChange}
        />

        <div>
          <label htmlFor="lastName">Last Name: </label>
        </div>
        <input
          type="text"
          id="lastName"
          name="lastName"
          onChange={handleChange}
        />

        <div>
          <label htmlFor="email">Email: </label>
        </div>
        <input type="text" id="email" name="email" onChange={handleChange} />
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
