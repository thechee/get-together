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
        <h4>Hosted by: {group?.Organizer?.firstName} {group?.Organizer?.lastName}</h4>
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
              {/* <div className="event-icons">
                <i className="fa-regular fa-clock"></i>
                <i className="fa-solid fa-dollar-sign"></i>
                <i className="fa-solid fa-map-pin"></i>
              </div>
              <div className='event-stats-headers'>
                <div>
                  <p><span>START</span></p>
                  <p><span>END</span></p>
                </div>
                <span>{event?.price !== 0 ? event?.price : "FREE"}</span>                
                <span>{event?.type}</span>
              </div>
              <div className='event-stats-stats'>
                <p> {startingDate} {'<'}{startingTime}{'>'}</p>
                <p> {endingDate} {'<'}{endingTime}{'>'}</p>
              </div>
              <div className='event-delete-div'>
                {isUserOwner &&  <OpenModalButton
                  buttonText="Delete"
                  modalComponent={<DeleteEventModal event={ event }/>}
                />}
              </div> */}

              <div className='times'>
                <div className='icon-div'>
                  <i className="fa-regular fa-clock"></i>
                </div>
                <div className='times-headers'>
                  <p><span>START</span></p>
                  <p><span>END</span></p>
                </div>
                <div className='event-stats-stats'>
                  <p>{startingDate} · {'<'}{startingTime}{'>'}</p>
                  <p>{endingDate} · {'<'}{endingTime}{'>'}</p>
                </div>
              </div>

              <div className='event-price'>
              <div className='icon-div'>
              <i className="fa-solid fa-dollar-sign"></i>
              </div>
                <div className='event-price-stat'>
                  <span>{event?.price !== 0 ? event?.price : "FREE"}</span>  
                </div>
              </div>

              <div className='event-type'>
              <div className='icon-div'>
                <i className="fa-solid fa-map-pin"></i>
              </div>
                <div className='event-type-stat'>
                  <span>{event?.type}</span>
                </div>

              <div className='event-details-user-buttons'>
                {isUserOwner && <button
                onClick={() => alert('Feature Coming Soon...')}
                >Update</button>}
                {isUserOwner &&  <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<DeleteEventModal event={ event }/>}
                />}
              </div>

              </div>
            </div>
          </div>
        </div>     
        <div className='event-description'>
          <h2>Description</h2>
          <p>
            {event?.description}
          </p>
        </div>
    </section>
    </>
  );
}

export default EventDetails;