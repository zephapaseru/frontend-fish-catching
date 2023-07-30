import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFDB2H2Cv9pj-ihc7YTBDyEDZeMJ7Oygs",
  authDomain: "capatu-d79d1.firebaseapp.com",
  databaseURL: "https://capatu-d79d1.firebaseio.com",
  projectId: "capatu-d79d1",
  storageBucket: "capatu-d79d1.appspot.com",
  messagingSenderId: "903209175026",
  appId: "1:903209175026:web:a9c426e764c6f04c03cd6b",
  measurementId: "G-K27F1QQLPV",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
