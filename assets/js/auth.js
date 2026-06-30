// ==========================================================================
// PartyRooms — Autenticación
// ==========================================================================
import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const googleProvider = new GoogleAuthProvider();

// --------------------------------------------------------------------------
// Crea el documento de perfil en Firestore la primera vez que alguien entra.
// Esto es lo que guarda monedas, nivel, avatar, etc. — separado del login.
// --------------------------------------------------------------------------
async function ensureUserProfile(user) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      nombre: user.displayName || user.email.split("@")[0],
      correo: user.email,
      avatar: user.photoURL || null,
      rol: "usuario",
      nivel: 1,
      experiencia: 0,
      coins: 100,
      gems: 0,
      amigos: [],
      inventario: [],
      creadoEn: serverTimestamp()
    });
  }
}

// --------------------------------------------------------------------------
// Registro con correo y contraseña
// --------------------------------------------------------------------------
export async function registrarConCorreo(nombre, correo, password) {
  const cred = await createUserWithEmailAndPassword(auth, correo, password);
  await updateProfile(cred.user, { displayName: nombre });
  await ensureUserProfile(cred.user);
  return cred.user;
}

// --------------------------------------------------------------------------
// Login con correo y contraseña
// --------------------------------------------------------------------------
export async function iniciarSesionConCorreo(correo, password) {
  const cred = await signInWithEmailAndPassword(auth, correo, password);
  await ensureUserProfile(cred.user);
  return cred.user;
}

// --------------------------------------------------------------------------
// Login con Google
// --------------------------------------------------------------------------
export async function iniciarSesionConGoogle() {
  const cred = await signInWithPopup(auth, googleProvider);
  await ensureUserProfile(cred.user);
  return cred.user;
}

// --------------------------------------------------------------------------
// Cerrar sesión
// --------------------------------------------------------------------------
export async function cerrarSesion() {
  await signOut(auth);
}

// --------------------------------------------------------------------------
// Observador global: úsalo en cualquier página para saber si hay sesión activa
// --------------------------------------------------------------------------
export function observarSesion(callback) {
  return onAuthStateChanged(auth, callback);
}

// --------------------------------------------------------------------------
// Traductor de errores de Firebase a mensajes en español, legibles
// --------------------------------------------------------------------------
export function traducirErrorAuth(error) {
  const codigo = error.code || "";
  const mapa = {
    "auth/email-already-in-use": "Ese correo ya tiene una cuenta. Intenta iniciar sesión.",
    "auth/invalid-email": "El correo no es válido.",
    "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
    "auth/user-not-found": "No existe una cuenta con ese correo.",
    "auth/wrong-password": "Contraseña incorrecta.",
    "auth/invalid-credential": "Correo o contraseña incorrectos.",
    "auth/popup-closed-by-user": "Cerraste la ventana antes de terminar."
  };
  return mapa[codigo] || "Algo salió mal. Intenta de nuevo.";
}
