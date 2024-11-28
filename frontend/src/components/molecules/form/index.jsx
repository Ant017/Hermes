import { Controller } from "react-hook-form";
import "./index.scss";
import Divider from "../../atoms/divider";

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
}) => {
  return (
    <div className="m-form">
      <label htmlFor={name}>{label}</label>
      <div className="m-form__inputContainer">
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
