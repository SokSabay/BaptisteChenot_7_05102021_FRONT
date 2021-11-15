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
    console.log(email);
    console.log(username);
    console.log(password);
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        email: email,
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.errors);
        window.location = "/login";
      })
      .catch((err) => console.log(err));
  
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
    </div>
  );
};

export default SignUp;
