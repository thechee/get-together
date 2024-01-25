import { useDispatch, useSelector } from "react-redux";
import "./ManageEvents.css";
import EventsListItem from "../EventsListItem";
import { useEffect } from "react";
import { thunkLoadUserEvents } from "../../../store/session";

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

  // if (!userEventsArr) return null;

  return (
    <div className="user-groups-content">
      <h2>Manage Events</h2>

      <h4>Your events in Get-Together</h4>

      {ownedEvents?.length ? (
        <div>
          <h2>Events that you manage:</h2>
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
        <h2>You do not manage any events yet!</h2>
      )}
      {attendingEvents?.length ? (
        <div>
          <h2>Events that you are attending:</h2>
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
        <h2>You are not attending any events yet!</h2>
      )}
    </div>
  );
};

export default ManageEvents;
