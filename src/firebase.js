import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAepf_M4EeW7QbXGKVc21Yb4nust240c4c",
  authDomain: "ghost-stories-hub-e372e.firebaseapp.com",
  databaseURL: "https://ghost-stories-hub-e372e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ghost-stories-hub-e372e",
  storageBucket: "ghost-stories-hub-e372e.firebasestorage.app",
  messagingSenderId: "387198854399",
  appId: "1:387198854399:web:cc70ebb7d6a19cc15e18ca"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);