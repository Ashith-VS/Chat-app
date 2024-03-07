import React, { useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Services/Firebase";
import { useSelector } from "react-redux";

const Messages = () => {
  const { currentUser, userChat } = useSelector((state) => state.Reducers);
  const [messages, setMessages] = useState([]);
  const chatID =
    currentUser?.uid > userChat?.uid
      ? currentUser.uid + userChat?.uid
      : userChat?.uid + currentUser?.uid;

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const getMessages = () => {
      const unsub = onSnapshot(doc(db, "chats", chatID), (doc) => {
        doc.exists() && setMessages(doc.data());
      });
      return () => {
        unsub();
      };
    };
    userChat?.uid && getMessages();
  }, [chatID]);

  return (
    <div className={`messagess`}>
      {messages?.messages?.map((msg) => (
        <div
          className={`message ${
            msg?.senderId === currentUser?.uid ? "owner" : ""
          }`}
          key={msg?.id}
          ref={ref}
        >
          {console.log(msg)}
          <div className="messageInfo">
            <img
              src={
                msg?.senderId === currentUser?.uid
                  ? currentUser?.photoURL
                  : userChat?.photoURL
              }
              alt=""
            />
            <span>just now</span>
          </div>
          <div className="messageContent">
            <p>{msg?.text}</p>
            {msg?.img && <img src={msg?.img} alt="" />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
