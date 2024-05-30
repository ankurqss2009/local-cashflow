import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA-PxzuwGPbYizC7KbQvGLLaUZYbpIUkgY",
  authDomain: "cashflow-35e23.firebaseapp.com",
  projectId: "cashflow-35e23",
  storageBucket: "cashflow-35e23.appspot.com",
  messagingSenderId: "38254266640",
  appId: "1:38254266640:web:d4a4dbda01cf9f771cfd95",
  measurementId: "G-CWGE19V6QW",
};

export class FirebaseService {
  static app;
  static database;
  static auth;

  static init = () => {
    const app = initializeApp(firebaseConfig);
    FirebaseService.app = app;
    FirebaseService.auth = getAuth();
    FirebaseService.database = getDatabase();
  };
}
