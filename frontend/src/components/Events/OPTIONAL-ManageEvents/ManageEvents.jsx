import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EventsListItem from "../EventsListItem";
import { useEffect } from "react";
import { thunkLoadUserEvents } from "../../../store/session";
import "./ManageEvents.css";

const ManageEvents = () => {
  const dispatch = useDispatch()
  const userEvents = useSelector((state) => state.session.user.Events);

  useEffect(() => {
    dispatch(thunkLoadUserEvents())
  }, [dispatch])

  let ownedEvents;
  let attendingEvents;

  if (userEvents) {
    ownedEvents = Object.values(userEvents.ownedEvents);
    attendingEvents = Object.values(userEvents.attendingEvents);
  }

  ownedEvents?.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
  attendingEvents?.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))

  const owned = ownedEvents?.length >= 1
  const attending = attendingEvents?.length >= 1
  console.log(owned)
  console.log(attending)

  if (owned == false && attending == false) {
    return (
      <div className="user-groups-content">
        <h1>You aren&apos;t involved in any events yet!</h1>

        <h4><Link className='manage-events-links' to={'/groups/new'}>Start a group and host events</Link></h4>
        <h4><Link className='manage-events-links' to={'/groups/current'}>See groups you&apos;re a part of</Link></h4>
        <h4><Link className='manage-events-links' to={'/events'}>Find events to attend</Link></h4>
      </div>
    )
  }


  return (
    <div className="user-groups-content">
      <h2>Your events in Get-Together</h2>
        
      {owned ? (
        <div>
          <h2>Events you manage:</h2>
          <ul>
            {ownedEvents.map((event) => (
              <EventsListItem
                event={event}
                eventId={event.id}
                owned={true}
                key={event.id}
              />
            ))}
          </ul>
        </div>
      ) : (
        <h2>No managed events yet!</h2>
      )}
      {attending ? (
        <div>
          <h2>Events you&apos;re attending:</h2>
          <ul>
            {attendingEvents.map((event) => (
              <EventsListItem
                event={event}
                eventId={event.id}
                attending={true}
                key={event.id}
              />
            ))}
          </ul>
        </div>
      ) : (
        <h2>Not attending any events yet!</h2>
      )}
    </div>
  );
};

export default ManageEvents;
