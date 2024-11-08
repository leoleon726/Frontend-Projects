import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBBC_K_zrsFqWr_i63iUlnl6qQhDsAj6B8",
    authDomain: "lehrer-firebase-auth.firebaseapp.com",
    projectId: "lehrer-firebase-auth",
    storageBucket: "lehrer-firebase-auth.appspot.com",
    messagingSenderId: "697098913169",
    appId: "1:697098913169:web:ec6091bf37fa6aeb1f4630",
};

const appLehrer = initializeApp(firebaseConfig);
const db = getFirestore(appLehrer);
export default db;
export const auth = getAuth();