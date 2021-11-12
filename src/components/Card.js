import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteArticle from "./posts/DeleteArticle";
import Comment from "./posts/Comment"
const Card = ({ post }) => {
  const [user, setUser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditTitle] = useState("");
  const [editedGif, setEditGif] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const userId = post.userId;
const localUser = localStorage.getItem("userId");
  const getUser = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/` + `${userId}`)
      .then((res) => {
        setUser(res.data);
      });
  };

  const handleEdit = () => {
    const data = {
      title: editedTitle ? editedTitle : post.title,
      attachment: editedGif ? editedGif : post.attachment,
    };

    axios
      .put(`${process.env.REACT_APP_API_URL}/posts/` + post.id, data)
      .then(() => {
        setIsEditing(false);
      });
  };

  return (
    <div className="post">
      <div className="postHeader">
        <h3>{user.username}</h3>

        {localUser == post.userId ? (
          <div>
            {isEditing ? (
              <button onClick={handleEdit}>Valider</button>
            ) : (
              <button onClick={() => setIsEditing(true)}>Edit</button>
            )}

            <DeleteArticle id={post.id} />
          </div>
        ) : (
          <></>
        )}
      </div>
      {isEditing ? (
        <>
          <textarea
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
            defaultValue={editedTitle ? editedTitle : post.title}
          ></textarea>
          <textarea
            onChange={(e) => setEditGif(e.target.value)}
            autoFocus
            defaultValue={editedGif ? editedGif : post.attachment}
          ></textarea>
        </>
      ) : (
        <>
          <h2>{editedTitle ? editedTitle : post.title}</h2>
          <img
            src={editedGif ? editedGif : post.attachment}
            alt="funny GIF"
            width=""
          />
        </>
      )}

      <div className="postFooter">
        <button>Liker</button>
      </div>
      <Comment post={post} />
    </div>
  );
};

export default Card;
