import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

const Home = () => {
  const [newsData, setNewsData] = useState([]);
  const [title, setTitle] = useState([]);
  // const [gif, setGif] = useState([]);
  const [filename, setFilename] = useState("");

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/posts/`).then((res) => {
      setNewsData(res.data);
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let file = filename;
    let data = new FormData();
    data.append("title", title);
    data.append("id", localStorage.getItem("userId"));
    data.append("image", file);
    axios.post(`${process.env.REACT_APP_API_URL}/posts/`, data, {}).then(() => {
      setTitle("");
      setFilename("");
      //  setGif("");
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
        {/* <textarea
          onChange={(e) => setGif(e.target.value)}
          placeholder="Lien du gif"
          value={gif}
        ></textarea> */}
        <br />
        <br />
        <label htmlFor="file">File</label>
        <input
          onChange={(e) => setFilename(e.target.files[0])}
          type="file"
          name="file"
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
