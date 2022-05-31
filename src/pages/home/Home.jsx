import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"
import { searchContext } from "../../helpers/Context";
import { useState } from "react";

export default function Home() {

  const [searchDesc, setSearchDesc] = useState("");

  return (
    <searchContext.Provider value={{searchDesc, setSearchDesc}}>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed/>
        <Rightbar profile/>
      </div>
    </searchContext.Provider>
  );
}
