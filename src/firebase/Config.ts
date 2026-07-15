// Ce fichier initialise Firebase pour toute l'application.
// Les valeurs viennent des variables d'environnement (fichier .env).
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvXz3tQ6cLFuegqlWin4DMJTPI84XGcUg",
  authDomain: "loveboard-8aacd.firebaseapp.com",
  projectId: "loveboard-8aacd",
  storageBucket: "loveboard-8aacd.firebasestorage.app",
  messagingSenderId: "611133131611",
  appId: "1:611133131611:web:fce63db73ef4e5ba53687e",
  measurementId: "G-SK92YT92QY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services Firebase utilisés dans le projet.
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;