import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton/';
import LoginFormModal from '../LoginFormModal/';
import SignupFormModal from '../SignupFormModal/';
import './Navigation.css'

function ProfileButton({ user }) {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.thunkLogout());
    navigate('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const profileChevronClassName = "fa-chevron-" + (showMenu ? "up" : "down")

  return (
    <>
      <button onClick={toggleMenu}
        className={'profile-button'}>
          <div className='user-circle'>
            <i className="fas fa-user-circle" />
          </div>
          <i id='profile-chevron' className={`fa-solid ${profileChevronClassName}`}></i> 
      </button>
        {user ? (
      <ul className={ulClassName} id='user-profile-ul' ref={ulRef}>
          <div className='user-dropdown'>
            <li>Hello, {user.firstName}</li>
            <li>{user.email}</li>
            <li className='user-dropdown-links'><Link to='/groups'>View groups</Link></li>
            <li><Link to='/events'>View events</Link></li>
            <li id='logout-li' onClick={logout}>
              <span>Log Out</span>
              {/* <button id='logout-button' onClick={logout}>Log Out</button> */}
            </li>
          </div>
      </ul>
        ) : (
        <ul>
            <li>
              <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </li>
        </ul>
        )}

    </>
  );
}

export default ProfileButton;