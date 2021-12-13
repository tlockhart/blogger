// import logo from './logo.svg';
// import './App.css';
import Post from "./components/Post/Post";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const initData = [
    {
      userId: 1,
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    },
    {
      userId: 1,
      id: 2,
      title: "qui est esse",
      body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    },
  ];

  async function getData() {
    let response = await axios.get("https://jsonplaceholder.typicode.com/posts");

    /* filter unwanted posts */
    const filteredPosts = response.data.filter(post => post.userId === 1);
    setMyPosts(filteredPosts);

    return response;
  }

  const [posts, setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const response = await getData();
      // axios puts the response in data key
      // console.log(response.data);
      
      // set posts to respose.data
      setPosts(response.data);

    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h1>All Posts</h1>
          {posts.map((post) => (
            <Post {...post} key={post.id} />
          ))}
        </div>
        {/* Duplicate */}
        <div className="col-6">
        <h1>My Posts</h1>
          {myPosts.map((post) => (
            <Post {...post} key={post.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
