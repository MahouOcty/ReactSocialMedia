import "./topbar.css";
import { Search } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { firebaseAuth } from "../../Initializers/firebaseConfig";
import { signOut } from "firebase/auth";
import { searchContext } from "../../helpers/Context";

export default function Topbar() {

  const {setSearchDesc} = useContext(searchContext);
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
            placeholder="Buscar descripcion..."
            className="searchInput"
            onChange={(e) => {
              setSearchDesc(e.target.value)
            }}
          />
        </div>
      </div>
      <div className="topbarRight">
        
        <button className="topbarButton" onClick={() => signOut(firebaseAuth)} >
         Log Out
        </button>

        <img src={user.photoURL} alt="" className="topbarImg"/>
        
      </div>
    </div>
  );
}
