import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.thunkSignup({
          email,
          username,
          firstName,
          lastName,
          password,
          image,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    } else {
      return setErrors({
        confirmPassword: "The passwords must match",
      });
    }
  };

  const buttonStatus =
    firstName.length == 0 ||
    lastName.length == 0 ||
    username.length < 4 ||
    password.length < 6 ||
    // confirmPassword !== password ? "disabled" : "";
    confirmPassword.length < 6
      ? "disabled"
      : "";

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <div className="sign-up-form-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <p className="required-input">* - required input</p>
        {errors.firstName && <p className="error">{errors.firstName}</p>}
        {errors.lastName && <p className="error">{errors.lastName}</p>}
        {errors.email && <p className="error">The provided email is invalid.</p>}
        {errors.username && <p className="error">Username must be unique.</p>}
        {errors.password && <p className="error">{errors.password}</p>}
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        <label htmlFor="firstName">First Name <span className="required-input">*</span></label>
        <input
          name="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label htmlFor="lastName">Last Name <span className="required-input">*</span></label>
        <input
          name="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label htmlFor="email">Email <span className="required-input">*</span></label>
        <input
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="username">Username <span className="required-input">*</span></label>
        <input
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">
          Password <span className="required-input">*</span>
        </label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <label htmlFor="confirmPassword">
          Confirm Password <span className="required-input">*</span>
        </label>
          <input
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        <label>
          Profile Picture
        </label>
          <input type="file" onChange={updateFile} />
        <button id={`signup-button${buttonStatus}`} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
