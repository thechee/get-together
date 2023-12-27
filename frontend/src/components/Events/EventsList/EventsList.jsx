import EventsListItem from '../EventsListItem';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './EventsList.css'
import { useEffect } from 'react';
import { thunkLoadEvents } from '../../../store/events';

const EventsList = () => {
  const dispatch = useDispatch()
  const eventsObj = useSelector(state => state.events)
  const events = Object.values(eventsObj)
  
  events?.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
  const upcoming = [];
  const past = [];
  const currentTime = new Date().toJSON()

  events.forEach(event => {
    event.startDate < currentTime ?
      past.push(event) :
      upcoming.push(event)
  })

  console.log('currentTime', currentTime)
  console.log("past", past)
  console.log("upcoming", upcoming)

  useEffect(() => {
    dispatch(thunkLoadEvents())
  }, [dispatch])

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
          {upcoming?.map(event => (
            <EventsListItem 
              event={event}
              key={event.id}
            />
          ))}
          <h2>Past Events</h2>
          {past?.map(event => (
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