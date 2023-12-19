import { useParams, Link } from 'react-router-dom';
import './EventDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { thunkEventDetails } from '../../../store/events';
import { thunkGroupDetails, thunkLoadGroups } from '../../../store/groups';

const EventDetails = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const event = useSelector(state => state.events[eventId])
  const groupsObj = useSelector(state => state.groups)
  const [ group, setGroup ] = useState({})
  console.log('groupsObj', groupsObj)

  const groups = Object.values(groupsObj)
  console.log("groups:", groups)

  if (JSON.stringify(group) == JSON.stringify({})) {
    setGroup(groups?.find(group => event.Group.id == group.id))
  }

  console.log('event:', event)
  console.log("group:", group)

  useEffect(() => {
    dispatch(thunkEventDetails(eventId))
    dispatch(thunkLoadGroups())
    if (JSON.stringify(group) == JSON.stringify({})) {
      setGroup(dispatch(thunkGroupDetails(group.id)))
    }
  }, [dispatch, group])

  
  return (
    <>
      <div>
        <Link to={'/events'}>Events</Link>
        <h1>{event?.name}</h1>
        <h4>Hosted by {} {}</h4>
      </div>
      <section className='event-detail'>
        <div>
          <div className='event-img'>
            <img src={event?.EventImages[0]} alt="" />
          </div>
          <div className='event-stats-section'>
            <div className='event-group-stats'>
              <div>
                {/* {group.previewImage} */}
              </div>
              <div>
                <h3>{group?.name}</h3>
                <h5>{group?.private ? "Private" : "Public" }</h5>
              </div>
            </div>
            <div className="event-stats">

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EventDetails;