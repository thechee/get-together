import { csrfFetch } from "./csrf"

// Action Constants
const SEARCH_EVENTS = 'search/SEARCH_EVENTS'

// Action Creators
export const searchEvents = (events) => ({
  type: SEARCH_EVENTS,
  events
})

// Thunks
export const thunkSearchEvents = (searchParams) => async (dispatch) => {
  let searchString = '/api/events/?';
  if ('page' in searchParams) searchString += `page=${searchParams.page}&`
  if ('size' in searchParams) searchString += `size=${searchParams.size}&`
  if ('name' in searchParams) searchString += `name=${searchParams.name}&`
  if ('type' in searchParams) searchString += `type=${searchParams.type}&`
  if ('startDate' in searchParams) searchString += `startDate=${searchParams.startDate}&`

  const response = await csrfFetch(searchString)
  if (response.ok) {
    const events = await response.json()
    dispatch(searchEvents(events))
    return events
  } else {
    throw response;
  }
}

// Reducer
const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_EVENTS: {
      return {...action.events}
    }
    default: 
      return state;
  }
}

export default searchReducer;