import axios from "axios";
import React from "react";

const DeleteArticle = ({ id }) => {
  // Cette fonction permet à l'admin de supprimer les posts
  const handleDelete = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/posts/` + id);
    window.location.reload();
  };
  return (
    <button
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cet article ?"))
          handleDelete();
      }}
    >
      <i className="far fa-trash-alt"></i>
    </button>
  );
};

export default DeleteArticle;
