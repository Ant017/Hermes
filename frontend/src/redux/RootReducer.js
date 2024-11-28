import userReducer from "../redux/slices/userSlice";
import commonReducer from "../redux/slices/commonSlice";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  user: userReducer,
  common: commonReducer,
});

export default rootReducer;
