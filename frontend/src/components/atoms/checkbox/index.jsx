import "./index.scss";

const CustomCheckBox = ({ option }) => {
  return (
    <label className="a-checkbox">
      <input className="a-checkbox__input" type="checkbox" />
      <span className="a-checkbox__label">{option}</span>
    </label>
  );
};

export default CustomCheckBox;
