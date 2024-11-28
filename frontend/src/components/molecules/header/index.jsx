import { useSelector } from "react-redux";
import SearchBar from "../../atoms/searchBar";
import downArrowIcon from "/icons/down-arrow.png";
import notificationIcon from "/icons/notification.png";
import useProfileHook from "../../../hooks/useProfileHook";
import Loader from "../../atoms/loader";
import "./index.scss";

const Header = ({ setShowPopup, showPopup }) => {
  const { profilePic } = useProfileHook();
  const { token } = useSelector((state) => state.user);

  const profilePopupVisibility = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="m-header">
      {token ? (
        <div className="m-header__menu">
          <SearchBar />
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
                showPopup ? "rotate" : "reverse"
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
