import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjT2FcPWMVIR6_Ko2mAJbzuQe41U8M7K4",
  authDomain: "mini-blog-gp.firebaseapp.com",
  projectId: "mini-blog-gp",
  storageBucket: "mini-blog-gp.firebasestorage.app",
  messagingSenderId: "799912213545",
  appId: "1:799912213545:web:cb3b330de0f98f752af038",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }
