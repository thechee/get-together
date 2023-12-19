import { useState } from 'react'
import Select from 'react-select'
import './CreateGroupForm.css'

const CreateGroupForm = () => {
  const [ location, setLocation ] = useState('')
  const [ name, setName ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ type, setType ] = useState('')
  const [ privacy, setPrivacy ] = useState(false)
  const [ imageUrl, setImageUrl ] = useState('')
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
  }

  return (
    <section>
      <h3>BECOME AN ORGANIZER</h3>
      <h2>We'll walk you through a few steps to build your local community</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>First, set your group's location.</h2>
          <label>
            Meetup groups meet locally, in person and online, We'll connect you with people 
            <br />in your area, and more can join you online.
          </label>
          <input type="text" placeholder='City, STATE' value={location} onChange={e => setLocation(e.target.value)}/>
        </div>
        <div>
          <h2>What will your group's name be?</h2>
          <label>
            Choose a name that will give people a clear idea of what the group is about.
            <br />Feel free to get creative! You can edit this later if you change your mind.
          </label>
          <input type="text" placeholder='What is your group name?' value={name} onChange={e => setName(e.target.value)}/>
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
          <label htmlFor="privacy">
            Is this group private or public?
            <Select
              options={privacyOptions}
              defaultValue={{label: '(select one)', value: 'placeholder'}}
              onChange={setPrivacy}
            >
            </Select>
          </label>
          <label htmlFor="imageUrl">
            Please add an image url for your group below:
            <input type="text" placeholder='Image Url' value={imageUrl} onChange={e => setImageUrl(e.target.value)}/>
          </label>
        </div>
        <button onSubmit={handleSubmit}>Create Group</button>
      </form>
    </section>
  );
}

export default CreateGroupForm;