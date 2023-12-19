// Action Type Constants
export const LOAD_GROUPS = 'groups/LOAD_GROUPS';
export const LOAD_GROUP_DETAILS = 'groups/LOAD_GROUP_DETAILS'

// Action Creators
export const loadGroups = (groups) => ({
  type: LOAD_GROUPS,
  groups
})

export const loadGroupDetails = (group) => ({
  type: LOAD_GROUP_DETAILS,
  group
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
  console.log("thunk group:", group)
  dispatch(loadGroupDetails(group))
  return group;
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
    default: 
      return state;
  }
}

export default groupReducer;