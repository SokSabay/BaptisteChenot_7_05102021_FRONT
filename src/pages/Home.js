import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";


const Home = () => {

  const [newsData, setNewsData] = useState([]);
  const [title, setTitle] = useState([]);
  const [gif, setGif] = useState([]);

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
 

  useEffect(() => {
    getData();
    
  }, []);

  const getData = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/posts/`).then((res) => {
        console.log(res.data);
      setNewsData(res.data);    

    
    });
      
  };
const handleSubmit = (e) => {
  e.preventDefault();
   axios
     .post(`${process.env.REACT_APP_API_URL}/posts/`, {
       title,
       attachment: gif,
       id:  localStorage.getItem("userId")
     })
     .then(() => {
       setTitle("");
       setGif("");
       getData();
     });
}
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
