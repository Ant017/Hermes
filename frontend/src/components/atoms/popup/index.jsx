import "./index.scss";

const Popup = ({ children, show }) => {
  return <div className={`a-popup ${show ? "show" : ""}`}>{children}</div>;
};

export default Popup;
