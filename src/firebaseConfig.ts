import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA3jZXuYiTPapiflxebMyg0ez95mAcJbaI",
  authDomain: "kyrgyz-code-project.firebaseapp.com",
  databaseURL: "https://kyrgyz-code-project-default-rtdb.firebaseio.com",
  projectId: "kyrgyz-code-project",
  storageBucket: "kyrgyz-code-project.appspot.com",
  messagingSenderId: "727931390584",
  appId: "1:727931390584:web:44b244a238598b6a933b8d",
  measurementId: "G-VHPB69CCL6",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);
// export { database };
export { database, auth, storage, ref, set, get, update, remove };
