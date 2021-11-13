import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

const Home = () => {
  const [newsData, setNewsData] = useState([]);
  const [title, setTitle] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [gif, setGif] = useState([]);
  console.log(newsData);

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  console.log(imageUrl);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/`)
      .then((res) => {
        setNewsData(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/posts/`, {
        title,
        attachment: gif,
        imageUrl,
        id: localStorage.getItem("userId"),
      })
      .then(() => {
        setTitle("");
        setGif("");
        setImageUrl("");
        getData();
      });
  };
  return (
    <div>
      <Navbar />

      <form className="post" onSubmit={(e) => handleSubmit(e)}>
        <h2>Nouveau post</h2>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="Titre"
          placeholder="Nom"
          value={title}
        />
        <br />
        <br />
        <textarea
          onChange={(e) => setGif(e.target.value)}
          placeholder="Lien du gif"
          value={gif}
        ></textarea>
        <br />
        <br />
        <label htmlFor="file">File</label>
        <input
          onChange={(e) => setImageUrl(e.target.files[0])}
          type="file"
          id="file"
          accept=".gif"
        />

        <input type="submit" value="Envoyer" />
      </form>

      <ul className="flexCard">
        {newsData.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
