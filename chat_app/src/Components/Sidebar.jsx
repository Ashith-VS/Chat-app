import React from "react";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import ChatList from "./ChatList";

const Sidebar = () => {
  return (
    <div className="Sidebar" style={{ marginLeft: "-12px", height: "100%" }}>
      <Navbar />
      <Searchbar />
      <ChatList />
    </div>
  );
};

export default Sidebar;
