import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { firebaseAuth } from "../../Initializers/firebaseConfig";
import { signOut } from "firebase/auth";

export default function Topbar() {

  const [user, setUser] = useState(firebaseAuth.currentUser);
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((e) => {
      setUser(e);
    })
  })
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">UniConect</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Buscar"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Home</span>
          <span className="topbarLink">Actividad</span>
          <span className="topbarLink">Perfil</span>
        
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <button className="topbarImgButton" onClick={() => signOut(firebaseAuth)} >
          <img src={user.photoURL} alt="" className="topbarImg"/>
        </button>
        
      </div>
    </div>
  );
}
