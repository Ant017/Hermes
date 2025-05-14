import { Controller } from "react-hook-form";
import Divider from "../../atoms/divider";
import { mapModifiers } from "../../../utils/mapModifier";
import "./index.scss";
import { useEffect, useRef } from "react";

const Form = ({
  label,
  type,
  inputType = "input",
  name,
  errors,
  control,
  rules,
  placeholder,
  onChange,
  icon,
  iconAlt,
  border = "basic",
  padding = "default",
}) => {
  const textareaRef = useRef(null);

  // Effect to adjust height when value changes from external sources
  useEffect(() => {
    if (textareaRef.current) {
      adjustTextareaHeight(textareaRef.current);
    }
  }, [control._formValues[name]]);

  // Function to adjust textarea height
  const adjustTextareaHeight = (element) => {
    if (element) {
      // Reset height to auto to get the correct scrollHeight
      element.style.height = "auto";

      // If there's no content, set height to minimum 20px
      if (element.value.length <= 124) {
        element.style.height = "20px";
      } else {
        // Set the height to the scrollHeight (content height)
        const newHeight = Math.min(Math.max(element.scrollHeight, 20), 60);
        element.style.height = `${newHeight}px`;
      }
    }
  };

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
            <>
              {inputType === "input" ? (
                <input
                  className="m-form__input"
                  type={type}
                  id={name}
                  placeholder={placeholder}
                  {...(type === "file" ? {} : field)}
                  onChange={type === "file" ? onChange : field.onChange}
                />
              ) : (
                <textarea
                  ref={textareaRef}
                  className="m-form__textarea"
                  id={name}
                  placeholder={placeholder}
                  {...(type === "file" ? {} : field)}
                  onChange={(e) => {
                    if (type === "file") {
                      onChange(e);
                    } else {
                      field.onChange(e);
                    }
                    adjustTextareaHeight(e.target);
                  }}
                />
              )}
            </>
          )}
        />
      </div>
      {errors[name] && <p className="m-form__error">{errors[name].message}</p>}
    </div>
  );
};

export default Form;
