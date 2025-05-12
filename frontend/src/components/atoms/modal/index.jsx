import closeIcon from "/icons/x-mark.png";
import "./index.scss";
import { mapModifiers } from "../../../utils/mapModifier";

const Modal = ({ title, children, handleClose, size }) => {
  const className = mapModifiers(
      "m-modal__content",
      `sz-${size}`,
    );
  return (
    <div className="m-modal">
      <div className="m-modal__overlay">
        <div className={className}>
          <div className="m-modal__header">
            <p className="m-modal__title">{title}</p>
            <img
              className="m-modal__close"
              src={closeIcon}
              alt="close icon"
              onClick={handleClose}
            />
          </div>
          <div className="m-modal__body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
