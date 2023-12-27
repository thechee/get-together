import { Link } from "react-router-dom";

const GroupListItem = ({ group }) => {


  return (
    <li>
      <Link to={`${group.id}`}>
        <div className="group-list-item">
          <div>
            <img className='group-list-image' src={group.previewImage} alt="" />
          </div>
          <div className="group-list-info">
            <h2>{group.name}</h2>
            <h4>{group.city}, {group.state}</h4>
            <p>{group.about}</p>
            <span>{group.events?.length} Events</span>
            <span> · </span>
            <span>{group.private ? "Private" : "Public" }</span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default GroupListItem;