import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const analyticsPromise: Promise<Analytics | null> = isSupported().then((yes) =>
  yes ? getAnalytics(app) : null
);
