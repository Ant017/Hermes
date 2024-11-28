import { mapModifiers } from "../../../utils/mapModifier";
import "./index.scss";

const Loader = ({ size }) => {
  const className = mapModifiers("a-loader", `sz-${size}`);
  return <div className={className}></div>;
};

export default Loader;
