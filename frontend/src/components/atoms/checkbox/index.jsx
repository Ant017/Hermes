import "./index.scss";

const CustomCheckBox = ({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  disabled = false,
  size = "medium",
  className = "",
}) => {
  return (
    <div
      className={`a-checkbox ${size} ${className} ${
        disabled ? "disabled" : ""
      }`}
    >
      <label className="a-checkbox__container">
        {label && <span className="a-checkbox__label">{label}</span>}
        <input
          type="checkbox"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="a-checkbox__input"
        />
        <span className="a-checkbox__checkmark"></span>
      </label>
    </div>
  );
};

export default CustomCheckBox;
