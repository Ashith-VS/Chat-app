import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { CurrentUserAuth } from "../Redux/Action/AuthAction";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Services/Firebase";

const PrivateRoutes = () => {
  const dispatch=useDispatch()
  const { currentUser } = useSelector((state) => state.Reducers);


  
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      dispatch(CurrentUserAuth(user));
    });
    return () => {
      unSub();
    };
  }, []);




  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
