import EventsListItem from '../EventsListItem';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkLoadEvents } from '../../../store/events';
import { useEffect } from 'react';
import './EventsList.css'

const EventsList = () => {
  const dispatch = useDispatch();
  const eventsObj = useSelector(state => state.events)
  const events = Object.values(eventsObj)

  useEffect(() => {
    if (!events.length) dispatch(thunkLoadEvents())
  }, [dispatch])
  
  return (
    <div className='events-list-page'>
      <section>
        <div>
          <Link to='/events'>Events</Link>
          <Link to='/groups'>Groups</Link>
        </div>
        <div>
          <span>Events in Meetup</span>
        </div>
      </section>
      <section>
        <ul>
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