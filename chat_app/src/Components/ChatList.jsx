import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Services/Firebase";
import { UserChangedAuth } from "../Redux/Action/AuthAction";
import { useDispatch, useSelector } from "react-redux";

const ChatList = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.Reducers);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  const handleSelect = (userInfo) => {
    dispatch(UserChangedAuth(userInfo));
  };

  return (
    <div className="chatList ps-3">
      {chats &&
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              key={chat[0]}
              className="chatItem d-flex"
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              {}
              <img src={chat[1].userInfo?.photoURL} alt="" />
              <div className="p-2">
                <span>{chat[1].userInfo?.displayName}</span>
                <p>{chat[1].lastmessage?.text}</p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default ChatList;
