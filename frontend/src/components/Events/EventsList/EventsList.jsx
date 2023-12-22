import EventsListItem from '../EventsListItem';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './EventsList.css'

const EventsList = () => {
  const eventsObj = useSelector(state => state.events)
  const events = Object.values(eventsObj)
  
  return (
    <div className='events-list-page'>
      <section>
        <div className='page-links'>
          <NavLink to='/events'>Events</NavLink>
          <NavLink to='/groups'>Groups</NavLink>
        </div>
        <div>
          <span>Events in Meetup</span>
        </div>
      </section>
      <section>
        <ul className='events-list'>
          {events?.map(event => (
            <EventsListItem 
              event={event}
              key={event.id}
            />
          ))}
        </ul>
      </section>

    </div>
  );
}

export default EventsList;