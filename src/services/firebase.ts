import { initializeApp, getApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDrYeO9sGtuf4jGz0vNpXTYUD-J3Z24Ca8",
  authDomain: "poll-app-ab304.firebaseapp.com",
  projectId: "poll-app-ab304",
  storageBucket: "poll-app-ab304.appspot.com",
  messagingSenderId: "921531530925",
  appId: "1:921531530925:web:b5c35473251dca674dd024"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth()
const firestore = getFirestore()

export { firebaseConfig, app, auth, firestore }