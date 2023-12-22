import { useDispatch, useSelector } from 'react-redux';
import GroupListItem from '../GroupListItem/GroupListItem';
import { useEffect } from 'react';
import { thunkLoadGroups } from '../../../store/groups';
import { Link, NavLink } from 'react-router-dom';
import { thunkLoadEvents } from '../../../store/events';
import './GroupsList.css'

const GroupsList = () => {
  const dispatch = useDispatch();
  const groupsObj = useSelector(state => state.groups)
  const eventsObj = useSelector(state => state.events)
  const groups = Object.values(groupsObj)
  const events = Object.values(eventsObj)
  
  if (groups.length) {
    groups?.forEach(group => {
      group.events = [];  
      events?.forEach(event => {
        if (event?.groupId == group.id) {
          group.events.push(event)
        }
      })
    })
  }

  useEffect(() => {
    dispatch(thunkLoadGroups())
    dispatch(thunkLoadEvents())
  }, [dispatch])

  return (
    <div className='group-list-page'>
      <section>
        <div className='page-links'>
          <NavLink className='' to='/events'>Events</NavLink>
          <NavLink className='' to='/groups'>Groups</NavLink>
        </div>
        <div>
          <span>Groups in Meetup</span>
        </div>
      </section>
      <section>
        <ul className='group-list'>
          {groups.map(group => (
            <GroupListItem 
              group={group}
              key={group.id}
            />
          ))}
        </ul>
      </section>

    </div>
  );
}

export default GroupsList;