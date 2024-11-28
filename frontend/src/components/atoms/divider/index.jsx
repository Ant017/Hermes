import { mapModifiers } from "../../../utils/mapModifier";
import "./index.scss";

const Divider = ({ vertical = false, horizontal = false, color }) => {
  const className = mapModifiers("a-divider", `color-${color}`);
  return (
    <>
      {vertical && <div className={`${className} vertical`}></div>}
      {horizontal && <div className={`${className} horizontal`}></div>}
    </>
  );
};

export default Divider;
