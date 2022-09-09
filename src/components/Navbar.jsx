import { RiHome5Fill, RiMessage3Fill, RiSettings3Fill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='max-w-[360px] w-full m-auto flex items-center justify-between'>
        <NavLink
          to='/user/home'
          className={(props) =>
            `${
              props.isActive ? 'text-purple-600 font-extrabold' : 'text-white'
            }`
          }
        >
          <span className='nav-item'>
            <RiHome5Fill />
            <p>Home</p>
          </span>
        </NavLink>
        <NavLink
          to='/user/inbox'
          className={(props) =>
            `${
              props.isActive ? 'text-purple-600 font-extrabold' : 'text-white'
            }`
          }
        >
          <span className='nav-item'>
            <RiMessage3Fill />
            <p>Inbox</p>
          </span>
        </NavLink>
        <NavLink
          to='/user/settings'
          className={(props) =>
            `${
              props.isActive ? 'text-purple-600 font-extrabold' : 'text-white'
            }`
          }
        >
          <span className='nav-item'>
            <RiSettings3Fill />
            <p>Settings</p>
          </span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
