import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC4dX-zy-DmvbT2qsabAAc0p0pn2Q-draw",
  authDomain: "fish-catching-9a420.firebaseapp.com",
  databaseURL: "https://fish-catching-9a420-default-rtdb.firebaseio.com",
  projectId: "fish-catching-9a420",
  storageBucket: "fish-catching-9a420.appspot.com",
  messagingSenderId: "135650835526",
  appId: "1:135650835526:web:8f2d52c3f881976b331e47",
  measurementId: "G-GFSES5FDJX",
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
