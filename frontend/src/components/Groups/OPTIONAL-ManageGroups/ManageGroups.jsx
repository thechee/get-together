import { useSelector } from 'react-redux';
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
  groups?.forEach(async group => {
    // await thunkLoadMembers(group.id)
    if (group.organizerId == user.id) userGroups.push(group)
    // group.members.forEach(member => {
    //   if (member.id == user.id) userGroups.push(group)
    // })
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
      <h2>Manage Groups</h2>

      <h4>Your groups in Get-Together</h4>
      <div>
        <ul>
          {userGroups.length ? userGroups?.map(group => (
            <GroupListItem
              group={group}
              isOwner={user.id == group.organizerId}
              isMember={user.id != group.organizerId}
              key={group.id}
            />
          )):
            <h2>You are not part of any groups yet!</h2>
          }
        </ul>
      </div>
    </div>
  );
}

export default ManageGroups;