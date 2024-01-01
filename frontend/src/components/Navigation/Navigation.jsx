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
          <img id='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Together_Master_Logo.png/1600px-Together_Master_Logo.png?20181005101630" alt="" />
        </Link>
      </div>

        {
          sessionUser ? 
          <div className='nav-bar-user-links'>
            <Link to={'/groups/new'}
              className='link'>
              Start a new group
            </Link>
            <ProfileButton user={sessionUser} />
          </div> :
          <div className='nav-bar-no-user'> 
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
    </nav>

  );
}

export default Navigation;