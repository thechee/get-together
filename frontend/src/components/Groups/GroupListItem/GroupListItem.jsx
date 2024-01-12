import { Link, useNavigate } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton";
import DeleteGroupModal from "../DeleteGroupModal";
import "./GroupListItem.css";

const GroupListItem = ({ group, isOwner, isMember }) => {
  const navigate = useNavigate()

  return (
    <li>
        <Link to={`/groups/${group.id}`}>
        <div className="group-list-item">
          <div className='group-list-image-div'>
            <img className='group-list-image' src={group.previewImage || group.GroupImages[0].url} alt="" />
          </div>
          <div className="group-list-info">
            <h2>{group.name}</h2>
            <h4>{group.city}, {group.state}</h4>
            <p>{group.about}</p>
            <div className="group-list-item-lowest-container">
              <div className="group-events-type-container">
                <span>{group.events?.length} Events</span>
                <span> · </span>
                <span>{group.private ? "Private" : "Public" }</span>
              </div>
            </div>
          </div>
        </div>
        </Link>
        <div className="group-management-btns-container">
          {isOwner && <button onClick={() => navigate(`/groups/${group.id}/edit`)}>Update</button>}
          {isOwner && <OpenModalButton
            buttonText="Delete"
            modalComponent={<DeleteGroupModal group={group}/>}
            />}
          {isMember && <button
            id="unjoin-btn"
            onClick={() => alert('Feature coming soon...')}
            >Unjoin</button>}
         </div>
    </li>
  );
}

export default GroupListItem;