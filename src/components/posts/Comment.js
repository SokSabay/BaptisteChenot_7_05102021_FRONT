import React, { useState } from "react";
import axios from "axios";
const Comment = ({ post }) => {
  const [newsData, setNewsData] = useState([]);
  const [newComment, setNewComment] = useState([]);

  const [comment, setIsComment] = useState(false);







  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/messages/`, {
        comment: newComment,
        postId: post.id,
        userId: localStorage.getItem("userId"),
      })
      .then(() => {
        setNewComment("");
        // getData();
      });
  };

  return (
    <div>
      {comment ? (
        <div className="comment">
          <div>
            <button onClick={() => setIsComment(false)}>Valider</button>
            <form onSubmit={(e) => handleSubmit(e)}>
              <textarea
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Lien du gif"
                value={newComment}
              ></textarea>
              <input type="submit" value="Envoyer" />
            </form>
          </div>

          <div className="comment">
            <p>{post.id}</p>
            <p>T'ES TROP CON</p>
            <p>T'ES TROP CON</p>
            <p>T'ES TROP CON</p>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsComment(true)}>Commenter</button>
      )}
    </div>
  );
};

export default Comment;
