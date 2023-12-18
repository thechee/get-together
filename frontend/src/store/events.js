// Action Type Constants
export const LOAD_EVENTS = 'events/LOAD_EVENTS';
export const LOAD_EVENT_DETAILS = 'events/LOAD_EVENT_DETAILS'
export const LOAD_GROUP_EVENTS = 'events/LOAD_GROUP_EVENTS'

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

// Thunk Action Creators
export const thunkLoadEvents = () => async (dispatch) => {
  const response = await fetch('/api/events')
  const events = await response.json()
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

// Reducer
const eventReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_EVENTS: {
      const eventsState = {};
      action.events.Events.forEach(event => {
        eventsState[event.id] = event
      })
      return eventsState;
    }
    case LOAD_EVENT_DETAILS: {
      const eventsState = { ...state };
      eventsState[action.event.id] = action.event
      return eventsState;
    }
    case LOAD_GROUP_EVENTS: {
      const eventsState = { ...state };
      action.events.Events.forEach(event => {
        eventsState[event.id] = event
      })
      return eventsState
    }
    default: 
      return state;
  }
}

export default eventReducer;