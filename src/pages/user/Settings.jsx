import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components';
import useUserContext from '../../context/userContext';
import { auth } from '../../services/firebase.config';
import useAuth from '../../services/useAuth';

const Settings = () => {
  useAuth();
  const navigate = useNavigate();
  const { username, referralLink } = useUserContext();

  const logoutHandler = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <>
      <Navbar />
      <section className='page'>
        <h1>{username}'s Account</h1>
        <h1>
          Refferal limk{' '}
          <span className='p-2 text-white bg-gray-800 rounded-xl'>
            {referralLink}
          </span>
        </h1>
        <button
          className='bg-gray-800 text-white p-4 uppercase'
          onClick={logoutHandler}
        >
          Logout
        </button>
      </section>
    </>
  );
};

export default Settings;
