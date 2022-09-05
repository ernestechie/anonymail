import { useState } from 'react';
import { Link } from 'react-router-dom';
// ? REACT ICONS
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FiLock } from 'react-icons/fi';
import { HiOutlineUser } from 'react-icons/hi';
import { IoMailOutline } from 'react-icons/io5';
// ? REACT TOASTIFY
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ? COMPONENTS
import { BusyIndicator } from '../components';

import getUsers from '../services/firebase.config';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const registerHandler = (e) => {
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
    <div className='page register'>
      <ToastContainer className='font-bold text-gray-900' />
      <div className='form'>
        <h1 className='text-center font-bold text-3xl uppercase'>Register</h1>
        {isLoading && <BusyIndicator />}
        <form className='mt-10'>
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' placeholder='Enter your email' />
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
              placeholder='Password must be 6 digits or more'
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
