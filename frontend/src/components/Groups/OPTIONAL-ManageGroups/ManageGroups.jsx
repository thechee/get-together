import { useDispatch, useSelector } from "react-redux";
import GroupListItem from "../GroupListItem";
import "./ManageGroups.css";
import { useEffect } from "react";
import { thunkLoadUserGroups } from "../../../store/session";
import { Link } from "react-router-dom";

const ManageGroups = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const userGroupsObj = useSelector((state) => state.session.user.Groups);

  useEffect(() => {
    dispatch(thunkLoadUserGroups());
  }, [dispatch]);

  let userGroups;
  if (userGroupsObj) {
    userGroups = Object.values(userGroupsObj);
  }

  return (
    <div className="user-groups-content">
      {userGroups?.length ? (
        <div>
          <h2>Your groups in Get-Together</h2>
          <ul>
            {userGroups?.map((group) => (
              <GroupListItem
                groupId={group.id}
                isOwner={user.id == group.organizerId}
                isMember={user.id != group.organizerId}
                key={group.id}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h1>You aren&apos;t a member of any groups yet!</h1>
          <h4>
            <Link className="manage-events-links" to={"/groups/new"}>
              Start a new group
            </Link>
          </h4>
          <h4>
            <Link className="manage-events-links" to={"/groups"}>
              Find a group to join
            </Link>
          </h4>
        </div>
      )}
    </div>
  );
};

export default ManageGroups;
