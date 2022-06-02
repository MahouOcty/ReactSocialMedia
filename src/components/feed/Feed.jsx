import { collection,  onSnapshot, orderBy, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { searchContext } from "../../helpers/Context";
import { firebaseDb } from "../../Initializers/firebaseConfig";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";

export default function Feed() {

  const [posts, setPosts] =useState([]);

  const {searchDesc, searchCareer, searchLesson, searchTopic} = useContext(searchContext);

  const getPosts = async () => {
    const colRef = collection(firebaseDb, "post");
    const q = query(colRef,  orderBy("createdAt","desc"));
    onSnapshot(q, (snapshot) => {
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
        {posts
        .filter((p) => {
           return p.desc.includes(searchDesc) && p.tags.career.includes(searchCareer) && p.tags.lesson.includes(searchLesson) && p.tags.topic.includes(searchTopic)
        })
        .map((p) => {
            return <Post key={p.id} post={p} />
        })}
      </div>
    </div>
  );
}
