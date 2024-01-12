import { useSelector } from "react-redux";
import GroupListItem from "../GroupListItem";
import "./ManageGroups.css";

const ManageGroups = () => {
  const user = useSelector((state) => state.session.user);
  const userGroups = useSelector((state) => state.session.user.Groups);
  // const eventsObj = useSelector((state) => state.events);
  // const events = Object.values(eventsObj);

  // if (userGroups?.Groups.length) {
  //   userGroups?.Groups.forEach((group) => {
  //     group.events = [];
  //     events?.forEach((event) => {
  //       if (event?.groupId == group.id) {
  //         group.events.push(event);
  //       }
  //     });
  //   });
  // }

  return (
    <div className="user-groups-content">
      <h2>Manage Groups</h2>

      <h4>Your groups in Get-Together</h4>
      <div>
        <ul>
          {userGroups?.Groups.length ? (
            userGroups?.Groups.map((group) => (
              <GroupListItem
                group={group}
                isOwner={user.id == group.organizerId}
                isMember={user.id != group.organizerId}
                key={group.id}
              />
            ))
          ) : (
            <h2>You are not part of any groups yet!</h2>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ManageGroups;
