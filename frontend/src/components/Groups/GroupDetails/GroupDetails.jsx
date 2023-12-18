import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGroupDetails } from '../../../store/groups';
import { thunkLoadGroupEvents } from '../../../store/events';
import { useEffect, useState } from 'react';
import EventsListItem from '../../Events/EventsListItem/';
import './GroupDetails.css'

const GroupDetails = () => {
  const dispatch = useDispatch()
  const { groupId } = useParams()
  const group = useSelector(state => state.groups[groupId])
  const eventsObj = useSelector(state => state.events)
  // const [ past, setPast ] = useState([])
  // const [ upcoming, setUpcoming ] = useState([])
  const events = Object.values(eventsObj);
  const now = new Date()

  // console.log('group:', group)
  // console.log('events', events)
  const upcomingTemp = []
  const pastTemp = []
  events.forEach(event => {
    new Date(event.startDate) < now ?
      pastTemp.push(event) :
      upcomingTemp.push(event)
  })

  useEffect(() => {
    dispatch(thunkGroupDetails(groupId))
    dispatch(thunkLoadGroupEvents(groupId))
    
    // setPast(pastTemp)
    // setUpcoming(upcomingTemp)
    // past, upcoming, 
  }, [dispatch])

  return (
    <div>
      <Link to={'/groups'}>Groups</Link>
      <section className='group-landing'>
        <div className='group-image'>
          <img src={group?.previewImage} alt="" />
        </div>
        <div>
          <div className='group-info'>
            <h1>{group?.name}</h1>
            <h4>{group?.city}, {group?.state}</h4>
            <h4>{group?.events?.length} Events · {group?.private ? "Private" : "Public" }</h4>
            <h4>Organized by {group?.Organizer?.firstName} {group?.Organizer?.lastName}</h4>
          </div>
          <button 
            onClick={e => alert('Feature Coming Soon...')}>
            Join this group
          </button>
        </div>
      </section>
      <section>
        <div>
          <h2>Organizer</h2>
          <h4>{group?.Organizer?.firstName} {group?.Organizer?.lastName}</h4>
          <h2>What we're about</h2>
          <p>{group?.about}</p>
        </div>
      </section>
      {upcomingTemp.length != 0 && <section className='upcoming-events'>
        <h2>Upcoming Events</h2>
        <ul>
          {upcomingTemp.map(event => (
            <EventsListItem key={event.id} event={event}/>
          ))}
        </ul>
      </section>}
      {pastTemp.length != 0 && <section className='past-events'>
        <h2>Past Events</h2>
        <ul>
          {pastTemp.map(event => (
            <EventsListItem key={event.id} event={event}/>
          ))}
        </ul>
      </section>}
    </div>
  );
}

export default GroupDetails;