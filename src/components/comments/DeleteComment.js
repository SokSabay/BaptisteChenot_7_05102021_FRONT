import React from 'react';
import axios from "axios";

const DeleteComment = ({id}) => {
    const handleDelete = () => {
      axios.delete(`${process.env.REACT_APP_API_URL}/messages/` + id);
      window.location.reload();
    };
  return (
    <button
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cet article ?"))
          handleDelete();
      }}
    >
      Supprimer
    </button>
  );
};

export default DeleteComment;