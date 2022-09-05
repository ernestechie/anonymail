import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

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

// Get a list of cities from your database
export default async function getUsers(db) {
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  console.log(userList);
}

export { auth, db, usersCol };
