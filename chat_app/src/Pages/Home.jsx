import React from "react";
import Sidebar from "../Components/Sidebar";
import Chat from "../Components/Chat";

const Home = () => {
  return (
    <div className="container-fluid ">
      <div className="container">
        <div className="row containerbor">
          <div className="col-4">
            <Sidebar />
          </div>
          <div className="col-8">
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
