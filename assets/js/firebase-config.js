// ==========================================================================
// PartyRooms — Configuración de Firebase
// ==========================================================================
// 1. Ve a Firebase Console → Configuración del proyecto → Tus apps → Web.
// 2. Copia el objeto "firebaseConfig" que te da Firebase y pégalo abajo,
//    reemplazando los valores de ejemplo.
// 3. Guarda este archivo. No necesitas tocar nada más.
//
// Esta llave es PÚBLICA por diseño (Firebase la protege con las "Reglas de
// seguridad" de Firestore, no con que esté oculta). Es seguro subirla a GitHub.
// ==========================================================================

const firebaseConfig = {
  apiKey: "AIzaSyAa8HL1lJhKwPwmAUJanBYfYOVSmXV9I2Q",
  authDomain: "partyrooms-7bf57.firebaseapp.com",
  projectId: "partyrooms-7bf57",
  storageBucket: "partyrooms-7bf57.firebasestorage.app",
  messagingSenderId: "647631577082",
  appId: "1:647631577082:web:12a0e327095b0eb34b4e43",
  measurementId: "G-9DT8X1S3GG"
};

// Inicialización (usa Firebase v10 vía CDN, cargado como módulo en cada página)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
