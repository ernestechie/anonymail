import {
  onAuthStateChanged,
  signOut,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { HiLockClosed, HiOutlineMail, HiUser } from 'react-icons/hi';
import { RiLogoutBoxRFill, RiTwitterFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BusyIndicator, Navbar } from '../../components';
import { auth, db } from '../../services/firebase.config';
import useAuth from '../../services/useAuth';
import './Page.css';

const Settings = () => {
  useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState([]);
  const [username, setUsername] = useState([]);

  const [newUsername, setNewUsername] = useState('');
  const [usernameContainer, setUsernameContainer] = useState(false);

  const [newEmail, setNewEmail] = useState('');
  const [emailContainer, setEmailContainer] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [passwordContainer, setPasswordContainer] = useState(false);

  const logoutHandler = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const getUserDetails = useCallback(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(true);

        onSnapshot(doc(db, 'users', user.uid), (doc) => {
          setIsLoading(false);
          setUsername(doc.data().username);
          setEmail(doc.data().email);
        });
      }
    });
  }, []);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  const userRef = doc(db, 'users', auth.currentUser.uid);
  const toggleChangeUsername = () => setUsernameContainer((prev) => !prev);
  const usernameInputHandler = (e) =>
    setNewUsername(e.target.value.toLowerCase());

  const changeUsername = () => {
    if (newUsername.trim().length > 0) {
      getDoc(userRef)
        .then((doc) => {
          updateDoc(userRef, {
            ...doc.data(),
            username: newUsername,
            referral_link: `https://anonymail.netlify.app/send/${newUsername}`,
          }).then(() => {
            toast.success('😉 Username changed', {
              hideProgressBar: true,
              autoClose: 2000,
            });
            setNewUsername('');
            setUsernameContainer(false);
          });
        })
        .catch((error) => {
          toast.error(error);
        });
    } else {
      toast.error('👤 Username cannot be blank', {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  const toggleChangeEmail = () => setEmailContainer((prev) => !prev);
  const emailInputHandler = (e) => setNewEmail(e.target.value);
  const changeEmail = () => {
    if (newEmail.trim().length > 0) {
      setIsLoading(true);
      updateEmail(auth.currentUser, newEmail)
        .then(() => {
          getDoc(userRef).then((doc) => {
            updateDoc(userRef, {
              ...doc.data(),
              email: newEmail,
            }).then(() => {
              toast.success('😊 Email changed', {
                hideProgressBar: true,
                autoClose: 2000,
              });
              setNewEmail('');
              setIsLoading(false);
              setEmailContainer(false);
            });
          });
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(`Cannot perform action. Try again later`, {
            autoClose: 2000,
            hideProgressBar: true,
          });
        });
    } else {
      toast.error('📩 Email cannot be blank', {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  const toggleChangePassword = () => setPasswordContainer((prev) => !prev);
  const passwordInputHandler = (e) => setNewPassword(e.target.value);
  const changePassword = (e) => {
    if (newPassword.length > 0) {
      setIsLoading(true);
      updatePassword(auth.currentUser, newPassword)
        .then(() => {
          toast.success('😊 Password Changed', {
            hideProgressBar: true,
            autoClose: 2000,
          });
          setNewEmail('');
          setIsLoading(false);
          setPasswordContainer(false);
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(`${error.code}`, {
            autoClose: 2000,
            hideProgressBar: true,
          });
        });
    } else {
      toast.error('🔒 Password cannot be empty', {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <>
      <Navbar />
      {isLoading && <BusyIndicator />}
      <ToastContainer />
      <section className='page settings text-white text-center py-12'>
        <div className='max-w-[400px] m-auto'>
          <h1 className='mb-4 font-black text-4xl uppercase'>SETTINGS</h1>
          <h1 className='text-lg font-bold my-2 uppercase'>
            {username}'s Account
          </h1>
          <h1 className='text-lg font-bold my-2 mb-8 uppercase'>
            Email: {email}
          </h1>
          <button className='settings-button' onClick={toggleChangeUsername}>
            Change Username <HiUser />
          </button>
          {usernameContainer && (
            <div className='w-full h-36 m-auto p-2'>
              <input
                type='text'
                className='rounded-lg outline-none w-full px-4 py-3 bg-transparent border-2 border-pink-600 text-lg'
                placeholder='Enter New Username'
                value={newUsername}
                onChange={usernameInputHandler}
              />
              <button
                className='text-lg my-4 text-white p-3 w-full rounded-full duration-500 flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700'
                onClick={changeUsername}
              >
                Submit
              </button>
            </div>
          )}
          <button className='settings-button' onClick={toggleChangeEmail}>
            Change Email <HiOutlineMail />
          </button>
          {emailContainer && (
            <div className='w-full h-36 m-auto p-2'>
              <input
                type='text'
                className='rounded-lg outline-none w-full px-4 py-3 bg-transparent border-2 border-pink-600 text-lg'
                placeholder='Enter New Email'
                value={newEmail}
                onChange={emailInputHandler}
              />
              <button
                className='text-lg my-4 text-white p-3 w-full rounded-full duration-500 flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700'
                onClick={changeEmail}
              >
                Submit
              </button>
            </div>
          )}
          <button className='settings-button' onClick={toggleChangePassword}>
            Change Password <HiLockClosed />
          </button>
          {passwordContainer && (
            <div className='w-full h-36 m-auto p-2'>
              <input
                type='text'
                className='rounded-lg outline-none w-full px-4 py-3 bg-transparent border-2 border-pink-600 text-lg'
                placeholder='Enter New Password'
                value={newPassword}
                onChange={passwordInputHandler}
              />
              <button
                className='text-lg my-4 text-white p-3 w-full rounded-full duration-500 flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700'
                onClick={changePassword}
              >
                Submit
              </button>
            </div>
          )}
          <div className='w-full h-[2px] my-8 bg-purple-600'></div>
          <a
            href='https://twitter.com/ernestechie'
            target='_blank'
            rel='noreferrer'
            className='text-lg my-4 text-white p-3 w-full rounded-full duration-500 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700'
          >
            Contact Developer on Twitter <RiTwitterFill />
          </a>
          <button className='settings-button-2' onClick={logoutHandler}>
            Logout <RiLogoutBoxRFill />
          </button>
        </div>
      </section>
    </>
  );
};

export default Settings;
