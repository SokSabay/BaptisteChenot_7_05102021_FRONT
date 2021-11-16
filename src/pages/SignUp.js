import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useHistory } from "react-router";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  // Création d'un nouveau compte
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        email: email,
        username: username,
        password: password,
      })
      .then((res) => {
        history.push("/login");
      })
      .catch((err) => setErrorMessage("Create account failed"));
  };

  return (
    <div>
      <Navbar />
      <div className="profil">
        <form onSubmit={(e) => handleSubmit(e)} className="sendPost">
          <h1>Create account</h1>
          <br />
          <p>Username</p>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            id="username"
          />
          {errorMessage && (
            <p className="erroMessage">Username between 6 - 12 character</p>
          )}
          <p>Email</p>
          <input
            style={{ textTransform: "lowercase" }}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
          />
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
          />
          <br />
          <br />
          {errorMessage && <p>{errorMessage}</p>}
          <input type="submit" value="GET STARTED" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
