import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Redirect } from "react-router";


const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   useEffect(() => {
  //     getData();
  //   }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        email,
        username,
        password,
      })
      .then((res) => {
        console.log(res);
    <Redirect to="/login" />;
      });
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={(e) => handleSubmit(e)} className="form">
      <h1>Create account</h1>
        <p>Username</p>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          id="username"
        />
        <p>Email</p>
        <input
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
        <input type="submit" value="GET STARTED" />
      </form>
    </div>
  );
};

export default SignUp;
