import React from 'react';

const Post = () => {
    return (
      <div className="post">
        <div className="post-form">
          <textarea
            name="title"
            id="title"
            placeholder="Titre du post"
            onChange=""
            value=""
          />
        </div>
        <div className="post-form">
          <textarea
            name="attachment"
            id="attachment"
            placeholder="Lien du gif"
            onChange=""
            value=""
          />
        </div>
        <button>Envoyer</button>
      </div>
    );
};

export default Post;