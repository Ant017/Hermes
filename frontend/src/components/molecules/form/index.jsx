import { Controller } from "react-hook-form";
import Divider from "../../atoms/divider";
import { mapModifiers } from "../../../utils/mapModifier";
import "./index.scss";

const Form = ({
  label,
  type,
  name,
  errors,
  control,
  rules,
  placeholder,
  onChange,
  icon,
  iconAlt,
  border,
  padding = "default",
}) => {
  const className = mapModifiers(
      "m-form__inputContainer",
      `border-${border}`,
      `pd-${padding}`
    );
  return (
    <div className="m-form">
      <label htmlFor={name}>{label}</label>
      <div className={className}>
        {icon && (
          <>
            <img className="m-form__icon" src={icon} alt={iconAlt} />
            <Divider vertical={true} color="grey" />
          </>
        )}
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <input
              className="m-form__input"
              type={type}
              id={name}
              placeholder={placeholder}
              {...(type === "file" ? {} : field)}
              onChange={type === "file" ? onChange : field.onChange}
            />
          )}
        />
      </div>
      {errors[name] && <p className="m-form__error">{errors[name].message}</p>}
    </div>
  );
};

export default Form;
