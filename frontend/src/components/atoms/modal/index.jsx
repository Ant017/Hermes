import closeIcon from "/icons/x-mark.png";
import "./index.scss";

const Modal = ({ title, children, handleClose }) => {
  return (
    <div className="m-modal">
      <div className="m-modal__overlay">
        <div className="m-modal__content">
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
          {/* <div className="m-modal__footer">
            <button className="m-modal__confirmButton">Confirm</button>
            <button className="m-modal__cancelButton">Cancel</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
