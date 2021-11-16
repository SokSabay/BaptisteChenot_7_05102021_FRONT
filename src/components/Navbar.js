import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";

const Navbar = () => {
  const user = localStorage.getItem("userId");
  const history = useHistory();
  // Déconnect l'utilisateur et supprime ses infrormations enregistré en local
  const handleLogout = (e) => {
    localStorage.clear();
    axios.defaults.headers.common["Authorization"] = `Bearer null`;
    history.push("/");
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact to="/">
            <div className="logo">
              <img className="image1" src="./img/groupomania.png" alt="icon" />
              <img className="image2" src="./img/group.png" alt="icon" />
            </div>
          </NavLink>
        </div>
        {user ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink exact to="/account" activeClassName="nav-active">
                <h2>{localStorage.getItem("username")}</h2>
              </NavLink>
            </li>
            <a onClick={(e) => handleLogout(e)} className="myButton">
              LOGOUT
            </a>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink exact to="/signup" activeClassName="nav-active">
                Signup
              </NavLink>
            </li>
            <li>
              <NavLink
                className="myButton"
                exact
                to="/login"
                activeClassName="nav-active"
              >
                Login
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};
// --------------------------------------------------------------------------------
//     <div className="nav">
//       <div>
//         <NavLink exact to="/" activeClassName="nav-active">
//           <img src="./img/groupomania.png" alt="icon" />
//         </NavLink>
//       </div>
//       {user ? (
//         <div className="navRight">
//           <div>
//             <NavLink exact to="/account" activeClassName="nav-active">
//               <h2>{localStorage.getItem("username")}</h2>
//             </NavLink>
//           </div>
//           <div>
//             <a onClick={(e) => handleLogout(e)} class="myButton">
//               LOGOUT
//             </a>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <NavLink exact to="/signup" activeClassName="nav-active">
//             Signup
//           </NavLink>
//           <NavLink exact to="/login" activeClassName="nav-active">
//             Login
//           </NavLink>
//         </div>
//       )}
//     </div>
//   );
// };

export default Navbar;
