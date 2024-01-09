import './Home.css'
import highfive from '/high-five.png'
import threepeople from '/three-people.png'
import ticket from '/ticket.png'
import { HomeLinkCard } from './HomeLinkCard';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector(state => state.session.user)

  const activeLink = user ? '' : 'disabled'

  return (
    <div className='content'>
      <div className='landing'>
        <div className='landing-info'>
          <h1>The people platform—Where interests become friendships</h1>
          <p>Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of people who share it on Get Together. Events are happening every day—sign up to join the fun.</p>
        </div>
        <div className='landing-img'>
          <img src="https://v.fastcdn.co/t/f91f856b/8a35655b/1687613214-55703691-1306x600-Online-event.png" alt="" />
        </div>
      </div>
      <div className='lower-landing'>
        <div className='how-works'>
          <h2>How Get Together works</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem provident quis, ut blanditiis facere, architecto doloremque fuga, veniam a modi error iure!</p>
        </div>
        <div className='cards'>
          <HomeLinkCard image={highfive} alt={'drawing of hands high fiving'} path={`groups`} linkText={`See all groups`} />
          <HomeLinkCard image={ticket} alt={'drawing of an admissions ticket'} path={`events`} linkText={`Find an event`} />
          <HomeLinkCard activeLink={activeLink} image={threepeople} alt={'drawing of three stylized people icons'} path={`groups/new`} linkText={`Start a new group`} />
        </div>
      </div>
      {!user && <div className='home-join-btn-div'>
        <OpenModalButton
          buttonText="Join Get Together"
          modalComponent={<SignupFormModal />}
        />
      </div>}
    </div>

  )
}

export default Home;