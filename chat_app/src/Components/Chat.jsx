import React from "react";
import Messages from "./Messages";
import Inputs from "./Inputs";
import vidimg from "../assets/images/media_video_icon.png";
import search_icon from "../assets/images/search_icon.png";
import menuIcon from "../assets/images/menu_icon.png";
import { useSelector } from "react-redux";

const Chat = () => {
  const { userChat } = useSelector((state) => state.Reducers);

  return (
    <div className="test">
      <div className="chats ">
        <div
          className="chat d-flex flex-row p-4"
          style={{ backgroundColor: userChat && "aquamarine" }}
        >
          {userChat && <img src={userChat?.photoURL} alt="" />}
          <span>{userChat?.displayName}</span>
          {userChat && (
            <div className="ms-auto ">
              <img src={vidimg} alt="img" />
              <img src={search_icon} alt="img" />
              <img src={menuIcon} alt="img" />
            </div>
          )}
        </div>
        <Messages />
      </div>
      <Inputs />
    </div>
  );
};

export default Chat;
