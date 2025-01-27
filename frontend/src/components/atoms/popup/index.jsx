import { useEffect } from "react";
import "./index.scss";

const Popup = ({
  children,
  show,
  isLeft = false,
  forwardedRef = null,
  onClose = () => {},
}) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        forwardedRef.current &&
        !forwardedRef.current.contains(event.target)
      ) {
        onClose();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [forwardedRef, onClose]);

  return (
    <div
      className={`a-popup ${show ? "show" : ""} ${
        isLeft ? "left-position" : ""
      }`}
      ref={forwardedRef}
    >
      {children}
    </div>
  );
};

export default Popup;
