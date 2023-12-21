import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [ credential, setCredential ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errors, setErrors ] = useState('');
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors('');
    return dispatch(sessionActions.thunkLoginUser({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        console.log('data:', data)
        if (data && data.message) {
          setErrors(data.message);
        }
      });
    };

  const demoLogin = (e) => {
    e.preventDefault()

    setErrors('');
    return dispatch(sessionActions.thunkLoginUser({credential: 'Demo-lition', password: 'password'}))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        console.log('data:', data)
        if (data && data.message) {
          setErrors(data.message);
        }
      });
  }

  const buttonStatus = credential.length >= 4 && password.length >= 6 ? "" : "disabled"

  return (
    <div className='log-in'>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        {errors && (<p>The provided credentials were invalid.</p>)}
        <label>
          <input
            type="text"
            value={credential}
            placeholder='Username or Email'
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button id={`login-button${buttonStatus}`} type="submit">Log In</button>
      </form>

      <form onSubmit={demoLogin}>
        <button id="demo-user">Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;