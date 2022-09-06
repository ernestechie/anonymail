import { useState } from 'react';
// ? REACT ICONS
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FiLock } from 'react-icons/fi';
import { IoMailOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
// ? REACT TOASTIFY
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BusyIndicator } from '../components';

import login from '../services/login';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    login(email, password)
      .then(() => {
        setTimeout(() => {
          setIsLoading(false);
          setEmail('');
          setPassword('');
          navigate('/user/home');
        }, 1000);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.code, {
          autoClose: 2000,
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
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Email'
              onChange={emailChangeHandler}
              value={email}
            />
            <span className='icon'>
              <IoMailOutline />
            </span>
          </div>
          {/*  */}
          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              placeholder='Password'
              onChange={passwordChangeHandler}
              value={password}
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
