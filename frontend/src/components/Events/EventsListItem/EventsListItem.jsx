import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkEventDetails } from '../../../store/events';
import './EventsListItem.css'
import { Link } from 'react-router-dom';

const EventsListItem = ({ event }) => {
  const dispatch = useDispatch()
  const eventDetails = useSelector(state => state.events[event.id])
  // console.log("eventDetails: ", eventDetails)
  // const preview = event.EventImages.find(image => preview === true)
  let preview;
  if (eventDetails.EventImages) {
    preview = eventDetails.EventImages.find(image => image.preview === true)
  }
  useEffect(() => {
    dispatch(thunkEventDetails(event.id))
  }, [dispatch])
  
  // console.log('preview:', preview)
  // console.log('eventImages:', eventDetails.EventImages)
  return (
    <li>
      <Link to={`/events/${event.id}`} event={event}>
        <div className='event-card'>
          <div className='event-card-info'>
            <div className='event-card-img'>
              {preview && <img src={preview.url} alt="" />}
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
      </Link>
    </li>
  )
}

export default EventsListItem;