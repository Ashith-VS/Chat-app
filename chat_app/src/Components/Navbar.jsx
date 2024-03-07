import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Services/Firebase";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.Reducers);

  return (
    <div className="navbar">
      <span className="logo">ChatApp</span>
      <div className="user p-3 ">
        <img src={currentUser?.photoURL} alt="" />
        <span>{currentUser?.displayName}</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
