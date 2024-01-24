import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { thunkGroupDetails } from '../../../store/groups';
import { thunkCreateEvent } from '../../../store/events';
import { thunkAddEventImages, thunkAddEventPreviewImage } from '../../../store/events';
import './CreateEventForm.css';

const CreateEventForm = () => {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [ name, setName ] = useState('')
  const [ type, setType ] = useState('select-one')
  const [ capacity, setCapacity ] = useState('')
  const [ price, setPrice ] = useState('')
  const [ startDate, setStartDate ] = useState('')
  const [ endDate, setEndDate ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ url, setUrl ] = useState('')
  const [ images, setImages ] = useState(null)
  // const [ imagesArr, setImagesArr ] = useState([])
  const [ previewImage, setPreviewImage ] = useState(null)
  const [ validationErrors, setValidationErrors ] = useState({})
  const group = useSelector(state => state.groups[groupId])

  useEffect(() => {
    dispatch(thunkGroupDetails(groupId))
  }, [dispatch, groupId])

  

  // useEffect(() => {
  //   const tempArr = []

  //   if (images) {
  //     for (let i = 0; i < images.length; i++) {
  //       tempArr.push(images.item(i).name)
  //     }
  //   }

  //   setImagesArr(tempArr)
  // }, [images])
  
  const updateFiles = e => {
    const files = e.target.files;
    setImages(files);
  };

  const updateFile = e => {
    const file = e.target.files[0];
    setPreviewImage(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidationErrors({});

    const urlEndings = ['.png', '.jpg', '.jpeg'];
    const urlEnding3 = url.slice(-4);
    const urlEnding4 = url.slice(-5);

    const errors = {};
    if (!name) errors.name = 'Name is required';
    if (name.length < 5) errors.name = 'Name must be at least 5 characters'
    if (type == 'select-one') errors.type = 'Event Type is required';
    if (capacity == 'placeholder' || !capacity) errors.capacity = 'Event capacity is required';
    if (price == 'placeholder' || !price) errors.price = 'Price is required';
    // if (price.startsWith('0') && price.length > 1) errors.price = 'Price should be a valid'
    if (!startDate) errors.startDate = 'Event start is required';
    if (new Date(startDate).getTime() <= new Date().getTime()) errors.startDate = 'Event start must be in the future'
    if (new Date(startDate).getTime() > new Date(endDate).getTime()) errors.endDate = 'Event end must be after the start'
    if (!endDate) errors.endDate = 'Event end is required';
    // if (!urlEndings.includes(urlEnding3) && !urlEndings.includes(urlEnding4)) errors.imageUrl = 'Image URL must end in .png, .jpg, or .jpeg';
    if (images.length === 0) errors.images = 'At least 1 image is required'
    if (description.length < 30) errors.description = 'Description must be at least 30 characters long';

    if (Object.values(errors).length) {
      setValidationErrors(errors)
    } else {
    // hardcoded null value for venueId
  
      const venueId = null
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

      // const newEventImgBody = {
      //   url,
      //   preview: true
      // }
      
      await dispatch(thunkCreateEvent(groupId, newEventReqBody))
      .then(async (createdEvent) => {

        // const newImageArr = imagesArr.map(image => {
        //   const newEventImgBody = {
        //     image
        //   }

        //   if (image === previewImage) {
        //     newEventImgBody.preview = true
        //   } else {
        //     newEventImgBody.preview = false
        //   }

        //   return newEventImgBody
        // }
        // )
        dispatch(thunkAddEventPreviewImage(createdEvent.id, previewImage))
        dispatch(thunkAddEventImages(createdEvent.id, images))
        navigate(`/events/${createdEvent.id}`)
      })
      .catch(async (res) => {
        const data = await res.json()
        setValidationErrors(data.errors)
      })
    }
  }

  return (
    <form className='event-form' onSubmit={handleSubmit}>
      <div id='event-top-div'>
        <h1>Create a new event for {group?.name}</h1>
        <label htmlFor="event-name">
          <p>
            What is the name of your event?
          </p>
        </label>
          <input 
            name='event-name'
            id='event-input-name'
            type="text"
            placeholder='Event Name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {"name" in validationErrors && <p className='errors'>{validationErrors.name}</p>}
      </div>
      <div>
        <label htmlFor="">
          <p>
            Is this an in person or online event?
          </p>
        </label>
        <select
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option disabled value='select-one'>(select one)</option>
          <option value="In person">In person</option>
          <option value="Online">Online</option>
        </select>
        {"type" in validationErrors && <p className='errors'>{validationErrors.type}</p>}
        <label htmlFor="">
          <p>
            What is the capacity of the event?
          </p>
        </label>
        <input 
          type="number"
          id='event-input-capacity'
          placeholder='Capacity'
          min={0}
          value={capacity}
          onChange={e => setCapacity(e.target.value)}
        />
        {"capacity" in validationErrors && <p className='errors'>{validationErrors.capacity}</p>}
        <label htmlFor="price">
          <p>
            What is the price for your event?
          </p>
        </label>
        <div id='event-div-price'>
        <i className="fa-solid fa-dollar-sign"></i>
        <input 
          id='event-input-price'
          step='0.01'
          name='price'
          type="number"
          placeholder='0.00'
          min={0}
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        </div>

        {"price" in validationErrors && <p className='errors'>{validationErrors.price}</p>}
      </div>
      <div>
        <label htmlFor="">
          <p>
            When does your event start?
          </p>
        </label>
        <input 
          type="datetime-local"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
        {"startDate" in validationErrors && <p className='errors'>{validationErrors.startDate}</p>}
        <label htmlFor="">
          <p>
            When does your event end?
          </p>
        </label>
        <input 
          type="datetime-local"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
        {"endDate" in validationErrors && <p className='errors'>{validationErrors.endDate}</p>}
      </div>
      <div>
        <label htmlFor="imageUrl">
          <p>
            Please add an image url for your event below:
          </p>
        </label>
        <input 
          type="url"
          id='event-input-imageUrl'
          name='imageUrl'
          placeholder='Image URL'
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        {"imageUrl" in validationErrors && <p className='errors'>{validationErrors.imageUrl}</p>}

        <label>
          Images to Upload
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            multiple
            onChange={updateFiles} />
        </label>

        <label htmlFor="">
          Preview Image
          <input
            type='file'
            accept=".jpg, .jpeg, .png"
            onChange={updateFile} />
        </label>
        {/* <label htmlFor="">
          Preview Image
          <select
            value={previewImage}
            onChange={e => setPreviewImage(e.target.value)}
          >
            <option disabled value='select-one'>(select one)</option>
            {imagesArr.length && imagesArr.map(image => (
              <option key={image} value={image}>{image}</option>
            ))}
          </select>
        </label> */}


        {/* <label htmlFor="preview">
          <p>
            Set this image as a preview of the Event:
            <input
              name='preview'
              type="checkbox"
              value={preview}
              onChange={() => setPreview(!preview)}
            />
          </p>
        </label> */}
      </div>
      <div>
        <label htmlFor="description">
          <p>
            Please describe your event:
          </p>
        </label>
        <textarea name="description" id="event-input-description" cols="30" rows="10"
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