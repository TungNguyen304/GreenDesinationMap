import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCJG_fxVaq_PPquoo05KaJpxYFlYj_h7uc",
  authDomain: "green-destination-map.firebaseapp.com",
  projectId: "green-destination-map",
  storageBucket: "green-destination-map.appspot.com",
  messagingSenderId: "25188954420",
  appId: "1:25188954420:web:7f291d7e6c6db8b0e5b561"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)