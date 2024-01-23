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
          image
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
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

  const updateFile = e => {
    const file = e.target.files[0]
    if (file) setImage(file);
  };

  return (
    <div className="sign-up-form-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="sign-up-form">
        {errors.email && (
          <p className="error">The provided email is invalid.</p>
        )}
        {errors.username && <p className="error">Username must be unique.</p>}
        <label htmlFor="firstName">First Name</label>
        <input
          name="firstName"
          type="text"
          value={firstName}
          // placeholder='First Name'
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        {errors.firstName && <p>{errors.firstName}</p>}
        <label htmlFor="lastName">Last Name</label>
        <input
          name="lastName"
          type="text"
          value={lastName}
          // placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        {errors.lastName && <p>{errors.lastName}</p>}
        <label htmlFor="email">
          Email
        </label>
          <input
            name="email"
            type="text"
            value={email}
            // placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <label htmlFor="username">
          Username
        </label>
          <input
            name="username"
            type="text"
            value={username}
            // placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        <label htmlFor="password">
          Password
        </label>
          <input
            name="password"
            type="password"
            value={password}
            // placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {errors.password && <p>{errors.password}</p>}
        <label htmlFor="confirmPassword">
          Confirm Password
        </label>
          <input
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            // placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <label>
          Profile Avatar
          <input type="file" onChange={updateFile} />
        </label>
        <button id={`signup-button${buttonStatus}`} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
