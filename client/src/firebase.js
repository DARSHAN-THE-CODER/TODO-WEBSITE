import firebase from "firebase/app"
import "firebase/auth"
import env from "react-dotenv";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAptnZfms5-I_9_NnytIEGqVoXWdtL46RM",
  authDomain: "todo-app-7dfe8.firebaseapp.com",
  databaseURL: "https://todo-app-7dfe8-default-rtdb.firebaseio.com",
  projectId: "todo-app-7dfe8",
  storageBucket: "todo-app-7dfe8.appspot.com",
  messagingSenderId: "353606057102",
  appId: "1:353606057102:web:e32f65af78678de5e25ddf",
  measurementId: "G-V20C969R2C"
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_MEASUREMENT_ID
})
export const auth = app.auth()
export default app

