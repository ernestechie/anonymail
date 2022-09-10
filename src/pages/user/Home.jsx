import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import {
  IoCopySharp,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoWhatsapp,
} from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BusyIndicator, Navbar } from '../../components';
import useUserContext from '../../context/userContext';
import { auth, db } from '../../services/firebase.config';
import useAuth from '../../services/useAuth';

import './Page.css';

import {
  FacebookShareButton,
  InstapaperShareButton,
  WhatsappShareButton,
} from 'react-share';

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
      <section className='page h-screen bg-gray-100 home'>
        {isLoading && <BusyIndicator />}
        {!isLoading && (
          <div className='max-w-[400px] text-center m-auto pt-10'>
            <ToastContainer />
            <h1 className='text-3xl font-black text-white'>
              Welcome,{' '}
              <span className='uppercase font-black text-purple-600'>
                {username}
              </span>
            </h1>
            <p className='my-2 font-bold text-lg'>Your Link</p>
            <div className='text-white bg-gray-800 p-2 rounded-xl flex items-center justify-center gap-4 w-full blurred'>
              <span>{referralLink}</span>
              <IoCopySharp
                className='cursor-pointer'
                onClick={copyLinkHandler}
              />
            </div>
            <div className='my-4'>
              <p className='text-lg mb-2 text-white'>
                <span className='text-purple-600 font-black'>
                  {' '}
                  Copy your link{' '}
                </span>
                and send to your friends.
              </p>
              <p className='text-lg text-white'>
                You can also{' '}
                <span className='font-black'>"Copy your full link"</span> and
                send to them directly
              </p>
              <p className='text-lg text-white'>
                Click
                <span className='text-purple-700 font-black'>
                  {' '}
                  "View Messages"{' '}
                </span>
                or go to
                <span className='text-purple-700 font-black'> "Inbox" </span>
                to see what they sent to you.
              </p>
            </div>
            {/*  */}
            <div className='mt-8'>
              <Link
                to='/user/inbox'
                className='w-full px-4 py-2 my-2 rounded-full text-white flex items-center justify-center gap-2 blurred'
              >
                View messages <FaArrowRight />
              </Link>
              <button
                onClick={() => {
                  navigator.clipboard
                    .writeText(
                      `Send an anonymous message to me 😊❤️ I won't know who sent it 👇🏼👇🏼\n${referralLink}`
                    )
                    .then(() => {
                      toast.success('Link copied', {
                        autoClose: 3000,
                        hideProgressBar: true,
                      });
                    });
                }}
                className='home-share-btn bg-gray-800 cursor-pointer'
              >
                Copy full link
                <IoCopySharp />
              </button>
              <WhatsappShareButton
                title={`Send an anonymous message to me 😊❤️ I won't know who sent it 👇🏼👇🏼`}
                url={referralLink}
                className='home-share-btn bg-green-500'
                style={{
                  background: '#22c55e',
                  paddingBlock: '.5rem',
                  color: '#fff',
                }}
              >
                Share on WhatsApp
                <IoLogoWhatsapp />
              </WhatsappShareButton>
              <FacebookShareButton
                quote={`Send an anonymous message to me 😊❤️ I won't know who sent it 👇🏼👇🏼`}
                url='https://anonymail.netlify.app/send/dxmien'
                className='home-share-btn bg-green-500'
                style={{
                  background: '#1e3a84',
                  paddingBlock: '.5rem',
                  color: '#fff',
                }}
              >
                Share on Facebook
                <IoLogoFacebook />
              </FacebookShareButton>
              <InstapaperShareButton
                title={`Send an anonymous message to me ❤️ I won't know who sent it 👇🏼`}
                url={referralLink}
                description='With AnonyMail, you can receive messages from your friends without knowing who sent them. It is a fun game😉😉 TRY IT NOW!! 😊❤️'
                className='home-share-btn bg-green-500'
                style={{
                  background: '#ef4444',
                  paddingBlock: '.5rem',
                  color: '#fff',
                }}
              >
                Share on Instagram
                <IoLogoInstagram />
              </InstapaperShareButton>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
