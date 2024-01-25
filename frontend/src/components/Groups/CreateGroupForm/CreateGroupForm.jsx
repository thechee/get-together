import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  thunkCreateGroup,
  thunkAddGroupImages,
  thunkAddGroupPreviewImage,
} from "../../../store/groups";
import "./CreateGroupForm.css";

const CreateGroupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [state, setState] = useState("placeholder");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [type, setType] = useState("placeholder");
  const [privacy, setPrivacy] = useState("placeholder");
  // const [ imageUrl, setImageUrl ] = useState('')
  const [previewImage, setPreviewImage] = useState(null);
  const [images, setImages] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const updateFile = (e) => {
    const file = e.target.files[0];
    setPreviewImage(file);
  };

  const updateFiles = (e) => {
    const files = e.target.files;
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidationErrors({})

    const errors = {};
    // const urlEndings = ['.png', '.jpg', '.jpeg']
    // const urlEnding3 = imageUrl.slice(-4)
    // const urlEnding4 = imageUrl.slice(-5)

    if (!city) errors.city = "City is required";
    if (!state) errors.state = "State is required";
    if (state == 'placeholder')
      errors.state = "State is required";
    if (!name) errors.name = "Name is required";
    if (about.length < 30)
      errors.about = "Description must be at least 30 characters long";
    if (type == "placeholder" || !type) errors.type = "Group Type is required";
    if (privacy == "placeholder" || !privacy)
      errors.privacy = "Visibility Type is required";
    // if (!urlEndings.includes(urlEnding3) && !urlEndings.includes(urlEnding4)) errors.imageUrl = 'Image URL must end in .png, .jpg, or .jpeg'
    if (!previewImage)
      errors.previewImage = "A main image for the group is required";

    if (Object.values(errors).length) {
      setValidationErrors(errors);
    } else {
      const newGroupReqBody = {
        name,
        about,
        type,
        private: privacy,
        city,
        state: state.toUpperCase(),
      };

      await dispatch(thunkCreateGroup(newGroupReqBody))
        .then(async (createdGroup) => {
          await dispatch(thunkAddGroupPreviewImage(createdGroup.id, previewImage));
          if (images) await dispatch(thunkAddGroupImages(createdGroup.id, images));
          navigate(`/groups/${createdGroup.id}`);
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data.errors) {
            setValidationErrors(data.errors);
          } else {
            console.log('error response:', data)
            setValidationErrors(data)
          }
        });
    }
  };

  return (
    <section className="group-section">
      <h4>BECOME AN ORGANIZER</h4>
      <h2>Start a New Group</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Set your group&apos;s location</h2>
          <p>
            Get Together groups meet locally, in person and online.
            <br />
            We&apos;ll connect you with people in your area.
          </p>
          <label htmlFor="city">
            <input
              type="text"
              name="city"
              id="group-city"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <span id="comma-span">,</span>
          <label htmlFor="state">
            {/* <input type="text" id='group-state' placeholder='STATE' value={state} onChange={e => setState(e.target.value)}/> */}
            <select
              name="state"
              id="group-state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option disabled value={"placeholder"}>
                State
              </option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </label>
          <div className="errors-div">
            {"city" in validationErrors && (
              <span className="errors shake-horizontal" id="group-error-city">
                {validationErrors.city}
              </span>
            )}
            {"state" in validationErrors && (
              <span className="errors shake-horizontal" id="group-error-state">
                {validationErrors.state}
              </span>
            )}
          </div>
        </div>
        <div>
          <h2>What will your group&apos;s name be?</h2>
          <p>
            Choose a name that will give people a clear idea of what the group
            is about.
            <br />
            Feel free to get creative! You can edit this later if you change
            your mind.
          </p>
          <label>
            <input
              type="text"
              id="group-name"
              placeholder="What is your group name?"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <div className="errors-div">
            {"name" in validationErrors && (
              <span className="errors shake-horizontal">{validationErrors.name}</span>
            )}
          </div>
        </div>
        <div>
          <h2>Describe the purpose of your group.</h2>
          <label>
            <p>
              People will see this when we promote your group, but you&apos;ll
              be able to add to it later, too.
              <br />
              <br />
              1. What&apos;s the purpose of the group?
              <br />
              2. Who should join?
              <br />
              3. What will you do at your events?
            </p>
          </label>
          <textarea
            name=""
            id="group-about"
            cols="30"
            rows="10"
            placeholder="Please write at least 30 characters"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
          <div className="errors-div">
            {"about" in validationErrors && (
              <span className="errors shake-horizontal">{validationErrors.about}</span>
            )}
          </div>
        </div>
        <div id="final-steps-div">
          <h2>Final steps...</h2>
          <label htmlFor="type">
            <p>Is this an in person or online group?</p>
            <select
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option
                className="placeholder-select"
                disabled
                value="placeholder"
              >
                (select one)
              </option>
              <option value="In person">In person</option>
              <option value="Online">Online</option>
            </select>
          </label>
          <div className="errors-div">
            {"type" in validationErrors && (
              <span className="errors shake-horizontal">{validationErrors.type}</span>
            )}
          </div>
          <label htmlFor="privacy">
            <p>Is this group private or public?</p>
            <select
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
            >
              <option
                className="placeholder-select"
                disabled
                value="placeholder"
              >
                (select one)
              </option>
              <option value={false}>Public</option>
              <option value={true}>Private</option>
            </select>
          </label>
          <div className="errors-div">
            {"privacy" in validationErrors && (
              <span className="errors shake-horizontal">{validationErrors.privacy}</span>
            )}
          </div>
          {/* <label htmlFor="imageUrl">
            <p>
              Please add an image url for your group below:
            </p>
            <input id='group-imageUrl' type="url" name='imageUrl' placeholder='Image Url' value={imageUrl} onChange={e => setImageUrl(e.target.value)}/>
          </label>
          <div className="errors-div">
            {"imageUrl" in validationErrors && <span className='errors'>{validationErrors.imageUrl}</span>}
          </div> */}
          <label htmlFor="">
            <p>Main image for your Group</p>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={updateFile}
            />
          </label>
          <div className="errors-div">
            {"previewImage" in validationErrors && (
              <span className="errors shake-horizontal">{validationErrors.previewImage}</span>
            )}
          </div>
          <label>
            <p>Additional images for your Group</p>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              multiple
              onChange={updateFiles}
              />
          </label>
        </div>
        <div>
          <button onSubmit={handleSubmit}>Create group</button>
        </div>
      </form>
    </section>
  );
};

export default CreateGroupForm;
