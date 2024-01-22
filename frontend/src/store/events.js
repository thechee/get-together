import { csrfFetch } from "./csrf";

// Action Type Constants
export const LOAD_EVENTS = 'events/LOAD_EVENTS';
export const LOAD_EVENT_DETAILS = 'events/LOAD_EVENT_DETAILS'
export const CREATE_EVENT = 'events/CREATE_EVENT'
export const UPDATE_EVENT = 'events/UPDATE_EVENT'
export const ADD_EVENT_IMAGE = 'events/ADD_EVENT_IMAGE'
export const DELETE_EVENT = 'events/DELETE_EVENT'
export const DELETE_ASSOCIATED_EVENTS = 'events/DELETE_ASSOCIATED_EVENTS'

// Action Creators
export const loadEvents = (events) => ({
  type: LOAD_EVENTS,
  events
})

export const loadEventDetails = (event) => ({
  type: LOAD_EVENT_DETAILS,
  event
})

export const createEvent = (event) => ({
  type: CREATE_EVENT,
  event
})

export const updateEvent = (eventId, event) => ({
  type: UPDATE_EVENT,
  eventId,
  event
})

export const addEventImage = (eventId, image) => ({
  type: ADD_EVENT_IMAGE,
  eventId,
  image
})

export const deleteEvent = (eventId) => ({
  type: DELETE_EVENT,
  eventId
})

export const deleteAssociatedEvents = (eventId) => ({
  type: DELETE_ASSOCIATED_EVENTS,
  eventId
})

// Thunk Action Creators

// Look into promise.allSettled()
export const thunkLoadEvents = () => async (dispatch) => {
  const response = await fetch('/api/events')
  const events = await response.json()

  // const detailedEvents = []
  // // loop over events
  // events?.Events.forEach(async event => {
  //   // for each event, dispatch thunkEventDetails
  //   const detailedEvent = await dispatch(thunkEventDetails(event.id))
  //   // push into new array
  //   detailedEvents.push(detailedEvent)
  // })
  // console.log('events:', events)
  // console.log(detailedEvents)
  // console.log(Promise.allSettled(detailedEvents))
  
  // dispatch the new array to loadEvents
  // dispatch(loadEvents(detailedEvents))
  dispatch(loadEvents(events.Events))
}

export const thunkEventDetails = (eventId) => async (dispatch) => {
  const response = await fetch(`/api/events/${eventId}`)
  const event = await response.json()

  if (response.ok) {
    dispatch(loadEventDetails(event))
  }
} 

export const thunkCreateEvent = (groupId, event) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  })

  if (response.ok) {
    const event = await response.json()
    dispatch(createEvent(event))
    return event;
  } else {
    // const error = await response.json()
    // return error
    throw response
  }
}

export const thunkUpdateEvent = (eventId, event) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  })

  if (response.ok) {
    const event = await response.json()
    dispatch(updateEvent(eventId, event))
    return event;
  } else {
    const error = await response.json()
    return error;
  }
}

export const thunkAddEventImage = (eventId, image) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/images`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(image)
  })

  if (response.ok) {
    const group = await response.json()
    await dispatch(addEventImage(eventId, image))
    return group;
  } else {
    const error = await response.json()
    return error
  }
}

export const thunkDeleteEvent = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (response.ok) {
    const message = await response.json()
    dispatch(deleteEvent(eventId))
    return message;
  } else {
    const error = await response.json()
    return error
  }
}

// Reducer
const eventReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_EVENTS: {
      const eventsState = { ...state };
      action.events.forEach(event => {
        if (!eventsState[event.id]) {
          eventsState[event.id] = event
        } 
      })
      return eventsState;
    }
    case LOAD_EVENT_DETAILS: {
      const eventsState = { ...state };
      eventsState[action.event.id] = action.event
      return eventsState;
    }
    case CREATE_EVENT: {
      const eventsState = { ...state }
      eventsState[action.event.id] = action.event
      return eventsState;
    }
    case UPDATE_EVENT: {
      const eventsState = { ...state }
      eventsState[action.eventId] = { ...eventsState[action.eventId], ...action.event} 
      return eventsState;
    }
    case ADD_EVENT_IMAGE: {
      const eventsState = { ...state }
      // if ("EventImages" in eventsState[action.eventId]) {
      //   eventsState[action.eventId].EventImages.push(action.image)
      // } else {
      //   eventsState[action.eventId].EventImages = [action.image]
      // }
      const newArr = [action.image]
      eventsState[action.eventId].EventImages = newArr
      return eventsState;
    }
    case DELETE_EVENT: {
      const eventsState = { ...state };
      delete eventsState[action.eventId];
      return eventsState;
    }
    case DELETE_ASSOCIATED_EVENTS: {
      const eventsState = { ...state };
      delete eventsState[action.eventId]
      return eventsState;
    }
    default: 
      return state;
  }
}

export default eventReducer;