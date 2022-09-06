import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { BusyIndicator, Navbar } from '../../components';
import useUserContext from '../../context/userContext';
import { auth, db } from '../../services/firebase.config';
import useAuth from '../../services/useAuth';

const Home = () => {
  useAuth();
  const { setUsername, setReferralLink, username } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const getUserData = useCallback(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        getDoc(docRef).then((snapshot) => {
          setUsername(() => snapshot.data().username);
          setReferralLink(() => snapshot.data().referral_link);
          setIsLoading(false);
        });
      }
    });
  }, [username]);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Navbar />
      <section className='page'>
        {isLoading && <BusyIndicator />}
        {!isLoading && (
          <>
            <div>Welcome, {username}</div>
          </>
        )}
      </section>
    </>
  );
};

export default Home;
