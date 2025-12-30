import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3GTn3_oowpt2GRnkwtN6g0DiRdgs1gEo",
  authDomain: "ticked-off-ui.firebaseapp.com",
  projectId: "ticked-off-ui",
  storageBucket: "ticked-off-ui.appspot.com",
  messagingSenderId: "746599190136",
  appId: "1:746599190136:web:9a71c0f533d010f33fa78d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
