import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGa9-VXOotA47mY1EIBCPPan7Npz5-LQ0",
  authDomain: "vihar-enterprise.firebaseapp.com",
  projectId: "vihar-enterprise",
  storageBucket: "vihar-enterprise.firebasestorage.app",
  messagingSenderId: "1020787252700",
  appId: "1:1020787252700:web:69cb2b9790bcf3224ac319",
  measurementId: "G-Q483GXCPPQ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);