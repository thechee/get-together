import './Home.css'
import { HomeLinkCard } from './HomeLinkCard';

const Home = () => {
  return (
    <div className='content'>
      <div className='landing'>
        <div className='landing-info'>
          <h1>The people platform—Where interests become friendships</h1>
          <p>Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of people who share it on Meetup. Events are happening every day—sign up to join the fun.</p>
        </div>
        <div className='landing-img'>
          <img src="" alt="" />
        </div>
      </div>
      <div className='lower-landing'>
        <div className='how-works'>
          <h3>How Meetup works</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem provident quis, ut blanditiis facere, architecto doloremque fuga, veniam a modi error iure! Dolorem at modi quidem facere quae placeat voluptatum.</p>
        </div>
        <div className='cards'>
          <HomeLinkCard image={`img.com`} path={`groups`} linkText={`See all groups`} />
          <HomeLinkCard image={`img.com`} path={`events`} linkText={`Find an event`} />
          <HomeLinkCard image={`img.com`} path={`groups/new`} linkText={`Start a new group`} />
        </div>
      </div>

    </div>

  )
}

export default Home;