import "./post.css";
import { Delete } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { firebaseAuth, firebaseDb } from "../../Initializers/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";


export default function Post( {post} ) {
  const [user, setUser] = useState(firebaseAuth.currentUser);

  const type = post.fileData.type;
  
  const deletePost = () =>{deleteDoc (doc(firebaseDb, "post", post.id))}

  const isUser = () => {
    if(user.uid === post.userInfo.userUID) {
      return (
        <>
          <button 
          className="optionButton"
          onClick={()=>deletePost()}>
            <Delete/> 
          </button>
        </>    
      )
    }
  }

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((e) => {
      setUser(e);
    })
  }, []);
  
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={post.userInfo.photoURL}
              alt=""
            />
            <span className="postUsername">
              {post.userInfo.userName}
            </span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            {isUser()}
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {
            type.startsWith("image/") 
              ? <img className="postImg" src={post.fileData.downloadURL} alt="" />
              : type.startsWith("audio/")
              ? <audio controls className="postImg" src={post.fileData.downloadURL} alt="" />
              : type.startsWith("video/") 
              && <video controls className="postImg" src={post.fileData.downloadURL} alt="" /> 
          }
        </div>
        <div className="tags">
          <span>{post?.tags.career}</span>
          <span>{post?.tags.lesson}</span>
          <span>{post?.tags.topic}</span>
        </div>
      </div>
    </div>
  );
}
