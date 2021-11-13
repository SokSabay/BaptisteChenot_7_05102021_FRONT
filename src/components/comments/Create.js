import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteComment from "./DeleteComment";

const Create = ({ post }) => {
  const [user, setUser] = useState([]);
  const localUser = localStorage.getItem("userId");
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditComment] = useState("");
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/` + post.userId)
      .then((res) => {
        setUser(res.data);
      });
  };
    const handleEdit = () => {
      const data = {
        title: editedComment ? editedComment : post.comment,
      };

      axios
        .put(`${process.env.REACT_APP_API_URL}/messages/` + post.id, data)
        .then(() => {
          setIsEditing(false);
        });
    };
  return (
    <>
      <div className="post">
        <h3>{user.username}</h3>
        {isEditing ? (
          <textarea
            onChange={(e) => setEditComment(e.target.value)}
            autoFocus
            defaultValue={editedComment ? editedComment : post.comment}
          ></textarea>
        ) : (
          <p>{editedComment ? editedComment : post.comment}</p>
        )}
        {localUser == post.userId ? (
          <>
            {isEditing ? (
              <button onClick={handleEdit}>Valider</button>
            ) : (
              <button onClick={() => setIsEditing(true)}>Edit</button>
            )}
            <DeleteComment id={post.id} />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Create;
