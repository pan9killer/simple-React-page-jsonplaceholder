import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [posts, setPosts]=useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    (async () => {
      let postResult = await axios.get("http://jsonplaceholder.typicode.com/posts");
      let userResult = await axios.get("http://jsonplaceholder.typicode.com/users");
      const getRandomInt = (max) => Math.floor(Math.random() * max);
      let data = postResult.data.map((post) => (post.name = userResult.data[getRandomInt(9)].name, post));
      setPosts(data);
    })()
  },[])
  
  useEffect(() => {
    (async () => {
      let postResult = await axios.get("http://jsonplaceholder.typicode.com/posts");
      let userResult = await axios.get("http://jsonplaceholder.typicode.com/users");
      const getRandomInt = (max) => Math.floor(Math.random() * max);
      let data = postResult.data.map((post) => (post.name = userResult.data[getRandomInt(9)].name, post));
        const results = data.filter(person =>
          person.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setPosts(results);
    })()
    }, [searchTerm]);

  return (
    <div className="container-fluid ">
      <div className="input-group flex-wrap find__block">
        <span className="input-group-text" id="addon-wrapping">&#128269;</span>
        <input type="text" value={searchTerm} onChange={handleChange} className="form-control" placeholder="Filter by author..." aria-label="Filter by author..." aria-describedby="addon-wrapping" />
      </div>
      {posts.length > 0 ?
      (<div className="d-flex justify-content-around d-flex flex-wrap flex-sm-wrap flex-md-wrap flex-lg-wrap flex-xl-wrap flex-xxl-wrap">
        {posts.map(post => (
          <div key={post.id} className="bg-light col fs-6 text result__block d-flex flex-wrap flex-sm-wrap flex-md-wrap flex-lg-wrap flex-xl-wrap flex-xxl-wrap">
            <h3 className="text-primary">{post.title}</h3>
            <p>{post.body}</p>
            <p className="text-muted">{post.name}</p>
          </div>
  ))}
  </div>) :
      ( <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>)
      }
    </div>
  );
}

export default App;
