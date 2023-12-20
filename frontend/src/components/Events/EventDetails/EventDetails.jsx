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
  const groupsObj = useSelector(state => state.groups)
  const [ ueRan, setUeRan ] = useState(false)
  const group = groupsObj[event?.groupId]
  const isUserOwner = group?.organizerId == user.id
  
  useEffect(() => {
    const helper = async () => {
      await dispatch(thunkEventDetails(eventId))
      await dispatch(thunkLoadGroups())
      setUeRan(true)
    }
    if (ueRan) {
      dispatch(thunkGroupDetails(group.id))
    } else {
      helper()
    }
  }, [dispatch, ueRan, eventId, group?.id])

  let preview;
  let eventImagesPreview;

  if (event?.previewImage) {
    preview  = event.previewImage
  } else if (event?.EventImages) {
    eventImagesPreview = event.EventImages.find(image => image.preview === true)
  }

  // console.log(isUserOwner)
  
  return (
    <>
      <div>
        <Link to={'/events'}>Events</Link>
        <h1>{event?.name}</h1>
        <h4>Hosted by {group?.Organizer?.firstName} {group?.Organizer?.lastName}</h4>
      </div>
      <section className='event-detail'>
        <div>
          <div className='event-img'>
            {event?.EventImages && <img src={preview?.url} alt="" />}
          </div>
          <div className='event-stats-section'>
            <div className='event-group-stats'>
              <div>
                {group?.previewImage}
              </div>
              <div>
                <h3>{group?.name}</h3>
                <h5>{group?.private ? "Private" : "Public" }</h5>
              </div>
            </div>
            <div className="event-stats">
              <div className='event-stats-times'>
                <i className="fa-regular fa-clock"></i>
                <div>
                  <p><span>START</span> {event?.startDate}</p>
                  <p><span>END</span> {event?.endDate}</p>
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
      </section>
      <section className='event-description'>
        <h2>Details</h2>
        {event?.description}
      </section>
    </>
  );
}

export default EventDetails;