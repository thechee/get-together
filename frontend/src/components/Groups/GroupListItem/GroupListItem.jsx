const GroupListItem = ({ group }) => {


  return (
    <li>
      <div>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <h3>{group.name}</h3>
          <h5>{group.city}, {group.state}</h5>
          <p>{group.about}</p>
          <span>## Events</span>
          <span> · </span>
          <span>{group.type}</span>
        </div>
      </div>
    </li>
  );
}

export default GroupListItem;