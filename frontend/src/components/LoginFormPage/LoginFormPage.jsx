import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkLoginUser } from "../../store/session"
import { Navigate } from 'react-router-dom'
import './LoginForm.css';

const LoginFormPage = () => {
  const dispatch = useDispatch()
  const [ credential, setCredential ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ errors, setErrors ] = useState('')
  const sessionUser = useSelector(state => state.session.user)

  if (sessionUser) return <Navigate to='/' replace= {true}/>

  // this is for try/catch config
  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   setErrors({})
  //   const result = await dispatch(thunkLoginUser(credential, password))
  //   console.log(result)
    
  //   if (result.message) {
  //     setErrors(result)
  //   }
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors('');
    return dispatch(thunkLoginUser({credential, password})).catch(
      async (res) => {
        const data = await res.json();
        console.log(data)
        if (data?.message) setErrors(data.message);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username or Email
        <input 
          type="text"
          value={credential}
          onChange={e => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input 
          type="text"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </label>
      {errors && <p>{errors}</p>}
      <button type="submit">Log In</button>
    </form>
  )
}

export default LoginFormPage