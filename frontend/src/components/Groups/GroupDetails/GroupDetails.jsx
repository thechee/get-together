import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGroupDetails } from '../../../store/groups';
import { thunkLoadGroupEvents } from '../../../store/events';
import { useEffect } from 'react';
import EventsListItem from '../../Events/EventsListItem/';
import OpenModalButton from '../../OpenModalButton';
import DeleteGroupModal from '../DeleteGroupModal'
import './GroupDetails.css'

const GroupDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { groupId } = useParams()
  const user = useSelector(state => state.session.user)
  const group = useSelector(state => state.groups[groupId])
  const eventsObj = useSelector(state => state.events)
  let events = Object.values(eventsObj)
  const now = new Date()

  events = events.filter(event => event.groupId == groupId)

  const upcoming = []
  const past = []
  events?.forEach(event => {
    new Date(event.startDate) < now ?
      past.push(event) :
      upcoming.push(event)
  })

  useEffect(() => {
    dispatch(thunkGroupDetails(groupId))
    dispatch(thunkLoadGroupEvents(groupId))
  }, [dispatch, groupId])

  const groupPreviewImage = group?.GroupImages?.find(image => image.preview == true)
  // console.log(groupPreviewImage)

  return (
    <div>
      <Link to={'/groups'}>Groups</Link>
      <section className='group-landing'>
        <div className='group-image'>
          <img src={groupPreviewImage?.url} alt="" />
        </div>
        <div>
          <div className='group-info'>
            <h1>{group?.name}</h1>
            <h4>{group?.city}, {group?.state}</h4>
            <h4>{events?.length ? events?.length : 0} events · {group?.private ? "Private" : "Public" }</h4>
            <h4>Organized by {group?.Organizer?.firstName} {group?.Organizer?.lastName}</h4>
          </div>
          {user.id !== group?.organizerId && <button 
            onClick={() => alert('Feature Coming Soon...')}>
            Join this group
          </button>}
          {user.id == group?.organizerId && <button 
            onClick={() => navigate(`/groups/${groupId}/events/new`)}>
            Create event
          </button>}
          {user.id == group?.organizerId && <button 
            onClick={() => navigate(`/groups/${groupId}/edit`)}>
            Update
          </button>}
          {user.id == group?.organizerId && 
            <OpenModalButton
              buttonText="Delete"
              modalComponent={<DeleteGroupModal groupId={group?.id}/>}
            />
            }
        </div>
      </section>
      <section>
        <div>
          <h2>Organizer</h2>
          <h4>{group?.Organizer?.firstName} {group?.Organizer?.lastName}</h4>
          <h2>What we&apos;re about</h2>
          <p>{group?.about}</p>
        </div>
      </section>
      {!upcoming.length && !past.length && <h2>No Upcoming Events</h2>}
      {upcoming.length != 0 && <section className='upcoming-events'>
        <h2>Upcoming Events ({upcoming.length})</h2>
        <ul>
          {upcoming.map(event => (
            <EventsListItem key={event.id} event={event}/>
          ))}
        </ul>
      </section>}
      {past.length != 0 && <section className='past-events'>
        <h2>Past Events ({past.length})</h2>
        <ul>
          {past.map(event => (
            <EventsListItem key={event.id} event={event}/>
          ))}
        </ul>
      </section>}
    </div>
  )
}

export default GroupDetails