import { collection,  onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firebaseDb } from "../../Initializers/firebaseConfig";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";

export default function Feed() {

  const [posts, setPosts] =useState([]);

  const getPosts = async () => {
    onSnapshot(collection(firebaseDb, "post"), (snapshot) => {
      const docs = [];
      snapshot.docs.forEach((doc) => {
        docs.push({...doc.data(), id: doc.id});
      });
      setPosts(docs);
    })
  }

  useEffect(() => {
    getPosts();
  },[])
  
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => {
          return <Post key={p.id} post={p} />
        })}
      </div>
    </div>
  );
}
