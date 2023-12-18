import { useDispatch, useSelector } from 'react-redux';
import './GroupsList.css'
import GroupListItem from '../GroupListItem/GroupListItem';
import { useEffect } from 'react';
import { thunkLoadGroups } from '../../../store/groups';
import { Link } from 'react-router-dom';

const GroupsList = () => {
  const dispatch = useDispatch();
  const groupsObj = useSelector(state => state.groups)
  const groups = Object.values(groupsObj)
  console.log("groupsObj:", groupsObj)
  // console.log("groups:", groups)

  useEffect(() => {
    dispatch(thunkLoadGroups())
  }, [dispatch])

  return (
    <div className='group-list-page'>
      <section>
       <Link to='/events'>Events</Link>
       <Link to='/groups'>Groups</Link>
      </section>
      <section>
        <ul>
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