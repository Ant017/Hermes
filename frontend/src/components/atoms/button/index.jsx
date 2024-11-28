
import { mapModifiers } from "../../../utils/mapModifier";
import "./index.scss";

const Button = ({
  value,
  type,
  onClick,
  isDisabled = false,
  backgroundColor,
  size,
  padding,
  icon,
  hasBorder = false,
  borderRadius,
  children,
  width,
  color,
}) => {
  const className = mapModifiers(
    "a-button",
    `bg-${backgroundColor}`,
    `sz-${size}`,
    `pd-${padding}`,
    `br-${borderRadius}`,
    `width-${width}`,
    `color-${color}`,
    hasBorder && "hasBorder",
    isDisabled && "disabled"
  );

  return (
    <button
      className={className}
      type={type || "button"}
      onClick={onClick}
      disabled={isDisabled}
    >
      {icon && <img className="a-button__icon" src={icon} alt="icon" />}
      {children || value}
    </button>
  );
};

export default Button;
