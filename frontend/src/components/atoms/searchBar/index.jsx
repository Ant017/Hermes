import Divider from "../divider";
import searchIcon from "/icons/search.png";
import "./index.scss";
import { mapModifiers } from "../../../utils/mapModifier";

const SearchBar = ({ value, onChange, size }) => {
  const className = mapModifiers("a-searchBar", `sz-${size}`);
  return (
    <div className={className}>
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
