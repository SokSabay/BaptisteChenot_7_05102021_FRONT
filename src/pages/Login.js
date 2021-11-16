import axios from "axios";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useHistory } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  // Permet de se connecter avec l'email et le password
  //  et stock les informations de l'utilisater
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isAdmin", res.data.isAdmin);
        history.push("/");
      })
      .catch((err) => setErrorMessage("Create account failed"));
  };
  return (
    <div>
      <Navbar />
      <div className="profil">
        {" "}
        <form onSubmit={(e) => handleLogin(e)} className="sendPost">
          <h2>LOGIN</h2>
          <br />
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name=""
          />
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name=""
          />
          {errorMessage && <p className="erroMessage">Unknown user</p>}
          <br />
          <br />
          <input type="submit" value="LOGIN" />
        </form>
      </div>
    </div>
  );
};
export default Login;
