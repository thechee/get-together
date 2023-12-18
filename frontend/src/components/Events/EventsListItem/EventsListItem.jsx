import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkEventDetails } from '../../../store/events';
import './EventsListItem.css'

const EventsListItem = ({ event }) => {
  const dispatch = useDispatch()
  const eventDetails = useSelector(state => state.events[event.id])
  console.log(eventDetails)

  useEffect(() => {
    dispatch(thunkEventDetails(event.id))
  }, [dispatch])

  return (
    <div className='event-card'>
      <div className='event-card-info'>
        <div className='event-card-img'>
          {event.previewImage}
        </div>
        <div className='event-card-stats'>
          <h4>{event.startTime}</h4>
          <h3>{event.name}</h3>
          <h5>{event.Venue.city}, {event.Venue.state}</h5>
        </div>
      </div>
      <div className='event-card-about'>
        <p>{event.description}</p>
      </div>
    </div>
  )
}

export default EventsListItem;