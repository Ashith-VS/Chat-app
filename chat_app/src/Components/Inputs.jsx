import React, { useState } from "react";
import add from "../assets/images/plus_icon.png";
import emoji from "../assets/images/emoji_icon.png";
import sendIcon from "../assets/images/send_icon.png";
import { useSelector } from "react-redux";
import { db, storage } from "../Services/Firebase";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable } from "firebase/storage";
const Inputs = () => {
  const { currentUser, userChat } = useSelector((state) => state.Reducers);
  const chatID =
    currentUser?.uid > userChat?.uid
      ? currentUser?.uid + userChat?.uid
      : userChat?.uid + currentUser?.uid;
  const [text, setText] = useState("");
  const [file, setFile] = useState("");

  const handleSent = async () => {
    if (file) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          console.log(error, "Handle unsuccessful uploads");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", chatID), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser?.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", chatID), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser?.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "userChats", currentUser?.uid), {
      [chatID + ".lastmessage"]: {
        text,
      },
      [chatID + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", userChat?.uid), {
      [chatID + ".lastmessage"]: {
        text,
      },
      [chatID + ".date"]: serverTimestamp(),
    });
    setText("");
    setFile(null);
  };

  return (
    <div className="inputs d-flex" style={{ padding: "13px" }}>
      {userChat && (
        <>
          <div className="add d-flex align-items-center">
            <img src={emoji} alt="img" />
            <input
              type="file"
              style={{ display: "none" }}
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <img src={add} alt="img" />
            </label>
          </div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message"
            className="form-control flex-grow-1 mx-2"
          />
          <div className="send align-self-center" onClick={handleSent}>
            <img src={sendIcon} alt="img" />
          </div>
        </>
      )}
    </div>
  );
};

export default Inputs;
