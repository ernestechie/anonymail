import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { IoCopySharp } from 'react-icons/io5';
import { BusyIndicator, Navbar } from '../../components';
import useUserContext from '../../context/userContext';
import { auth, db } from '../../services/firebase.config';
import useAuth from '../../services/useAuth';

const Home = () => {
  useAuth();
  const { setUsername, setReferralLink, username, referralLink, setMessages } =
    useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const getUserData = useCallback(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        getDoc(docRef).then((snapshot) => {
          setUsername(() => snapshot.data().username);
          setReferralLink(() => snapshot.data().referral_link);
          setMessages(() => [...snapshot.data().messages]);
          setIsLoading(false);
        });
      }
    });
  }, [setUsername, setReferralLink, setMessages]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <>
      <Navbar />
      <section className='page'>
        {isLoading && <BusyIndicator />}
        {!isLoading && (
          <div className='max-w-[360px] text-center m-auto py-8'>
            <h1 className='text-3xl font-bold'>
              Welcome,{' '}
              <span className='uppercase font-black text-purple-700'>
                {username}
              </span>
            </h1>
            <p className='my-4 font-bold text-xl'>Your Link</p>
            <div className='text-white bg-gray-800 p-2 rounded-xl flex items-center justify-center gap-4'>
              <span>{referralLink}</span>
              <IoCopySharp className='cursor-pointer' />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
