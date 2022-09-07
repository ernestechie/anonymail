import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { IoCopySharp } from 'react-icons/io5';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        getDoc(docRef)
          .then((snapshot) => {
            setUsername(() => snapshot.data().username);
            setReferralLink(() => snapshot.data().referral_link);
            setMessages(() => [...snapshot.data().messages]);
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
          });
      }
    });
  }, [setUsername, setReferralLink, setMessages]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const copyLinkHandler = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      toast.success('Link Copied', {
        autoClose: 1000,
        hideProgressBar: true,
      });
    });
  };

  return (
    <>
      <Navbar />
      <section className='page'>
        {isLoading && <BusyIndicator />}
        {!isLoading && (
          <div className='max-w-[360px] text-center m-auto py-8'>
            <ToastContainer />
            <h1 className='text-3xl font-bold'>
              Welcome,{' '}
              <span className='uppercase font-black text-purple-700'>
                {username}
              </span>
            </h1>
            <p className='my-4 font-bold text-xl'>Your Link</p>
            <div className='text-white bg-gray-800 p-2 rounded-xl flex items-center justify-center gap-4 w-full'>
              <span>{referralLink}</span>
              <IoCopySharp
                className='cursor-pointer'
                onClick={copyLinkHandler}
              />
            </div>
            <div className='my-2'>
              <p className='text-lg mb-2'>
                <span className='text-purple-700 font-black'>
                  {' '}
                  Copy your link{' '}
                </span>
                and send to your friends
              </p>
              <p className='text-lg'>
                Click
                <span className='text-purple-700 font-black'>
                  {' '}
                  "View Messages"{' '}
                </span>
                or go to
                <span className='text-purple-700 font-black'> "Inbox" </span>
                to see what they have sent to you.
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
