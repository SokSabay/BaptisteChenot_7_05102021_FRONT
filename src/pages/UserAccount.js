import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const UserAccount = () => {
  //get user info
  const [user, setUser] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditUser] = useState("");
  const localUser = localStorage.getItem("userId");

  useEffect(() => {
    getUser();
  }, []);

  // Fonction pour obtenir les informations de l'utilisateur connecté !
  const getUser = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/` + localUser)
      .then((res) => {
        setUser(res.data);
      });
  };

  // Fonction pour supprimer l'utilisateur connecté !
  const handleDelete = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/auth/` + localUser);
    localStorage.clear();
    axios.defaults.headers.common["Authorization"] = `Bearer null`;
    window.location = "/";
  };

  // Permet d'éditer le profil
  const handleEdit = () => {
    const data = {
      username: editedUser ? editedUser : user.username,
    };

    axios
      .put(`${process.env.REACT_APP_API_URL}/auth/` + localUser, data)
      .then(() => {
        localStorage.setItem("username", editedUser);
        setIsEditing(false);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="profil">
        <div className="sendPost">
          <h2>Account Settings</h2>
          <br />
          <br />
          <div>
            <h3>Username</h3>
            {isEditing ? (
              <textarea
                onChange={(e) => setEditUser(e.target.value)}
                autoFocus
                defaultValue={editedUser ? editedUser : user.username}
              ></textarea>
            ) : (
              <p>{editedUser ? editedUser : user.username}</p>
            )}
            <>
              {isEditing ? (
                <button onClick={handleEdit}>Valider</button>
              ) : (
                <button onClick={() => setIsEditing(true)}>
                  <i className="far fa-edit"></i>
                </button>
              )}
            </>
          </div>
          <button
            onClick={() => {
              if (window.confirm("Voulez-vous supprimer cet article ?"))
                handleDelete();
            }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
