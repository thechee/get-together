import { Link } from "react-router-dom";

const GroupListItem = ({ group }) => {


  return (
    <li>
      <div className="group-list-item">
        <Link to={`${group.id}`}>
        <div>
          <img src={group.previewImage} alt="" />
        </div>
        <div>
          <h3>{group.name}</h3>
          <h5>{group.city}, {group.state}</h5>
          <p>{group.about}</p>
          <span>{group.events.length} Events</span>
          <span> · </span>
          <span>{group.private ? "Private" : "Public" }</span>
        </div>
        </Link>
      </div>
    </li>
  );
}

export default GroupListItem;