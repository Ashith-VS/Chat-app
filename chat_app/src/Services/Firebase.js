import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCepiPKEtKe8R5xKNMdj7yMXJPpfgDOcVY",
  authDomain: "chat-app-15410.firebaseapp.com",
  databaseURL: "https://chat-app-15410-default-rtdb.firebaseio.com",
  projectId: "chat-app-15410",
  storageBucket: "chat-app-15410.appspot.com",
  messagingSenderId: "656732255827",
  appId: "1:656732255827:web:f4a48648b3e9c3aa0f78a6",
  measurementId: "G-GHZEWKB8YP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
