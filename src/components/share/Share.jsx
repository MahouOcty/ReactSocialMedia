import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons"
import { useEffect, useRef, useState } from "react";
import { firebaseAuth, firebaseDb, firebaseStorage } from "../../Initializers/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function Share() {
  const desc = useRef();
  const [user, setUser] = useState(firebaseAuth.currentUser);
  const [file, setFile] = useState(null);
  const [value, setValue] = useState("");

  const submitHandler =  (async (e) => {
    e.preventDefault();

    
    if(file==null) {
      const today = new Date().toLocaleDateString()
      const newPost = {
        desc: desc.current.value,
        userInfo: {
          userName: user.displayName,
          photoURL: user.photoURL,
          userUID: user.uid
        }, 
        fileData: {
          type: "text"
        },
        date: today,
        like: 0,
        comment:0
      }
      addDoc(collection(firebaseDb,"post"), newPost).then(() => {
        window.location.reload();
      })
    }
    else {
      const storageRef = ref(firebaseStorage, file.name);
      uploadBytes(storageRef, file).then((snapshot) => {
      const today = new Date().toLocaleDateString();
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        const newPost = {
          desc: desc.current.value,
          fileData: {
            type: file.type,
            downloadURL: downloadURL
          },
          userInfo: {
            userName: user.displayName,
            photoURL: user.photoURL,
            userUID: user.uid
          }, 
          date: today,
          like: 0,
          comment:0,
          createdAt: serverTimestamp()
        }
        addDoc(collection(firebaseDb,"post"), newPost).then(setValue(""))
      })
    })}
    
  })

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((e) => {
      setUser(e);
    })
  })
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.photoURL} alt="" />
          <input
            placeholder="¿Qué tienes en mente?"
            className="shareInput"
            ref={desc}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <hr className="shareHr"/>
        <form className="shareBottom" onSubmit={(e) => submitHandler(e)}>
            <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Video O Foto</span>
                    <input 
                    style={{display:"none"}}
                    type="file" 
                    id="file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }} />
                </label>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Localizacion</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Comentarios</span>
                </div>
            </div>
            <button className="shareButton" type="submit">Compartir</button>
        </form>
      </div>
    </div>
  );
}
