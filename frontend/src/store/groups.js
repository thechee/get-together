import { csrfFetch } from "./csrf";

// Action Type Constants
export const LOAD_GROUPS = 'groups/LOAD_GROUPS';
export const LOAD_GROUP_DETAILS = 'groups/LOAD_GROUP_DETAILS'
export const CREATE_GROUP = 'groups/CREATE_GROUP'
export const ADD_IMAGE = 'groups/ADD_IMAGE'

// Action Creators
export const loadGroups = (groups) => ({
  type: LOAD_GROUPS,
  groups
})

export const loadGroupDetails = (group) => ({
  type: LOAD_GROUP_DETAILS,
  group
})

export const createGroup = (group) => ({
  type: CREATE_GROUP,
  group
})

export const addImage = (groupId, image) => ({
  type: ADD_IMAGE,
  groupId,
  image
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
    console.log("group:", group)
    return group;
  } else {
    const error = await response.json()
    console.log("error:", error)
    return error
  }
}

export const thunkAddImage = (groupId, image) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/images`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(image)
  })

  if (response.ok) {
    const group = await response.json()
    await dispatch(addImage(groupId, image))
    return group;
  } else {
    const error = await response.json()
    console.log(error)
    return error
  }
}

// Reducer
const groupReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_GROUPS: {
      const groupsState = {};
      action.groups.Groups.forEach(group => {
        groupsState[group.id] = group
      })
      return groupsState;
    }
    case LOAD_GROUP_DETAILS: {
      const groupsState = { ...state };
      groupsState[action.group.id] = action.group
      return groupsState;
    }
    case CREATE_GROUP: {
      const groupsState = { ...state };
      groupsState[action.group.id] = action.group
      return groupsState;
    }
    case ADD_IMAGE: {
      const groupsState = { ...state };
      console.log("groupsState:", groupsState)
      console.log("action:", action)
      if ("GroupImages" in groupsState[action.groupId]) {
        groupsState[action.groupId].GroupImages.push(action.image)
      } else {
        groupsState[action.groupId].GroupImages = [action.image]
      }
      return groupsState;
    }
    default: 
      return state;
  }
}

export default groupReducer;