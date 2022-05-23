import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useState } from "react";


export default function Post( {post} ) {
  const [like,setLike] = useState(post.like)
  const [isLiked,setIsLiked] = useState(false)
  const type = post.fileData.type;
  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
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
            <MoreVert />
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
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
            <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} Personas que Conozco</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} Comentarios</span>
          </div>
        </div>
      </div>
    </div>
  );
}
