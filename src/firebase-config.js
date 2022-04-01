import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqOZgyPv51wCMyrAVNUienozjp_7CdFiQ",
  authDomain: "fir-tut-7c920.firebaseapp.com",
  databaseURL: "https://fir-tut-7c920-default-rtdb.firebaseio.com",
  projectId: "fir-tut-7c920",
  storageBucket: "fir-tut-7c920.appspot.com",
  messagingSenderId: "109106755222",
  appId: "1:109106755222:web:d13e090e391fb5efad34b7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
