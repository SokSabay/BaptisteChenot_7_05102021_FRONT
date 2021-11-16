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

  //Obtient les commentaires
  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/messages/post/` + post.id)
      .then((res) => {
        setNewsData(res.data);
      });
  };

  //Création d'un nouveau commentaire
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
    <>
      {comment ? (
        <div className="message2">
          <ul className="">
            {newsData.map((comment) => (
              <Create key={comment.id} post={comment} />
            ))}
          </ul>

          <form onSubmit={(e) => handleSubmit(e)}>
            <textarea
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Mon message.."
              value={newComment}
            ></textarea>
            <input className="inputCom" type="submit" value="Envoyer" />
          </form>
          <button onClick={() => setIsComment(false)}>Fermer</button>
        </div>
      ) : (
        <div className="likeCom">
          {/* <button>
            <i className="far fa-thumbs-up"></i>
          </button> */}
          <button onClick={() => setIsComment(true)}>
            <i className="far fa-comments"></i>  ({newsData.length})
          </button>
        </div>
      )}
    </>
  );
};

export default Comment;
