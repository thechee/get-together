import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkEventDetails } from "../../../store/events";
import { Link, useNavigate } from "react-router-dom";
import "./EventsListItem.css";
import OpenModalButton from "../../OpenModalButton";
import DeleteEventModal from "../DeleteEventModal/DeleteEventModal";

const EventsListItem = ({ eventId, owned, attending }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const event = useSelector((state) => state.events[eventId]);
  
  useEffect(() => {
    if (eventId && !event?.description) dispatch(thunkEventDetails(eventId));
  }, [dispatch, eventId, event?.description]);
  
  if (!event) return null;
  
  let preview;
  let eventImagesPreview;
  if (event.previewImage) {
    preview = event.previewImage;
  } else if (event.EventImages) {
    eventImagesPreview = event.EventImages.find(image => image.preview === true);
  }

  let date;
  let time;

  if (event && !event.message) {
    date = event.startDate.split(" ")[0];
    time = event.startDate.split(" ")[1];
    time = time?.slice(0, 5);
  }

  return (
    <li>
      <Link to={`/events/${event.id}`} event={event}>
        <div className="events-list-item">
          <div className="event-card-img">
            {preview && (
              <img className="events-list-image" src={preview} alt="" />
            )}
            {eventImagesPreview && (
              <img
                className="events-list-image"
                src={eventImagesPreview.url}
                alt=""
              />
            )}
          </div>
          <div className="events-list-info">
            <h3>
              {date} · {"<"}
              {time}
              {">"}
            </h3>
            <h2>{event.name}</h2>
            {event.Venue ? (
              <h4>
                {event.Venue?.city}, {event.Venue?.state}
              </h4>
            ) : (
              <h4>No location</h4>
            )}
          </div>
        </div>
        <div className="event-card-about">
          <p>{event.description}</p>
        </div>
      </Link>
      <div className="event-btns">
        {owned && (
          <button onClick={() => navigate(`/events/${eventId}/edit`)}>
            Update
          </button>
        )}
        {owned && (
          <OpenModalButton
            buttonText="Delete"
            modalComponent={<DeleteEventModal event={event} />}
          />
        )}
        {attending && (
          <button
            id="unattend-event-btn"
            onClick={() => alert("Feature coming soon...")}
          >
            Unjoin
          </button>
        )}
      </div>
    </li>
  );
};

export default EventsListItem;
