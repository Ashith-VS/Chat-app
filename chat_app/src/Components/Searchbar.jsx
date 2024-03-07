import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import { useSelector } from "react-redux";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../Services/Firebase";

const Searchbar = () => {
  const { currentUser } = useSelector((state) => state.Reducers);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("name", "==", userName));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        setUserNotFound("");
      });

      if (querySnapshot.empty) {
        setUserNotFound(true);
        setUser("");
      }
    } catch (error) {
      setUserNotFound(true);
    }
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
      }
      // create userchats
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user?.uid,
          displayName: user?.name,
          photoURL: user.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser?.uid,
          displayName: currentUser?.displayName,
          photoURL: currentUser?.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    } catch (error) {
      setUser(null);
      setUserName("");
    }
  };

  return (
    <div className="search">
      <div className="d-flex p-3">
        <input
          type="text"
          placeholder="Search"
          className="form-control"
          onChange={handleChange}
          onKeyDown={handleKey}
          value={userName}
        />
      </div>
      {userNotFound && isEmpty(user) && (
        <>
          <span> User Not Found </span>
          <hr />
        </>
      )}
      {user && (
        <>
          <div
            className="searchResult chatList d-flex mb-4 ps-3"
            onClick={handleSelect}
          >
            <img src={user.photoURL} alt="" />
            <div className="p-2">
              <span>{user.name}</span>
            </div>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Searchbar;
