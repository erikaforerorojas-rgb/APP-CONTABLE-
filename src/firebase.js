import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔴 REEMPLAZA ESTO CON TU CONFIG DE FIREBASE
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "creditos-daza",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar base de datos
export const db = getFirestore(app);
