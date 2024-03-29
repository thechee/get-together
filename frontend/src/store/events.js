import { csrfFetch } from "./csrf";

// Action Type Constants
export const LOAD_EVENTS = 'events/LOAD_EVENTS';
export const LOAD_EVENT_DETAILS = 'events/LOAD_EVENT_DETAILS'
export const CREATE_EVENT = 'events/CREATE_EVENT'
export const UPDATE_EVENT = 'events/UPDATE_EVENT'
export const ADD_EVENT_PREVIEW = 'events/ADD_EVENT_PREVIEW'
export const ADD_EVENT_IMAGES = 'events/ADD_EVENT_IMAGES'
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

export const addEventPreview = (eventId, image) => ({
  type: ADD_EVENT_PREVIEW,
  eventId,
  image
})

export const addEventImages = (eventId, images) => ({
  type: ADD_EVENT_IMAGES,
  eventId,
  images
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

  if (response.ok) {
    dispatch(loadEvents(events.Events))
  }
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

export const thunkAddEventPreviewImage = (eventId, image) => async (dispatch) => {
  const formData = new FormData();
  formData.append('image', image)

  const response = await csrfFetch(`/api/events/${eventId}/previewImage`, {
    method: 'POST',
    body: formData
  })

  if (response.ok) {
    const resImage = await response.json()
    await dispatch(addEventPreview(eventId, resImage))
    return resImage;
  } else {
    throw response
  }
}

export const thunkAddEventImages = (eventId, images) => async (dispatch) => {
  const formData = new FormData();
  Array.from(images).forEach(image => formData.append('images', image))

  const response = await csrfFetch(`/api/events/${eventId}/images`, {
    method: 'POST',
    body: formData
  })

  if (response.ok) {
    const resImages = await response.json()
    await dispatch(addEventImages(eventId, resImages))
    return resImages;
  } else {
    throw response
  }
}

export const thunkUpdateEventPreviewImage = (eventId, image) => async (dispatch) => {
  const formData = new FormData();
  formData.append('image', image)

  const response = await csrfFetch(`/api/events/${eventId}/previewImage`, {
    method: 'POST',
    body: formData
  })

  if (response.ok) {
    const resImage = await response.json()
    await dispatch(addEventPreview(eventId, resImage))
    return resImage;
  } else {
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
    case ADD_EVENT_PREVIEW: {
      if (state[action.eventId].EventImages) {
        return { 
          ...state,
          [action.eventId]: {
            ...state[action.eventId],
            EventImages: [
              ...state[action.eventId].EventImages,
              action.image
            ]
          }
        }
      } else {
        return { 
          ...state,
          [action.eventId]: {
            ...state[action.eventId],
            EventImages: [
              action.image
            ]
          }
        }
      }
    }
    case ADD_EVENT_IMAGES: {
      return { 
        ...state,
        [action.eventId]: {
          ...state[action.eventId],
          EventImages: [
            ...state[action.eventId].EventImages,
            ...action.images
          ]
        }
      }
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