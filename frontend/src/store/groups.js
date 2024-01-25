import { csrfFetch } from "./csrf";
import { deleteAssociatedEvents } from "./events";

// Action Type Constants
export const LOAD_GROUPS = 'groups/LOAD_GROUPS';
export const LOAD_GROUP_DETAILS = 'groups/LOAD_GROUP_DETAILS';
export const LOAD_GROUP_EVENTS = 'groups/LOAD_GROUP_EVENTS';
export const CREATE_GROUP = 'groups/CREATE_GROUP';
export const ADD_GROUP_PREVIEW = 'groups/ADD_GROUP_PREVIEW';
export const ADD_GROUP_IMAGES = 'groups/ADD_GROUP_IMAGES';
export const EDIT_GROUP = 'groups/EDIT_GROUP';
export const DELETE_GROUP = 'groups/DELETE_GROUP';
export const LOAD_MEMBERS = 'groups/LOAD_MEMBERS';

// Action Creators
export const loadGroups = (groups) => ({
  type: LOAD_GROUPS,
  groups
})

export const loadGroupDetails = (group) => ({
  type: LOAD_GROUP_DETAILS,
  group
})

export const loadGroupEvents = (groupId, events) => ({
  type: LOAD_GROUP_EVENTS,
  groupId,
  events
})

export const createGroup = (group) => ({
  type: CREATE_GROUP,
  group
})

export const addGroupPreview = (groupId, image) => ({
  type: ADD_GROUP_PREVIEW,
  groupId,
  image
})

export const addGroupImages = (groupId, images) => ({
  type: ADD_GROUP_IMAGES,
  groupId,
  images
})

export const editGroup = (groupId, group) => ({
  type: EDIT_GROUP,
  groupId,
  group
})

export const deleteGroup = (groupId) => ({
  type: DELETE_GROUP,
  groupId
})

export const loadMembers = (groupId, members) => ({
  type: LOAD_MEMBERS,
  groupId,
  members
})

// Thunk Action Creators
export const thunkLoadGroups = () => async (dispatch) => {
  const response = await fetch('/api/groups')
  const groups = await response.json()
  dispatch(loadGroups(groups))
}

export const thunkGroupDetails = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/groups/${groupId}`)
  const group = await response.json()
  dispatch(loadGroupDetails(group))
  return group;
}

export const thunkLoadGroupEvents = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/groups/${groupId}/events`);
  
  if (response.ok) {
    const events = await response.json()
    dispatch(loadGroupEvents(groupId, events))
    return events
  } else {
    const error = await response.json()
    return error;
  }
}

export const thunkCreateGroup = (group) => async (dispatch) => {
  const response = await csrfFetch('/api/groups', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(group)
  })

  if (response.ok) {
    const group = await response.json()
    dispatch(createGroup(group))
    return group;
  } else {
    throw response
  }
}

export const thunkAddGroupPreviewImage = (groupId, image) => async (dispatch) => {
  const formData = new FormData();
  formData.append('image', image)

  const response = await csrfFetch(`/api/groups/${groupId}/previewImage`, {
    method: 'POST',
    body: formData
  })

  if (response.ok) {
    const resImage = await response.json()
    await dispatch(addGroupPreview(groupId, resImage))
    return resImage;
  } else {
    throw response;
  }
}

export const thunkAddGroupImages = (groupId, images) => async (dispatch) => {
  const formData = new FormData();
  Array.from(images).forEach(image => formData.append('images', image))

  const response = await csrfFetch(`/api/groups/${groupId}/images`, {
    method: 'POST',
    body: formData
  })

  if (response.ok) {
    const resImages = await response.json()
    await dispatch(addGroupImages(groupId, resImages))
    return resImages;
  } else {
    throw response;
  }
}

export const thunkEditGroup = (groupId, group) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(group)
  })

  if (response.ok) {
    const group = await response.json()
    dispatch(editGroup(groupId, group))
    return group;
  } else {
    const error = await response.json()
    return error
  }
}

export const thunkDeleteGroup = (group) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${group.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (response.ok) {
    const message = await response.json()
    group.Events.forEach(event => {
      dispatch(deleteAssociatedEvents(event.id))
    })
    dispatch(deleteGroup(group.id))
    return message;
  } else {
    const error = await response.json()
    return error
  }
}

export const thunkLoadMembers = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/members`)

  if (response.ok) {
    const members = await response.json()
    dispatch(loadMembers(groupId, members))
    return members
  } else {
    const error = await response.json()
    return error;
  }
}

// Reducer
const groupReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_GROUPS: {
      const groupsState = { ...state };
      action.groups.Groups.forEach(group => {
        groupsState[group.id] = {...state[group.id], ...group}
      })
      return groupsState;
    }
    case LOAD_GROUP_DETAILS: {
      const groupsState = { ...state };
      groupsState[action.group.id] = {...state[action.group.id], ...action.group}
      return groupsState;
    }
    case LOAD_GROUP_EVENTS: {
      return { 
        ...state, 
        [action.groupId]: {
          ...state[action.groupId],
          Events: action.events.Events
        } 
      };
    }
    case LOAD_MEMBERS: {
      const Members = {}
      action.members.Members.forEach(member => {
        Members[member.id] = member
      })

      return {
        ...state,
        [action.groupId]: {
          ...state[action.groupId],
          Members
        }
      }
    }
    case CREATE_GROUP: {
      const groupsState = { ...state };
      groupsState[action.group.id] = action.group
      return groupsState;
    }
    case ADD_GROUP_PREVIEW: {
      if (state[action.groupId].GroupImages) {
        return { 
          ...state,
          [action.eventId]: {
            ...state[action.groupId],
            GroupImages: [
              ...state[action.groupId].GroupImages,
              action.image
            ]
          }
        }
      } else {
        return { 
          ...state,
          [action.groupId]: {
            ...state[action.groupId],
            GroupImages: [
              action.image
            ]
          }
        }
      }
    }
    case ADD_GROUP_IMAGES: {
      return { 
        ...state,
        [action.groupId]: {
          ...state[action.groupId],
          GroupImages: [
            ...state[action.groupId].GroupImages,
            ...action.images
          ]
        }
      }
    }
    case EDIT_GROUP: {
      const groupsState = { ...state };
      groupsState[action.groupId] = { ...groupsState[action.groupId], ...action.group}
      return groupsState;
    }
    case DELETE_GROUP: {
      const groupsState = { ...state };
      delete groupsState[action.groupId]
      return groupsState;
    }
    default: 
      return state;
  }
}

export default groupReducer;