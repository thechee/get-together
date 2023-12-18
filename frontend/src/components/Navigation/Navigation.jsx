// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton'
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
import ProfileButton from './ProfileButton'
import './Navigation.css';
/*{isLoaded} belongs in Navigation parameter*/
function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <nav>
      <div className='nav-bar-logo'>
        <img src="logo.com" alt="" />
      </div>
      <div className='nav-bar-user-links'>
        {
          sessionUser ? 
          <ProfileButton user={sessionUser} /> :
          <div> 
            <OpenModalButton
              buttonText="Log In"
              modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
            />
          </div>
        }
      </div>
      
    </nav>

  );
}

export default Navigation;