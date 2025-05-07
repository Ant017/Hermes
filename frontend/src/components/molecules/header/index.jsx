import { useSelector } from "react-redux";
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
  value
}) => {
  const { profilePic } = useProfileHook();
  const { token } = useSelector((state) => state.user);
  const { users } = useCommonHook();

  const profilePopupVisibility = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.trim().toLowerCase();

    const filtered = users?.filter((user) =>
      user.username.toLowerCase().includes(query)
    );

    if (query) {
      setFilteredUsers(filtered || []);
      setShowSearchPopup(true);
    } else {
      setFilteredUsers(users || []);
      setShowSearchPopup(false);
    }
  };

  return (
    <div className="m-header">
      {token ? (
        <div className="m-header__menu">
          <SearchBar
            onChange={handleSearchChange}
            placeholder="Search users..."
          />
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
