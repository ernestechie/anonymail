import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// ? React Icons
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FiLock } from 'react-icons/fi';
import { HiOutlineUser } from 'react-icons/hi';
import { IoMailOutline } from 'react-icons/io5';
// ? React Toastify
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ? Components
import { BusyIndicator } from '../components';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase.config';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        setDoc(doc(db, 'users', credential.user.uid), {
          email,
          messages: [],
          referral_link: `https://anonymail.netlify.app/send/${username}`,
          timeStamp: serverTimestamp(),
          username,
        }).then(() => {
          toast.success('Account created', {
            autoClose: 2000,
          });

          setTimeout(() => {
            setIsLoading(false);
            navigate('/user/home');
          }, 1000);
        });
      })
      .catch((error) => {
        toast.error(error.code, {
          autoClose: 3000,
        });
        setIsLoading(false);
      });
  };

  return (
    <div className='page register'>
      <ToastContainer className='font-bold text-gray-900' />
      <div className='form'>
        <h1 className='text-center font-bold text-3xl uppercase'>Register</h1>
        {isLoading && <BusyIndicator />}
        <form className='mt-10'>
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Enter your email'
              value={email}
              onChange={emailChangeHandler}
            />
            <span className='icon'>
              <IoMailOutline />
            </span>
          </div>
          {/*  */}
          <div className='input-group'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              placeholder='Enter your username'
              value={username}
              onChange={usernameChangeHandler}
            />
            <span className='icon'>
              <HiOutlineUser />
            </span>
          </div>
          {/*  */}
          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              value={password}
              placeholder='Password must be 6 digits or more'
              onChange={passwordChangeHandler}
            />
            <span className='icon'>
              <FiLock />
            </span>
            <span
              className='icon-reverse cursor-pointer'
              onClick={toggleShowPassword}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
          <button
            type='submit'
            className='submit-button'
            onClick={registerHandler}
          >
            REGISTER
          </button>
        </form>
        <div className='mt-2 text-center'>
          <p className='font-medium '>
            Already have an account?{' '}
            <span className='text-purple-700 font-bold'>
              <Link to='/login'> Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
