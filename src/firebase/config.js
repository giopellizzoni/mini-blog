import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.MINIBLOG_API_KEY,
  authDomain: process.env.MINIBLOG_AUTH_DOMAIN,
  projectId: process.env.MINIBLOG_PROJECT_ID,
  storageBucket: process.env.MINIBLOG_STORAGE_BUCKET,
  messagingSenderId: process.env.MINIBLOG_MESSAGE_SENDER_ID,
  appId: process.env.MINIBLOG_APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
