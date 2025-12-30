
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace with your web app's Firebase configuration
const firebaseConfig = {
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
