// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton'
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
import ProfileButton from './ProfileButton'
import { Link } from 'react-router-dom'
import './Navigation.css';

/*{isLoaded} belongs in Navigation parameter*/
function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <nav>
      <div className='nav-bar-logo'>
        <Link to='/'>
          <img id='logo' src="../../public/Together_Master_Logo.png" alt="" />
        </Link>
      </div>
      <div className='nav-bar-user-links'>
        {
          sessionUser ? 
          <>
          <Link to={'/groups/new'}
            className='link'>
            Start a new group
          </Link>
          <ProfileButton user={sessionUser} 
          />
          <i className="fa-solid fa-chevron-down"></i> 
          </> :
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