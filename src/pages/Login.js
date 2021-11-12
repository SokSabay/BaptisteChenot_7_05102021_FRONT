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
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Navbar />

      <form onSubmit={(e) => handleLogin(e)} className="form">
        <h1>LOGIN</h1>
        <p>Email</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name=""
          id=""
        />
        <p>Password</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name=""
          id=""
        />
        <br />
        <br />
        <input type="submit" value="LOGIN" />
      </form>
    </div>
  );
};
export default Login;
