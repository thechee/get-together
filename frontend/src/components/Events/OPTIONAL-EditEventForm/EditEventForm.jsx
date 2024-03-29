import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkEventDetails } from "../../../store/events";
import { thunkUpdateEvent} from "../../../store/events";

import "./EditEventForm.css";

const EditEventForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const event = useSelector((state) => state.events[eventId]);
  const user = useSelector((state) => state.session.user)
  const group = useSelector((state) => state.groups[event?.groupId])

  const [name, setName] = useState(event?.name);
  const [type, setType] = useState(event?.type);
  const [capacity, setCapacity] = useState(event?.capacity);
  const [price, setPrice] = useState(event?.price);
  const [startDate, setStartDate] = useState(event?.startDate);
  const [endDate, setEndDate] = useState(event?.endDate);
  const [description, setDescription] = useState(event?.description);
  // const [url, setUrl] = useState(event?.previewImage || event?.EventImages[0]?.url);
  // const [previewImage, setPreviewImage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const isUserOwner = group?.organizerId == user?.id

  if (isUserOwner == false) {
    navigate('/')
  }
  
  useEffect(() => {
    dispatch(thunkEventDetails(eventId));
  }, [dispatch, eventId]);

  // const updateFile = (e) => {
  //   const file = e.target.files[0];
  //   setPreviewImage(file);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidationErrors({});

    const errors = {};
    if (!name) errors.name = "Name is required";
    if (name.length < 5) errors.name = "Name must be at least 5 characters";
    if (type == "placeholder") errors.type = "Event Type is required";
    if (capacity == "placeholder" || !capacity) errors.capacity = "Event capacity is required";
    if (price == "placeholder" || price == null) errors.price = "Price is required";
    // if (price.startsWith("0") && price.length > 1)
    //   errors.price = "Price should be a valid";
    if (!startDate) errors.startDate = "Event start is required";
    if (new Date(startDate).getTime() <= new Date().getTime()) errors.startDate = "Event start must be in the future";
    if (new Date(startDate).getTime() > new Date(endDate).getTime()) errors.endDate = "Event end must be after the start";
    if (!endDate) errors.endDate = "Event end is required";
    if (description.length < 30) errors.description = "Description must be at least 30 characters long";

    if (Object.values(errors).length) {
      setValidationErrors(errors);
    } else {
      const venueId = null;
      const updatedEventReqBody = {
        venueId,
        name,
        type,
        capacity,
        price,
        // price: price.replace(/^0+/, ''),
        description,
        startDate,
        endDate,
      };

      await dispatch(thunkUpdateEvent(eventId, updatedEventReqBody))
        .then(async (updatedEvent) => {
          // await dispatch(thunkUpdateEventPreviewImage(eventId, previewImage))
          navigate(`/events/${updatedEvent.id}`);
        })
        .catch(async (res) => {
          const data = await res.json()
          setValidationErrors(data.errors)
        })
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div id="event-top-div">
        <h1>Update your event</h1>
        <label htmlFor="event-name">
          <p>What is the name of your event?</p>
        </label>
        <input
          name="event-name"
          id="event-input-name"
          type="text"
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {"name" in validationErrors && (
          <p className="errors">{validationErrors.name}</p>
        )}
      </div>
      <div>
        <label htmlFor="">
          <p>Is this an in person or online event?</p>
        </label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option disabled value="select-one">
            (select one)
          </option>
          <option value="In person">In person</option>
          <option value="Online">Online</option>
        </select>
        {"type" in validationErrors && (
          <p className="errors">{validationErrors.type}</p>
        )}
        <label htmlFor="">
          <p>What is the capacity of the event?</p>
        </label>
        <input
          type="number"
          id="event-input-capacity"
          placeholder="Capacity"
          min={0}
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        {"capacity" in validationErrors && (
          <p className="errors">{validationErrors.capacity}</p>
        )}
        <label htmlFor="price">
          <p>What is the price for your event?</p>
        </label>
        <div id="event-div-price">
          <i className="fa-solid fa-dollar-sign"></i>
          <input
            id="event-input-price"
            step="0.01"
            name="price"
            type="number"
            placeholder="0.00"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {"price" in validationErrors && (
          <p className="errors">{validationErrors.price}</p>
        )}
      </div>
      <div>
        <label htmlFor="">
          <p>When does your event start?</p>
        </label>
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        {"startDate" in validationErrors && (
          <p className="errors">{validationErrors.startDate}</p>
        )}
        <label htmlFor="">
          <p>When does your event end?</p>
        </label>
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        {"endDate" in validationErrors && (
          <p className="errors">{validationErrors.endDate}</p>
        )}
      </div>
      {/* <div>
      <label htmlFor="">
          <p>Main image for your Event</p>
          <input type="file" accept=".jpg, .jpeg, .png" onChange={updateFile} />
        </label>
        {"previewImage" in validationErrors && (
          <p className="errors">{validationErrors.previewImage}</p>
        )} */}
        {/* <label htmlFor="imageUrl">
          <p>Please add an image url for your event below:</p>
        </label>
        <input
          type="url"
          id="event-input-imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        {"imageUrl" in validationErrors && (
          <p className="errors">{validationErrors.imageUrl}</p>
        )} */}
      {/* </div> */}
      <div>
        <label htmlFor="description">
          <p>Please describe your event:</p>
        </label>
        <textarea
          name="description"
          id="event-input-description"
          cols="30"
          rows="10"
          placeholder="Please include at least 30 characters"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {"description" in validationErrors && (
          <p className="errors">{validationErrors.description}</p>
        )}
      </div>
      <button>Update Event</button>
    </form>
  );
};

export default EditEventForm;
