import { useNavigate, useParams } from 'react-router-dom';
import './CreateEventForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { thunkGroupDetails } from '../../../store/groups';
import { thunkCreateEvent } from '../../../store/events';
import { thunkAddEventImage } from '../../../store/events';

const CreateEventForm = () => {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [ name, setName ] = useState('')
  const [ type, setType ] = useState('placeholder')
  const [ capacity, setCapacity ] = useState('placeholder')
  const [ price, setPrice ] = useState('placeholder')
  const [ startDate, setStartDate ] = useState('')
  const [ endDate, setEndDate ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ url, setUrl ] = useState('')
  const [ preview, setPreview ] = useState(false)
  const [ validationErrors, setValidationErrors ] = useState({})
  const group = useSelector(state => state.groups[groupId])

  useEffect(() => {
    dispatch(thunkGroupDetails(groupId))
  }, [dispatch])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlEndings = ['.png', '.jpg', '.jpeg'];
    const urlEnding3 = url.slice(-4);
    const urlEnding4 = url.slice(-5);

    const errors = {};
    if (!name) errors.name = 'Name is required';
    if (name.length < 5) errors.name = 'Name must be at least 5 characters'
    if (type == 'placeholder') errors.type = 'Event Type is required';
    if (capacity == 'placeholder' || !capacity) errors.capacity = 'Event capacity is required';
    if (price == 'placeholder' || !price) errors.price = 'Price is required';
    if (!startDate) errors.startDate = 'Event start is required';
    if (!endDate) errors.endDate = 'Event end is required';
    if (!urlEndings.includes(urlEnding3) && !urlEndings.includes(urlEnding4)) errors.imageUrl = 'Image URL must end in .png, .jpg, or .jpeg';
    if (description.length < 30) errors.description = 'Description must be at least 30 characters long';

    setValidationErrors(errors)

    const venueId = null

    if (!Object.values(validationErrors).length) {
      const newEventReqBody = {
        venueId,
        name,
        type,
        capacity,
        price,
        description,
        startDate,
        endDate
      }

      const newEventImgBody = {
        url,
        preview
      }
    
    
    const createdEvent = await dispatch(thunkCreateEvent(groupId, newEventReqBody))
    if (createdEvent.errors) {
      console.log("createdEvent.errors:", createdEvent.errors)
      // set validation errors
    } else {
        console.log(createdEvent)
        // dispatch the image to the new group's id
        // the dispatch needs the group id AND the body
        await dispatch(thunkAddEventImage(createdEvent.id, newEventImgBody))
        navigate(`/events/${createdEvent.id}`)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Create an event for {group?.name}</h1>
        <label htmlFor="">
          What is the name of your event?
        </label>
          <input 
            type="text"
            placeholder='Event Name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {"name" in validationErrors && <p className='errors'>{validationErrors.name}</p>}
      </div>
      <div>
        <label htmlFor="">
          Is this an in person or online event?
        </label>
        <select
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option disabled value="placeholder">(select one)</option>
          <option value="In person">In person</option>
          <option value="Online">Online</option>
        </select>
        {"type" in validationErrors && <p className='errors'>{validationErrors.type}</p>}
        <label htmlFor="">
          What is the capacity of the event?
        </label>
        <input 
          type="number" 
          placeholder='Capacity'
          min={0}
          value={capacity}
          onChange={e => setCapacity(e.target.value)}
        />
        {"capacity" in validationErrors && <p className='errors'>{validationErrors.capacity}</p>}
        <label htmlFor="">
          What is the price for your event?
        </label>
        <i className="fa-solid fa-dollar-sign"></i>
        <input 
          type="number"
          placeholder='0.00'
          min={0}
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        {"price" in validationErrors && <p className='errors'>{validationErrors.price}</p>}
      </div>
      <div>
        <label htmlFor="">
          When does your event start?
        </label>
        <input 
          type="datetime-local"
          placeholder='MM/DD/YYYY HH:mm AM'
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
        {"startDate" in validationErrors && <p className='errors'>{validationErrors.startDate}</p>}
        <label htmlFor="">
          When does your event end?
        </label>
        <input 
          type="datetime-local"
          placeholder='MM/DD/YYYY HH:mm PM'
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
        {"endDate" in validationErrors && <p className='errors'>{validationErrors.endDate}</p>}
      </div>
      <div>
        <label htmlFor="">
          Please add an image url for your event below:
        </label>
        <input 
          type="url"
          placeholder='Image URL'
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        {"imageUrl" in validationErrors && <p className='errors'>{validationErrors.imageUrl}</p>}
        <label htmlFor="">
          Set this image as a preview of the Event:
        </label>
        <input 
          type="checkbox"
          value={preview}
          onChange={() => setPreview(!preview)}
        />
      </div>
      <div>
        <label htmlFor="">
          Please describe your event:
        </label>
        <textarea name="" id="" cols="30" rows="10"
          placeholder='Please include at least 30 characters'
          value={description}
          onChange={e => setDescription(e.target.value)}
        ></textarea>
        {"description" in validationErrors && <p className='errors'>{validationErrors.description}</p>}
      </div>
      <button>Create Event</button>
    </form>
  );
}

export default CreateEventForm;