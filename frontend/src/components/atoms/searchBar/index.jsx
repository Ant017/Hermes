import Divider from "../divider";
import searchIcon from "/icons/search.png";
import "./index.scss";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="a-searchBar">
      <img className="a-searchBar__icon" src={searchIcon} alt="search icon" />
      <Divider vertical={true} color="grey" />
      <input
        type="text"
        className="a-searchBar__input"
        placeholder="Search users"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
