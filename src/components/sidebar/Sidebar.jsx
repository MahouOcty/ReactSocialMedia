import { useContext } from "react";
import { searchContext } from "../../helpers/Context";
import "./sidebar.css";

export default function Sidebar() {
 
  const {setSearchCareer, setSearchLesson, setSearchTopic} = useContext(searchContext);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <h2>Busqueda</h2>
        <span>Carrera:</span>
        <input
          className="search"
          placeholder="Carrera..."
          onChange={(e) => setSearchCareer(e.target.value)}
        />
        <span>Clase</span>
        <input
          className="search"
          placeholder="Clase..."
          onChange={(e) => setSearchLesson(e.target.value)}
        />
        <span>Tema</span>
        <input
          className="search"
          placeholder="Tema..."
          onChange={(e) => setSearchTopic(e.target.value)}
        />
      </div>
    </div>
  );
}
