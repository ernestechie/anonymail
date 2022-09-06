import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase.config';

const register = async (email, password, username) => {
  createUserWithEmailAndPassword(auth, email, password).then((credential) => {
    setDoc(doc(db, 'users', credential.user.uid), {
      email,
      messages: [],
      referral_link: `http:localhost:3000/send/${username}`,
      timeStamp: serverTimestamp(),
      username,
    });
  });
};

export default register;
