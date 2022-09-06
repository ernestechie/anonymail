import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from './firebase.config';

const login = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password).then((credential) => {
    getDoc(doc(db, 'users', credential.user.uid));
  });
};

export default login;
