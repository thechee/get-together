import { csrfFetch } from "./csrf"

export const LOGIN_USER = 'session/LOGIN_USER' 
export const REMOVE_USER = 'session/REMOVE_USER'
export const LOAD_USER_GROUPS = 'session/LOAD_USER_GROUPS';


export const loginUser = (user) => ({
  type: LOGIN_USER,
  user
})

export const removeUser = () => ({
  type: REMOVE_USER
})

export const loadUserGroups = (groups) => ({
  type: LOAD_USER_GROUPS,
  groups
})

// Session Thunks
export const thunkLoginUser = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password
    })
  });
  const data = await response.json();
  dispatch(loginUser(data.user));
  return response;
};

export const thunkRestoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(loginUser(data.user));
  return data;
};

export const thunkSignup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password
    })
  });
  const data = await response.json();
  dispatch(loginUser(data.user));
  return response;
};

export const thunkLogout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(removeUser());
  return response;
};

export const thunkLoadUserGroups = () => async (dispatch) => {
  const response = await csrfFetch('/api/groups/current')

  if (response.ok) {
    const groups = await response.json()
    dispatch(loadUserGroups(groups))
    return groups;
  } else {
    const error = await response.json()
    return error;
  }
}


// .then.catch with throwing res
// export const thunkLoginUser = (credential, password ) => async (dispatch) => {
//   try {
//      const res = await csrfFetch('/api/session', {
//       method: 'POST',
//       body: JSON.stringify({credential, password})
//     })

//     if (res.ok) {
//       const data = await res.json()
//       dispatch(loginUser(data.user))
//       return res
//     }
//   } catch (e) {
//     const error = await e.json()
//     return error
//   }
// }

// async await without throwing
// export const thunkLoginUser = (credential, password ) => async (dispatch) => {

//      const res = await csrfFetch('/api/session', {
//       method: 'POST',
//       body: JSON.stringify({credential, password})
//     })

//     if (res.ok) {
//       const data = await res.json()
//       dispatch(loginUser(data.user))
//       return res
//     } else {
//       const error = await e.json()
//       return error
//     }
// }


const initialState = { user: null }
const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      return { ...state, user: action.user }
    }
    case REMOVE_USER: {
      return { ...state, user: null }
    }
    case LOAD_USER_GROUPS: {
      const sessionState = { ...state };
      sessionState.user.Groups = action.groups
      return sessionState;
    }
    default:
      return state;
  }
}

export default sessionReducer;