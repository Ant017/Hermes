import useProfileHook from "../../../hooks/useProfileHook";
import Button from "../../atoms/button";
import Divider from "../../atoms/divider";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import Loader from "../../atoms/loader";
import { useDispatch } from "react-redux";
import { removeLogin } from "../../../redux/slices/userSlice";
import profileIcon from "/icons/edit.png";
import logoutIcon from "/icons/out.png";

const ProfilePopup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profilePic, profile } = useProfileHook();

  const logout = () => {
    dispatch(removeLogin());
    navigate("/");
  };

  return (
    <div className="m-profilePopup">
      <div className="m-profilePopup__details">
        {profilePic ? (
          <img
            className="m-profilePopup__image"
            src={profilePic}
            alt="profile"
          />
        ) : (
          <Loader size="popup" />
        )}
        <div className="m-profilePopup__info">
          <p className="m-profilePopup__name">{profile?.username}</p>
          <p className="m-profilePopup__email">{profile?.email}</p>
        </div>
      </div>
      <div className="m-profilePopup__bio">
        <p>this is the bio section</p>
      </div>
      <Divider horizontal={true} color="grey" />
      <div className="m-profilePopup__actions">
        <Button
          value="View Profile"
          type="button"
          onClick={() => navigate("/profile")}
          backgroundColor="transparent"
          width="100"
          icon={profileIcon}
          hasBorder
          color="white"
          padding="8"
        />
        <Button
          value="Logout"
          type="button"
          backgroundColor="white"
          width="100"
          onClick={logout}
          hasBorder
          icon={logoutIcon}
          padding="8"

        />
      </div>
    </div>
  );
};

export default ProfilePopup;
