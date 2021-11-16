import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

const Home = () => {
  const [newsData, setNewsData] = useState([]);
  const [title, setTitle] = useState([]);
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
      getData();
    });
  };
  return (
    <div>
      <Navbar />
      <div className="home">
        <form className="sendPost" onSubmit={(e) => handleSubmit(e)}>
          <h2>Nouveau post : </h2>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="Titre"
            placeholder="Quoi de neuf..."
            value={title}
          />

          <br />
          <br />
          <div>
            <input
              onChange={(e) => setFilename(e.target.files[0])}
              type="file"
              name="file"
              id="file"
              accept=".gif"
            />
          </div>

          <input type="submit" value="Envoyer" />
        </form>

        <ul className="flexCard">
          {newsData.map((post) => (
            <Card key={post.id} post={post} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
