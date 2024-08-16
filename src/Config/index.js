// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCrnH-zzhAg6kM0hZ9tN_Ox7tCnhUfUlo",
  authDomain: "book-finder-72bd5.firebaseapp.com",
  projectId: "book-finder-72bd5",
  storageBucket: "book-finder-72bd5.appspot.com",
  messagingSenderId: "983108954638",
  appId: "1:983108954638:web:063d3f58611a4ec8d2ea5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth=getAuth(app);

export { db ,auth};