// Firebase initialization (ES Modules via CDN).
// NOTE: Keep these exact CDN URLs in a static site (no bundler).

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
// (Optional) Analytics, only if you plan to use it
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";

export const firebaseConfig = {
  apiKey: "AIzaSyCI1EL8iFVJnOWbd58Bq5JrJg_IgZuCvA0",
  authDomain: "mandaleventall.firebaseapp.com",
  projectId: "mandaleventall",
  storageBucket: "mandaleventall.appspot.com", // ✅ IMPORTANT
  messagingSenderId: "900190130114",
  appId: "1:900190130114:web:bc7d9e2283b3ac57bc505b",
  measurementId: "G-2BBZZNRS88" // optional
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Simple readiness flag used by pages
export const firebaseReady = !!firebaseConfig?.projectId;

// (Optional) Enable if you really need Analytics
// export const analytics = getAnalytics(app);
