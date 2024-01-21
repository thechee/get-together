import { useSelector } from 'react-redux';
import GroupListItem from '../GroupListItem/GroupListItem';
import { NavLink } from 'react-router-dom';
import './GroupsList.css'

const GroupsList = () => {
  const groupsObj = useSelector(state => state.groups)
  const groups = Object.values(groupsObj)


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