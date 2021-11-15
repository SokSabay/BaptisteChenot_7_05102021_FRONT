import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import DeleteArticle from "./posts/DeleteArticle";
import Comment from "./posts/Comment";
const Card = ({ post }) => {
  const [user, setUser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditTitle] = useState("");
  const [editedFilename, setEditFilename] = useState("");
  useEffect(() => {
    getUser();
  }, []);

  const localUser = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("isAdmin");
 
  const getUser = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/` + `${post.userId}`)
      .then((res) => {
        console.log(res);
        setUser(res.data);
      });
  };

  const handleEdit = () => {
    let data = new FormData();
    data.append("title", editedTitle ? editedTitle : post.title);
    data.append("image", editedFilename ? editedFilename : post.imageUrl);

    axios
      .put(`${process.env.REACT_APP_API_URL}/posts/` + post.id, data)
      .then(() => {

        window.location.reload();
      });
  };

  return (
    <div className="post">
      <div className="postHeader">
        <h4>{user.username}</h4>
        {isAdmin === "true" ? (
          <div>
            {isEditing ? (
              <button onClick={handleEdit}>Valider</button>
            ) : (
              <button onClick={() => setIsEditing(true)}>
                <i className="far fa-edit"></i>
              </button>
            )}
            <DeleteArticle id={post.id} />
          </div>
        ) : localUser == post.userId ? (
                   <div>
            {isEditing ? (
              <button onClick={handleEdit}>Valider</button>
            ) : (
              <button onClick={() => setIsEditing(true)}>
                <i className="far fa-edit"></i>
              </button>
            )}
            <DeleteArticle id={post.id} />
          </div>
        ) : null}
        {/* 
        {localUser == post.userId ? (
          <div>
            {isEditing ? (
              <button onClick={handleEdit}>Valider</button>
            ) : (
              <button onClick={() => setIsEditing(true)}>
                <i className="far fa-edit"></i>
              </button>
            )}

            <DeleteArticle id={post.id} />
          </div>
        ) : (
          <></>
        )} */}
      </div>
      {isEditing ? (
        <>
          <textarea
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
            defaultValue={editedTitle ? editedTitle : post.title}
          ></textarea>

          <input
            onChange={(e) => setEditFilename(e.target.files[0])}
            type="file"
            name="file"
            id="file"
            accept=".gif"
          />
        </>
      ) : (
        <>
          <h2>{editedTitle ? editedTitle : post.title}</h2>
          <img src={editedFilename ? editedFilename : post.imageUrl} alt="" />
        </>
      )}

      <div className="postFooter"></div>
      <Comment post={post} />
    </div>
  );
};

export default Card;
