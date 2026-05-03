import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function initFirebase(): FirebaseApp {
  if (getApps().length > 0) return getApp();

  const requiredFields = ["apiKey", "authDomain", "projectId"] as const;
  for (const field of requiredFields) {
    if (!firebaseConfig[field]) {
      console.warn(`Firebase config missing: ${field}. Some features may be unavailable.`);
    }
  }

  return initializeApp(firebaseConfig);
}

const app: FirebaseApp = initFirebase();
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, auth, db };
