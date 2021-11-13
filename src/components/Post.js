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
        <div className="post-form">
         <label htmlFor="file">File</label>
         <input type="file" id="file" accept=".gif" />
        </div>
        <button>Envoyer</button>
      </div>
    );
};

export default Post;