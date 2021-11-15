import axios from "axios";
import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
      
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isAdmin", res.data.isAdmin);
        //  window.location = "/";
      })
      .catch((err) => console.log(err));
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
          <br />
          <br />
          <input type="submit" value="LOGIN" />
        </form>
      </div>
    </div>
  );
};
export default Login;
