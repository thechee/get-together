import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { thunkEventDetails } from '../../../store/events';
import './EventsListItem.css'
import { Link } from 'react-router-dom';

const EventsListItem = ({ event }) => {
  const dispatch = useDispatch()
  let preview;
  let eventImagesPreview;
  if (event.previewImage) {
    preview  = event.previewImage
  } else if (event.EventImages) {
    eventImagesPreview = event.EventImages.find(image => image.preview === true)
  }

  useEffect(() => {
    console.log('useEffect firing in EventListItem')
    if (event.id) dispatch(thunkEventDetails(event.id))
  }, [dispatch, event.id])

  let date;
  let time;

  if (event && !event.message) {
    date = event.startDate.split(' ')[0]
    time = event.startDate.split(' ')[1]
    time = time?.slice(0, 5)
  }
 
  
  return (
      <Link to={`/events/${event.id}`} event={event}>
      <li>
        <div className='events-list-item'>
          <div className='event-card-img'>
            {preview && <img className='events-list-image' src={preview} alt="" />}
            {eventImagesPreview && <img className='events-list-image' src={eventImagesPreview.url} alt="" />}
          </div>
          <div className='events-list-info'>
            <h3>{date} · {'<'}{time}{'>'}</h3>
            <h2>{event.name}</h2>
            {event.Venue && <h4>{event.Venue?.city}, {event.Venue?.state}</h4>}
          </div>
        </div>
        <div className='event-card-about'>
          <p>{event.description}</p>
        </div>
      </li>
    </Link>
  )
}

export default EventsListItem;