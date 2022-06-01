import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons"
import { useEffect, useRef, useState } from "react";
import { firebaseAuth, firebaseDb, firebaseStorage } from "../../Initializers/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, onSnapshot, serverTimestamp } from "firebase/firestore";
import Select from "react-select";

export default function Share() {
  const desc = useRef();
  const [user, setUser] = useState(firebaseAuth.currentUser);
  const [file, setFile] = useState(null);
  const [value, setValue] = useState("");
  const [selectionCareer, setSelectionCareer] = useState("");
  const [selectionLesson, setSelectionLesson] = useState("");
  const [topic, setTopic] = useState("");
  const [careersOptions, setCareersOptions] = useState([]);
  const [careersLessons, setCareersLessons] = useState([]);
  

  const getCareers = () => {
    const colRef = collection(firebaseDb, "courses");
    onSnapshot(colRef, (snapshot) => {
      const options = [];
      const lessons = []
      snapshot.docs.forEach((doc) => {
        options.push({value: doc.data().career, label: doc.data().career});
        lessons.push({...doc.data()})
      })
      setCareersOptions(options);
      setCareersLessons(lessons);
    })
  }

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
        comment:0,
        createdAt: serverTimestamp(),
        tags: {
          career: selectionCareer,
          lesson: selectionLesson,
          topic: topic
        }
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
          createdAt: serverTimestamp(),
          tags: {
            career: selectionCareer,
            lesson: selectionLesson,
            topic: topic
          }
        }
        addDoc(collection(firebaseDb,"post"), newPost).then(setValue(""))
      })
    })}
    
  })


  useEffect(() => {
    firebaseAuth.onAuthStateChanged((e) => {
      setUser(e);
    });
    getCareers();
  }, [])
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
            <div className="shareTags">
              Carrera:
              <Select 
              options={careersOptions} 
              onChange={(value) => {
                setSelectionCareer(value.value);
              }} />
              Materia:
              {careersLessons
              .filter((c) => selectionCareer===c.career)
              .map((c) => {
                const lessonsOptions = []
                c.lessons.forEach((lesson) => {
                  lessonsOptions.push({value: lesson, label: lesson})
                })
                return (
                  <Select 
                  key={c.career}
                  options={lessonsOptions}
                  onChange={(value) => {
                    setSelectionLesson(value.value);
                  }} />
                )
                })}
                Tema: 
                <input
                placeholder="Ingresa tu tema"
                className="shareInput"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                />
                </div>
            <button className="shareButton" type="submit">Compartir</button>
        </form>
      </div>
    </div>
  );
}
