import { Link, useNavigate } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton";
import DeleteGroupModal from "../DeleteGroupModal";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunkLoadGroupEvents } from "../../../store/groups";
import { thunkLoadUserGroupEvents } from "../../../store/session";
import "./GroupListItem.css";

const GroupListItem = ({ group, isOwner, isMember }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(thunkLoadGroupEvents(group.id))
    if (isOwner || isMember) dispatch(thunkLoadUserGroupEvents(group.id))
  }, [dispatch, group.id, isMember, isOwner])

  const previewImage = group.previewImage || group.GroupImages.find(image => image.preview === true);

  return (
    <li>
        <Link to={`/groups/${group.id}`}>
        <div className="group-list-item">
          <div className='group-list-image-div'>
            <img className='group-list-image' src={previewImage} alt="" />
          </div>
          <div className="group-list-info">
            <h2>{group.name}</h2>
            <h4>{group.city}, {group.state}</h4>
            <p>{group.about}</p>
            <div className="group-list-item-lowest-container">
              <div className="group-events-type-container">
                <span>{group.Events?.length} Events</span>
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