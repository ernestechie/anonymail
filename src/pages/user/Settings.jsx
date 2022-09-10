import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
          setUsername(doc.data().username);
          setEmail(doc.data().email);
          setIsLoading(false);
        });
      }
    });
  }, []);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  const toggleChangePassword = () => {};
  const toggleChangeEmail = () => {};
  const toggleChangeUsername = () => {};

  return (
    <>
      <Navbar />
      {isLoading && <BusyIndicator />}
      <section className='page settings h-screen text-white text-center py-12'>
        <div className='max-w-[400px] m-auto uppercase'>
          <h1 className='mb-4 font-black text-4xl'>SETTINGS</h1>
          <h1 className='text-lg font-bold my-2'>{username}'s Account</h1>
          <h1 className='text-lg font-bold my-2 mb-8'>Email: {email}</h1>
          <button
            className='my-1 bg-gray-800 text-white p-3 w-full rounded-2xl'
            onClick={toggleChangeUsername}
          >
            Change Username
          </button>
          <button
            className='my-1 bg-gray-800 text-white p-3 w-full rounded-2xl'
            onClick={toggleChangeEmail}
          >
            Change Email
          </button>
          <button
            className='my-1 bg-gray-800 text-white p-3 w-full rounded-2xl'
            onClick={toggleChangePassword}
          >
            Change Password
          </button>
          <button
            className='my-1 bg-gray-800 text-white p-3 w-full rounded-2xl'
            onClick={logoutHandler}
          >
            Contact Developer
          </button>
          <div className='w-full h-[2px] my-4 bg-purple-600'></div>
          <button
            className='mt-4 bg-red-600 text-white p-3 uppercase w-full rounded-full'
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </section>
    </>
  );
};

export default Settings;
