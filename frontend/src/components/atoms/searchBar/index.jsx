import Divider from "../divider";
import searchIcon from "/icons/search.png";
import "./index.scss";
import useCommonHook from "../../../hooks/useCommonHook";

const SearchBar = () => {
  const { users } = useCommonHook();
  return (
    <>
      <div className="a-searchBar">
        <img className="a-searchBar__icon" src={searchIcon} alt="search icon" />
        <Divider vertical={true} color="grey" />
        <input
          type="text"
          className="a-searchBar__input"
          placeholder="Search users"
        />
      </div>
      <div className="a-searchBar__usersPopup">
        <div className="a-searchBar__users">
          {users?.map((user) => {
            return <p className="a-searchBar__user">{user.username}</p>;
          })}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
