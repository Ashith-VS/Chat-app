import {
  AUTH_CREATE_FAILURE,
  AUTH_CREATE_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_SUCCESS,
  USER_STATE_CHANGED,
  CURRENT_USER_DATA,
} from "../Constants";
import { auth, storage, db } from "../../Services/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const CreateUserAuth = (user, navigate) => {
  return async (dispatch) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      // Upload file
      const storageRef = ref(storage, user.name);
      const uploadTask = uploadBytesResumable(storageRef, user.file);
      uploadTask.on(
        (error) => {
          console.log(error, "Handle unsuccessful uploads");
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // Update user profile
            await updateProfile(res.user, {
              displayName: user.name,
              photoURL: downloadURL,
            });
            // Add user to firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              name: user.name,
              email: user.email,
              photoURL: downloadURL,
              createdAt: serverTimestamp(),
              isonline: true,
            }),
              await setDoc(doc(db, "userChats", res.user.uid), {});
          });
        }
      );
      dispatch({ type: AUTH_CREATE_SUCCESS, payload: res });
      navigate("/login");
    } catch (error) {
      dispatch({ type: AUTH_CREATE_FAILURE, payload: error.code });
    }
  };
};

export const LoggedUserAuth = (user) => {
  return async (dispatch) => {
    await signInWithEmailAndPassword(auth, user.email, user.password)
      .then((res) => {
        dispatch({ type: AUTH_LOGIN_SUCCESS, payload: res });
      })
      .catch((error) => {
        dispatch({ type: AUTH_LOGIN_FAILURE, payload: error.code });
      });
  };
};

export const CurrentUserAuth = (response) => {
  return {
    type: CURRENT_USER_DATA,
    payload: response,
  };
};

export const UserChangedAuth = (userinfo) => {
  return {
    type: USER_STATE_CHANGED,
    payload: userinfo,
  };
};
