import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCul4C46dZJnCKCYJy9-iu1tnRoI6GBTPc",
  authDomain: "poetcam-9f04e.firebaseapp.com",
  projectId: "poetcam-9f04e",
  storageBucket: "poetcam-9f04e.firebasestorage.app",
  messagingSenderId: "892690944790",
  appId: "1:892690944790:web:2f31bb0131ab697ef6f637",
  measurementId: "G-GC16HW5C8Z",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const analyticsPromise = isSupported().then((yes) => (yes ? getAnalytics(app) : null));
