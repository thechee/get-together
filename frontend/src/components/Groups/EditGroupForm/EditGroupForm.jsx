import './EditGroupForm.css'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { thunkGroupDetails, thunkEditGroup } from '../../../store/groups'

const EditGroupForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { groupId } = useParams()
  const group = useSelector(state => state.groups[groupId])
  const [ city, setCity ] = useState(group?.city)
  const [ state, setState ] = useState(group?.state)
  const [ name, setName ] = useState(group?.name)
  const [ about, setAbout ] = useState(group?.about)
  const [ type, setType ] = useState(group?.type)
  const [ privacy, setPrivacy ] = useState(group?.private)
  // const [ imageUrl, setImageUrl ] = useState(group?.GroupImages?.find(image => image.preview == true).url)
  const [ validationErrors, setValidationErrors ] = useState({})
  
  useEffect(() => {
    dispatch(thunkGroupDetails(groupId))
  }, [dispatch, groupId])

  console.log(group)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errors = {};
    // const urlEndings = ['.png', '.jpg', '.jpeg']
    // const urlEnding3 = imageUrl.slice(-4)
    // const urlEnding4 = imageUrl.slice(-5)

    if (!city) errors.city = "City is required"
    if (!state) errors.state = "State is required"
    if (!name) errors.name = 'Name is required'
    if (about.length < 30) errors.about = 'Description must be at least 30 characters long'
    if (type == 'placeholder' || !type) errors.type = 'Group Type is required'
    if (privacy == 'placeholder' || !privacy) errors.privacy = 'Visibility Type is required'
    // if (!urlEndings.includes(urlEnding3) && !urlEndings.includes(urlEnding4)) errors.imageUrl = 'Image URL must end in .png, .jpg, or .jpeg'

    setValidationErrors(errors)

    if (!Object.values(validationErrors).length) {

      const newGroupReqBody = {
        name,
        about,
        type,
        private: privacy,
        city,
        state,
      }

      // const newImageReqBody = {
      //   url: imageUrl,
      //   preview: true
      // }
      
      const editedGroup = await dispatch(thunkEditGroup(groupId, newGroupReqBody))
      
      if (editedGroup.errors) {
        console.log("editedGroup.errors:", editedGroup.errors)
        // set validation errors
      } else {
        // the dispatch needs the group id AND the body
        // await dispatch(thunkAddImage(groupId, newImageReqBody))
        navigate(`/groups/${groupId}`)
      }
    }
  }

  return (
    <section>
      <h3>UPDATE YOUR GROUP&apos;S INFORMATION</h3>
      <h2>We&apos;ll walk you through a few steps to build your local community</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>First, set your group&apos;s location.</h2>
          <p>
            Meetup groups meet locally, in person and online, We&apos;ll connect you with people 
            <br />in your area, and more can join you online.
          </p>
          <input type="text" placeholder='City' value={city} onChange={e => setCity(e.target.value)}/>
          {"city" in validationErrors && <p className='errors'>{validationErrors.city}</p>}
          <input type="text" placeholder='State' value={state} onChange={e => setState(e.target.value)}/>
          {"state" in validationErrors && <p className='errors'>{validationErrors.state}</p>}
        </div>
        <div>
          <h2>What will your group&apos;s name be?</h2>
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
            People will see this when we promote your group, but you&apos;ll be able to add to it later, too.
            <br />
            <br />1. What&apos;s the purpose of the group?
            <br />2. Who should join?
            <br />3. What will you do at your events?
          </label>
          <textarea name="" id="" cols="30" rows="10" 
            placeholder='Please write at least 30 characters'
            value={about}
            onChange={e => setAbout(e.target.value)}
          ></textarea>
          {"about" in validationErrors && <p className='errors'>{validationErrors.about}</p>}
        </div>
        <div>
          <h2>Final steps...</h2>
          <label htmlFor='type'>
            Is this an in person or online group?
            <select
              value={type}
              onChange={e => setType(e.target.value)}
            >
              <option disabled value="placeholder">(select one)</option>
              <option value="In person">In person</option>
              <option value="Online">Online</option>
            </select>
          </label>
          {"type" in validationErrors && <p className='errors'>{validationErrors.type}</p>}
          <label htmlFor="privacy">
            Is this group private or public?
            <select
              value={privacy}
              onChange={e => setPrivacy(e.target.value)}
            >
              <option disabled value="placeholder">(select one)</option>
              <option value={false}>Public</option>
              <option value={true}>Private</option>
            </select>
          </label>
          {"privacy" in validationErrors && <p className='errors'>{validationErrors.privacy}</p>}
          {/* <label htmlFor="imageUrl">
            Please add an image url for your group below:
            <input type="url" placeholder='Image Url' value={imageUrl} onChange={e => setImageUrl(e.target.value)}/>
          </label>
          {"imageUrl" in validationErrors && <p className='errors'>{validationErrors.imageUrl}</p>} */}
        </div>
        <button onSubmit={handleSubmit}>Update Group</button>
      </form>
    </section>
  );
}

export default EditGroupForm;