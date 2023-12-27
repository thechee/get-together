import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
import GroupListItem from '../GroupListItem'
// import { thunkLoadUserGroups } from '../../../store/groups';
import './ManageGroups.css'

const ManageGroups = () => {
  const user = useSelector(state => state.session.user);
  const groupsObj = useSelector(state => state.groups)
  const eventsObj = useSelector(state => state.events)
  const groups = Object.values(groupsObj)
  const events = Object.values(eventsObj)
  
  const userGroups = []
  groups?.forEach(group => {
    group.organizerId == user.id ? userGroups.push(group) : null;
  });

  if (userGroups.length) {
    userGroups?.forEach(group => {
      group.events = [];  
      events?.forEach(event => {
        if (event?.groupId == group.id) {
          group.events.push(event)
        }
      })
    })
  }

  return (
    <div className='user-groups-content'>
      <ul>
        {userGroups?.map(group => (
          <GroupListItem
            group={group}
            key={group.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default ManageGroups;