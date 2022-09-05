import { useState } from 'react';
// ? REACT ICONS
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FiLock } from 'react-icons/fi';
import { HiOutlineUser } from 'react-icons/hi';
import { Link } from 'react-router-dom';
// ? REACT TOASTIFY
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BusyIndicator } from '../components';

import getUsers from '../services/firebase.config';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    getUsers().then(() => {
      setIsLoading(false);
      toast('Button was clicked', {
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false,
      });
    });
  };

  return (
    <div className='page login'>
      <ToastContainer className='font-bold text-gray-900' />
      <div className='form'>
        <h1 className='text-center font-bold text-3xl uppercase'>LOGIN</h1>
        {isLoading && <BusyIndicator />}
        <form className='mt-10'>
          <div className='input-group'>
            <label htmlFor='username'>Username</label>
            <input type='text' id='username' placeholder='Username' />
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
              placeholder='Password'
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
            onClick={loginHandler}
          >
            LOGIN
          </button>
        </form>
        <div className='mt-2 text-center'>
          <p className='font-medium'>
            New to AnonyMail?{' '}
            <span className='text-purple-700 font-bold'>
              <Link to='/register'> Register</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
