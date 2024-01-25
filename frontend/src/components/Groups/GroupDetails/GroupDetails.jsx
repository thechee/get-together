import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGroupDetails, thunkLoadGroupEvents, thunkLoadMembers } from '../../../store/groups';
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
  const groups = useSelector(state => state.groups)
  const eventsState = useSelector(state => state.events)
  let events = useSelector(state => state.groups[groupId]?.Events)
  const group = groups[groupId]
  
  useEffect(() => {
    if (!group?.Organizer) dispatch(thunkGroupDetails(groupId))

    return () => null;
  }, [dispatch, groupId, group?.Organizer])
  
  useEffect(() => {
    if (!group?.Events) dispatch(thunkLoadGroupEvents(groupId))
    return () => null;
  }, [dispatch, groupId, group?.Events])
  
  useEffect(() => {
    if (!group?.Members && user) dispatch(thunkLoadMembers(groupId))
    return () => null;
  }, [dispatch, groupId, group?.Members, user])

  if (!eventsState) return null
  
  const isOwner = user?.id == group?.organizerId;
  let isMember;
  if (group?.Members) {
    const members = Object.values(group?.Members);

    isMember = members.filter(member => {
      return member.id == user.id}).length > 0
    }
  
  
  const now = new Date()
  const upcoming = []
  const past = []

  events?.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))

  events?.forEach(event => {
    new Date(event.startDate) < now ?
      past.push(event) :
      upcoming.push(event)
  })


  const groupPreviewImage = group?.GroupImages?.find(image => image.preview == true)

  return (
    <div>
      <div className='back-link'>
        <span>{'<'}</span><Link id='back-to-groups' to={'/groups'}>Groups</Link>
      </div>
      <section className='group-landing'>
  
        <div className='group-detail-image-div'>
          <img className='group-image' src={groupPreviewImage?.url} alt="" />
        </div>

          <div className='group-info'>
            <div>
            <h1>{group?.name}</h1>
            <h4>{group?.city}, {group?.state}</h4>
            <h4>{events?.length ? events?.length : 0} events · {group?.private ? "Private" : "Public" }</h4>
            <h4>Organized by {group?.Organizer?.firstName} {group?.Organizer?.lastName}</h4>
            </div>
            <div className='group-info-buttons'>
              {!isOwner && !isMember && <button 
                id='join-group'
                onClick={() => alert('Feature Coming Soon...')}>
                Join this group
              </button>}
              {user && !isOwner && isMember &&  <button 
                id='leave-group'
                onClick={() => alert('Feature Coming Soon...')}>
                Leave this group
              </button>}
              {isOwner && <button 
                onClick={() => navigate(`/groups/${groupId}/events/new`)}>
                Create event
              </button>}
              {isOwner && <button 
                onClick={() => navigate(`/groups/${groupId}/edit`)}>
                Update
              </button>}
              {isOwner && 
                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={<DeleteGroupModal group={group}/>}
              />}
            </div>
        </div>
      </section>
      <section className='group-events-section'>
        <div className='group-events'>
          <div>
            <h2>Organizer</h2>
            <h4>{group?.Organizer?.firstName} {group?.Organizer?.lastName}</h4>
            <h2>What we&apos;re about</h2>
            <p>{group?.about}</p>
          </div>
          {!upcoming.length && !past.length && <h2>No Upcoming Events</h2>}
          {upcoming.length != 0 && <div className='upcoming-events'>
            <h2>Upcoming Events ({upcoming.length})</h2>
            <ul>
              {upcoming.map(event => (
                <EventsListItem key={event.id} eventId={event.id}/>
              ))}
            </ul>
          </div>}
          {past.length != 0 && <div className='past-events'>
            <h2>Past Events ({past.length})</h2>
            <ul>
              {past.map(event => (
                <EventsListItem key={event.id} eventId={event.id}/>
              ))}
            </ul>
          </div>}

        </div>
     
      </section>
    </div>
  )
}

export default GroupDetails