import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PrivateRoutes from "./utils/PrivateRoutes";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Services/Firebase";
import { CurrentUserAuth } from "./Redux/Action/AuthAction";

const Router = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.Reducers);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      dispatch(CurrentUserAuth(user));
      console.log(user)
    });
    return () => {
      unSub();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={currentUser ? <Home /> : <Login />} />
       {/* <Route  element={<PrivateRoutes />}>
          <Route path="/" exact element={<Home />} />
        </Route>*/ }
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
