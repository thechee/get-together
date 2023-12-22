import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { thunkEventDetails } from '../../../store/events';
import { thunkGroupDetails, thunkLoadGroups } from '../../../store/groups';
import OpenModalButton from '../../OpenModalButton';
import DeleteEventModal from '../DeleteEventModal'
import './EventDetails.css';

const EventDetails = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const user = useSelector(state => state.session.user)
  const event = useSelector(state => state.events[eventId])
  const group = useSelector(state => state.groups[event?.groupId])
  const [ ueRan, setUeRan ] = useState(false)
  const isUserOwner = group?.organizerId == user?.id

  
  useEffect(() => {
    // do I have all the data a need?
      // if not, run the thunks
      // check if the event has the detail key yet or not
    const helper = async () => {
      await dispatch(thunkEventDetails(eventId))
      await dispatch(thunkLoadGroups())
      setUeRan(true)
    }
    if (ueRan) {
      dispatch(thunkGroupDetails(group?.id))
    } else {
      helper()
    }
  }, [dispatch, ueRan, eventId, group?.id])


  let eventImagesPreview;
  if (event?.previewImage) {
    eventImagesPreview  = event.previewImage
  } else if (event?.EventImages) {
    eventImagesPreview = event?.EventImages?.find(image => image?.preview === true)?.url
  }

  let groupPreview;
  if (group?.GroupImages) {
    groupPreview = group?.GroupImages?.find(image => image.preview === true)?.url
  } else if (group?.previewImage) {
    groupPreview = group.previewImage
  }

  let startingDate;
  let startingTime;
  let endingDate;
  let endingTime;

  if (event) {
    const starting = event.startDate.split(' ')
    startingDate = starting[0]
    startingTime = starting[1]
    startingTime = startingTime.slice(0, 5)
    const ending = event.endDate.split(' ')
    endingDate = ending[0]
    endingTime = ending[1]
    endingTime = endingTime.slice(0, 5)
  }

  return (
    <>
      <div className='event-heading'>
      <span>{'<'}</span><Link id='back-to-events' to={'/events'}>Events</Link>
        <h1>{event?.name}</h1>
        <h4>Hosted by {group?.Organizer?.firstName} {group?.Organizer?.lastName}</h4>
      </div>
      <section className='event-section'>
        <div className='event-detail'>
          <div className='event-img'>
            {event?.EventImages && <img src={eventImagesPreview} alt="" />}
          </div>
          <div className='event-stats-section'>
            <div className='event-group-card'>
              <div className='event-group-image'>
                {group?.GroupImages && <img src={groupPreview}/>}
              </div>
              <div className='event-group-info'>
                <h3>{group?.name}</h3>
                <h4>{group?.private ? "Private" : "Public" }</h4>
              </div>
            </div>
            <div className="event-stats">
              <div className='event-stats-times'>
                <i className="fa-regular fa-clock"></i>
                <div>
                  <p><span>START</span> {startingDate} {startingTime}</p>
                  <p><span>END</span> {endingDate} {endingTime}</p>
                </div>
              </div>
              <div className='event-stats-cost'>
                <i className="fa-solid fa-dollar-sign"></i> <span>{event?.price !== 0 ? event?.price : "FREE"}</span>
              </div>
              <div className='event-stats-type'>
                <i className="fa-solid fa-map-pin"></i><span>{event?.type}</span>
              </div>
              {isUserOwner &&  <OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteEventModal event={ event }/>}
              />}
            </div>
          </div>
        </div>     
        <div className='event-description'>
          <h2>Details</h2>
          {event?.description}
        </div>
    </section>
    </>
  );
}

export default EventDetails;