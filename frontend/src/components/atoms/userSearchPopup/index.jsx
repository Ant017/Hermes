import React, { useEffect } from "react";
import warningIcon from "/icons/danger.png";
import useCommonHook from "../../../hooks/useCommonHook";

const UserSearchPopup = ({ filteredUsers, setUserList, closeSearchPopup }) => {
  const { users } = useCommonHook();

  useEffect(() => {
    setUserList(users);
  }, [users]);

  return (
    <div className="m-header__searchPopup">
      {filteredUsers && filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <div
            key={user._id}
            className="m-header__searchResult"
            onClick={closeSearchPopup}
          >
            {user.username}
          </div>
        ))
      ) : (
        <div className="m-header__noUser">
          <img
            className="m-header__noUserIcon"
            src={warningIcon}
            alt="warning icon"
          />
          <p>No users found</p>
        </div>
      )}
    </div>
  );
};

export default UserSearchPopup;
