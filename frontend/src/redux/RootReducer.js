import userReducer from "../redux/slices/userSlice";
import commonReducer from "../redux/slices/commonSlice";
import chatReducer from "../redux/slices/chatSlice";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  user: userReducer,
  common: commonReducer,
  chat: chatReducer,
});

export default rootReducer;
