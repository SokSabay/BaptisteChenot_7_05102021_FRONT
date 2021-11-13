import React, { useEffect, useState } from "react";
import axios from "axios";
import Create from "../comments/Create";

const Comment = ({ post }) => {
  const [newsData, setNewsData] = useState([]);
  const [newComment, setNewComment] = useState([]);
  const [comment, setIsComment] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/messages/post/` + post.id)
      .then((res) => {
        setNewsData(res.data);
      });
  };

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
        getData();
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
                placeholder="Mon message.."
                value={newComment}
              ></textarea>
              <input type="submit" value="Envoyer" />
            </form>
          </div>
          <ul className="flexCard">
            {newsData.map((comment) => (
              <Create key={comment.id} post={comment} />
            ))}
          </ul>
        </div>
      ) : (
        <button onClick={() => setIsComment(true)}>Commenter</button>
      )}
    </div>
  );
};

export default Comment;
