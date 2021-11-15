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
      <p>{user.username} :</p>
      <div className="message">
        <div className="reponse">
          {isEditing ? (
            <textarea
              onChange={(e) => setEditComment(e.target.value)}
              autoFocus
              defaultValue={editedComment ? editedComment : post.comment}
            ></textarea>
          ) : (
            <p>{editedComment ? editedComment : post.comment}</p>
          )}
        </div>

        {localUser == post.userId ? (
          <>
            {isEditing ? (
              <button onClick={handleEdit}>Valider</button>
            ) : (
              <div className="button">
                <button onClick={() => setIsEditing(true)}>
                  <i className="far fa-edit"></i>
                </button>
                <DeleteComment id={post.id} />
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Create;
