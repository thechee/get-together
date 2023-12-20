import { csrfFetch } from "./csrf";

// Action Type Constants
export const LOAD_EVENTS = 'events/LOAD_EVENTS';
export const LOAD_EVENT_DETAILS = 'events/LOAD_EVENT_DETAILS'
export const LOAD_GROUP_EVENTS = 'events/LOAD_GROUP_EVENTS'
export const CREATE_EVENT = 'events/CREATE_EVENT'
export const ADD_EVENT_IMAGE = 'events/ADD_EVENT_IMAGE'

// Action Creators
export const loadEvents = (events) => ({
  type: LOAD_EVENTS,
  events
})

export const loadEventDetails = (event) => ({
  type: LOAD_EVENT_DETAILS,
  event
})

export const loadGroupEvents = (events) => ({
  type: LOAD_GROUP_EVENTS,
  events
})

export const createEvent = (event) => ({
  type: CREATE_EVENT,
  event
})

export const addEventImage = (eventId, image) => ({
  type: ADD_EVENT_IMAGE,
  eventId,
  image
})

// Thunk Action Creators

// Look into promise.allSettled()
export const thunkLoadEvents = () => async (dispatch) => {
  const response = await fetch('/api/events')
  const events = await response.json()
  // loop over events
    // for each event, dispatch thunkEventDetails
    // push into new array
  // dispatch the new array to loadEvents
  dispatch(loadEvents(events))
}

export const thunkEventDetails = (eventId) => async (dispatch) => {
  const response = await fetch(`/api/events/${eventId}`)
  const event = await response.json()
  dispatch(loadEventDetails(event))
} 

export const thunkLoadGroupEvents = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/groups/${groupId}/events`)
  const events = await response.json()
  // console.group('thunk group events:', events)
  dispatch(loadGroupEvents(events))
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
    console.log("event:", event)
    return event;
  } else {
    const error = await response.json()
    console.log("error:", error)
    return error
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
    console.log(error)
    return error
  }
}

// Reducer
const eventReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_EVENTS: {
      const eventsState = { ...state };
      action.events.Events.forEach(event => {
        eventsState[event.id] = event
      })
      return eventsState;
    }
    case LOAD_EVENT_DETAILS: {
      const eventsState = { ...state };
      eventsState[action.event.id] = action.event
      console.log('eventsState:', eventsState)
      return eventsState;
    }
    case LOAD_GROUP_EVENTS: {
      const eventsState = { ...state };
      action.events.Events.forEach(event => {
        eventsState[event.id] = event
      })
      return eventsState
    }
    case CREATE_EVENT: {
      const eventsState = { ...state }
      eventsState[action.event.id] = action.event
      return eventsState;
    }
    case ADD_EVENT_IMAGE: {
      const eventsState = { ...state }
      if ("EventImages" in eventsState[action.eventId]) {
        eventsState[action.eventId].EventImages.push(action.image)
      } else {
        eventsState[action.eventId].EventImages = [action.image]
      }
      return eventsState;
    }
    default: 
      return state;
  }
}

export default eventReducer;