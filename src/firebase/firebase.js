import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAtCCD9rKk76I41OqLMhdMyk5bgGP0ZG1Y",
  authDomain: "bloomnest-c099d.firebaseapp.com",
  projectId: "bloomnest-c099d",
  storageBucket: "bloomnest-c099d.firebasestorage.app",
  messagingSenderId: "952375438754",
  appId: "1:952375438754:web:eec2a0e347a2a2dd5e16fb"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)





export default app