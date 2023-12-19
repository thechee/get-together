import { useEffect, useState } from 'react'
import Select from 'react-select'
import './CreateGroupForm.css'
import { useNavigate } from 'react-router-dom'


const CreateGroupForm = () => {
  const navigate = useNavigate()
  const [ city, setCity ] = useState('')
  const [ state, setState ] = useState('')
  const [ name, setName ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ type, setType ] = useState('')
  const [ privacy, setPrivacy ] = useState(false)
  const [ imageUrl, setImageUrl ] = useState('')
  const [ validationErrors, setValidationErrors ] = useState({})
  
  useEffect(() => {

  }, [])
  
  const typeOptions = [
    { label: "In person", value: 'In person' },
    { label: "Online", value: 'Online' }
  ]
  const privacyOptions = [
    { label: "Public", value: false },
    { label: "Private", value: true }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()

    const errors = {};
    const urlEndings = ['png', 'jgp', 'jpeg']
    const urlEnding = imageUrl.split('.')[1]

    if (!location) errors.location = "Location is required"
    if (!name) errors.name = 'Name is required'
    if (description.length < 30) errors.description = 'Description must be at least 30 characters long'
    if (!type) errors.type = 'Group Type is required'
    if (!privacy) errors.privacy = 'Visibility Type is required'
    if (!urlEndings.includes(urlEnding)) errors.imageUrl = 'Image URL must end in .png, .jgp, or .jpeg'

    setValidationErrors(errors)

    const reqBody = {
      city,
      state,
      name,
      description,
      type,
      privacy,
      imageUrl
    }

    console.log(reqBody)
    navigate()
  }

  return (
    <section>
      <h3>BECOME AN ORGANIZER</h3>
      <h2>We'll walk you through a few steps to build your local community</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>First, set your group's location.</h2>
          <p>
            Meetup groups meet locally, in person and online, We'll connect you with people 
            <br />in your area, and more can join you online.
          </p>
          <input type="text" placeholder='City' value={city} onChange={e => setCity(e.target.value)}/>
          {"city" in validationErrors && <p className='errors'>{validationErrors.location}</p>}
          <input type="text" placeholder='State' value={state} onChange={e => setState(e.target.value)}/>
          {"state" in validationErrors && <p className='errors'>{validationErrors.location}</p>}
        </div>
        <div>
          <h2>What will your group's name be?</h2>
          <label>
            Choose a name that will give people a clear idea of what the group is about.
            <br />Feel free to get creative! You can edit this later if you change your mind.
          </label>
          <input type="text" placeholder='What is your group name?' value={name} onChange={e => setName(e.target.value)}/>
          {"name" in validationErrors && <p className='errors'>{validationErrors.name}</p>}
        </div>
        <div>
          <h2>Now describe what your group will be about</h2>
          <label>
            People will see this when we promote your group, but you'll be able to add to it later, too.
            <br />
            <br />1. What's the purpose of the group?
            <br />2. Who should join?
            <br />3. What will you do at your events?
          </label>
          <textarea name="" id="" cols="30" rows="10" 
            placeholder='Please write at least 30 characters'
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
          {"description" in validationErrors && <p className='errors'>{validationErrors.description}</p>}
        </div>
        <div>
          <h2>Final steps...</h2>
          <label htmlFor='type'>
            Is this an in person or online group?
            <Select
              options={typeOptions}
              defaultValue={{label: '(select one)', value: 'placeholder'}}
              onChange={setType}
            >
            </Select>
            {/* <select
              value={type}
              onChange={e => setType(e.target.value)}
              defaultValue='placeholder'
            >
              <option value="placeholder">(select one)</option>
              <option value="In person">In person</option>
              <option value="Online">Online</option>
            </select> */}
          </label>
          {"type" in validationErrors && <p className='errors'>{validationErrors.type}</p>}
          <label htmlFor="privacy">
            Is this group private or public?
            <Select
              options={privacyOptions}
              defaultValue={{label: '(select one)', value: 'placeholder'}}
              onChange={setPrivacy}
            >
            </Select>
          </label>
          {"privacy" in validationErrors && <p className='errors'>{validationErrors.privacy}</p>}
          <label htmlFor="imageUrl">
            Please add an image url for your group below:
            <input type="text" placeholder='Image Url' value={imageUrl} onChange={e => setImageUrl(e.target.value)}/>
          </label>
          {"imageUrl" in validationErrors && <p className='errors'>{validationErrors.imageUrl}</p>}
        </div>
        <button onSubmit={handleSubmit}>Create Group</button>
      </form>
    </section>
  );
}

export default CreateGroupForm;