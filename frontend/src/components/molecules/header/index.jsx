import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import SearchBar from "../../atoms/searchBar";
import downArrowIcon from "/icons/down-arrow.png";
import notificationIcon from "/icons/notification.png";
import useProfileHook from "../../../hooks/useProfileHook";
import useCommonHook from "../../../hooks/useCommonHook";
import Loader from "../../atoms/loader";
import "./index.scss";

const Header = ({
  setShowProfilePopup,
  showProfilePopup,
  setShowSearchPopup,
  setFilteredUsers,
  selectedUser,
}) => {
  const { profilePic } = useProfileHook();
  const { token } = useSelector((state) => state.user);
  const { users } = useCommonHook();
  const [searchValue, setSearchValue] = useState("");

  const profilePopupVisibility = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchValue(query);

    const trimmedQuery = query.trim().toLowerCase();
    const filtered = users?.filter((user) =>
      user.username.toLowerCase().includes(trimmedQuery)
    );

    if (trimmedQuery) {
      setFilteredUsers(filtered || []);
      setShowSearchPopup(true);
    } else {
      setFilteredUsers(users || []);
      setShowSearchPopup(false);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      setSearchValue(selectedUser);
    }
  }, [selectedUser]);

  return (
    <div className="m-header">
      {token ? (
        <div className="m-header__menu">
          <SearchBar onChange={handleSearchChange} value={searchValue} size="small" />
          <div className="m-header__profileContainer">
            <img
              className="m-header__notificationIcon"
              src={notificationIcon}
              alt="notification icon"
            />
            {profilePic ? (
              <img
                className="m-header__profileImage"
                src={profilePic}
                alt="profile icon"
              />
            ) : (
              <Loader size="header" />
            )}
            <img
              className={`m-header__arrowIcon ${
                showProfilePopup ? "rotate" : "reverse"
              }`}
              src={downArrowIcon}
              alt="down arrow icon"
              onClick={profilePopupVisibility}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
