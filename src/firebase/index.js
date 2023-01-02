import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAjqLguWadsc7XsXkLEouaWcIc8laYZm6U",
  authDomain: "green-destination-map-c2c63.firebaseapp.com",
  projectId: "green-destination-map-c2c63",
  storageBucket: "green-destination-map-c2c63.appspot.com",
  messagingSenderId: "538755561932",
  appId: "1:538755561932:web:943c7b6790aeb4e66b4569"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)