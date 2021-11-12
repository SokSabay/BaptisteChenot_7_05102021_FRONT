import axios from "axios";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const user = localStorage.getItem("userId");

  const handleLogout = (e) => {
    localStorage.clear();
    axios.defaults.headers.common["Authorization"] = `Bearer null`;
    window.location = "/";
  };

  return (
    <div className="nav">
      <div>
        <NavLink exact to="/" activeClassName="nav-active">
          <img src="./img/groupomania.png" alt="icon" />
        </NavLink>
      </div>
      {user ? (
        <div className="navRight">
          
          <NavLink exact to="/account" activeClassName="nav-active">
            <h2>{localStorage.getItem("username")}</h2>
          </NavLink>

          
          <button onClick={(e) => handleLogout(e)}>Logout</button>
        </div>
      ) : (
        <div>
          <NavLink exact to="/signup" activeClassName="nav-active">
            Signup
          </NavLink>
          <NavLink exact to="/login" activeClassName="nav-active">
            Login
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
