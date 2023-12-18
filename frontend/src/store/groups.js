// Action Type Constants
export const LOAD_GROUPS = 'groups/LOAD_GROUPS';

// Action Creators
export const loadGroups = (groups) => ({
  type: LOAD_GROUPS,
  groups
})

// Thunk Action Creators
export const thunkLoadGroups = () => async (dispatch) => {
  const response = await fetch('/api/groups')
  const groups = await response.json()
  dispatch(loadGroups(groups))
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
    default: 
      return state;
  }
}

export default groupReducer;