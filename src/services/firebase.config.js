import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCZHo_rioRzUMiNACzUDXZoC2qaQfmTK9E',
  authDomain: 'anonymail-a662b.firebaseapp.com',
  projectId: 'anonymail-a662b',
  storageBucket: 'anonymail-a662b.appspot.com',
  messagingSenderId: '252010086393',
  appId: '1:252010086393:web:dcf059c1906f01c6170728',
  measurementId: 'G-0Q6RGPV2CF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const usersCol = collection(db, 'users');

export { auth, db, usersCol };
